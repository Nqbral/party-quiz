import { Lobby } from '@app/game/lobby/lobby';
import { AuthenticatedSocket } from '@app/types/AuthenticatedSocket';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WsException } from '@nestjs/websockets';
import { LOBBY_STATES } from '@shared/consts/LobbyStates';
import { ServerEvents } from '@shared/enums/ServerEvents';
import { Server } from 'socket.io';

import { GameGateway } from '../game.gateway';

@Injectable()
export class LobbyManager {
  public server: Server;

  private readonly lobbies: Map<Lobby['id'], Lobby> = new Map<
    Lobby['id'],
    Lobby
  >();

  private gameGateway: GameGateway;

  private lastKnownLobbyPerUser: Map<string, string> = new Map();

  constructor() {}

  setGameGateway(gateway: GameGateway) {
    this.gameGateway = gateway;
  }

  public initializeSocket(client: AuthenticatedSocket): void {
    client.lobby = null;
  }

  public terminateSocket(client: AuthenticatedSocket): void {
    this.lastKnownLobbyPerUser.delete(client.id);

    if (client.lobby?.owner.id == client.id) {
      this.deleteLobby(client, client.lobby.id);
      return;
    }

    client.lobby?.removeClient(client);

    client.lobby = null;
  }

  public createLobby(owner: AuthenticatedSocket): Lobby {
    const currentLobby = this.getLastLobbyForUser(owner.id);

    if (currentLobby) {
      this.server.to(owner.id).emit(ServerEvents.LobbyError, {
        error: 'Already in a lobby',
        message: 'Vous êtes déjà dans une autre partie.',
      });

      console.log("Already in a lobby, can't create another one");

      throw new WsException('Already in a lobby');
    }

    const lobby = new Lobby(this.server, owner);

    this.server
      .to(owner.id)
      .emit(ServerEvents.LobbyCreate, { lobbyId: lobby.id });

    this.lobbies.set(lobby.id, lobby);

    lobby.addOwner(owner);
    this.addLobby(owner, lobby);
    this.emitEventForAllConnexionsClient(owner, ServerEvents.LobbyJoin, {
      lobbyId: lobby.id,
    });

    this.lastKnownLobbyPerUser.set(owner.id, lobby.id);

    return lobby;
  }

  public getLobby(client: AuthenticatedSocket, lobbyId: string): Lobby {
    const lobby = this.lobbies.get(lobbyId);

    if (!lobby) {
      this.server.to(client.id).emit(ServerEvents.LobbyError, {
        error: 'Lobby not found',
        message: 'Aucune partie a été trouvée pour cette URL.',
      });
      throw new WsException('Lobby not found');
    }

    return lobby;
  }

  public getLastLobbyForUser(userId: string): string | undefined {
    return this.lastKnownLobbyPerUser.get(userId);
  }

  public clearLastLobbyForUser(userId: string): void {
    this.lastKnownLobbyPerUser.delete(userId);
  }

  public joinLobby(lobbyId: string, client: AuthenticatedSocket): void {
    const currentLobby = this.getLastLobbyForUser(client.id);

    if (currentLobby && currentLobby !== lobbyId) {
      this.server.to(client.id).emit(ServerEvents.LobbyError, {
        error: 'Already in a lobby',
        message: 'Vous êtes déjà dans une autre partie.',
      });

      throw new WsException('Already in a lobby');
    }

    const lobby = this.getLobby(client, lobbyId);

    if (client.id === lobby.owner.id) {
      lobby.dispatchLobbyState();
      return;
    }

    lobby.addClient(client);
    this.addLobby(client, lobby);
    this.emitEventForAllConnexionsClient(client, ServerEvents.LobbyJoin, {
      lobbyId: lobby.id,
    });
    this.lastKnownLobbyPerUser.set(client.id, lobby.id);

    lobby.instance.dispatchGameState();
  }

  public deleteLobby(client: AuthenticatedSocket, lobbyId: string): void {
    const lobby = this.getLobby(client, lobbyId);
    if (!lobby) return;

    lobby.deleteLobby();

    lobby.clients.forEach((client) => {
      const connections =
        this.gameGateway.playerConnections.get(client.id) || [];

      connections.forEach((socket) => {
        socket.leave(lobbyId);
        socket.lobby = null;
        socket.emit(ServerEvents.LobbyLeave, { message: 'Lobby supprimé.' });
        this.clearLastLobbyForUser(socket.id);
      });
      this.clearLastLobbyForUser(client.id);
    });

    this.lobbies.delete(lobbyId);
  }

  private addLobby(client: AuthenticatedSocket, lobby: Lobby): void {
    const connections = this.gameGateway.playerConnections.get(client.id) || [];

    connections.forEach((socket) => {
      socket.lobby = lobby;
    });
  }

  public emitEventForAllConnexionsClient(
    client: AuthenticatedSocket,
    event: ServerEvents,
    data: any,
  ): void {
    const connections = this.gameGateway.playerConnections.get(client.id) || [];

    connections.forEach((socket) => {
      socket.emit(event, data);
    });
  }

  // Periodically clean up lobbies (every minutes)
  @Cron('5 * * * * *')
  private lobbiesCleaner(): void {
    for (const [lobbyId, lobby] of this.lobbies) {
      const now = new Date().getTime();
      const lobbyUpdatedAt = lobby.updatedAt.getTime();
      const lobbyLifetime = now - lobbyUpdatedAt;

      if (lobby.stateLobby === LOBBY_STATES.GAME_DELETED) {
        this.lobbies.delete(lobbyId);
        return;
      }

      if (lobbyLifetime > 1000 * 60 * 60) {
        lobby.deleteLobby();

        lobby.clients.forEach((client) => {
          const connections =
            this.gameGateway.playerConnections.get(client.id) || [];

          connections.forEach((socket) => {
            socket.leave(lobbyId);
            socket.lobby = null;
            socket.emit(ServerEvents.LobbyLeave, {
              message: 'Lobby supprimé.',
            });
          });
          this.clearLastLobbyForUser(client.id);
        });
      }
    }
  }
}
