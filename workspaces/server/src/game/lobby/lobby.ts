import { AuthenticatedSocket } from '@app/types/AuthenticatedSocket';
import { HttpService } from '@nestjs/axios';
import { WsException } from '@nestjs/websockets';
import { Player } from '@shared/classes/Player';
import { LOBBY_STATES } from '@shared/consts/LobbyStates';
import { ServerEvents } from '@shared/enums/ServerEvents';
import { ServerPayloads } from '@shared/types/ServerPayloads';
import { Server } from 'socket.io';
import { v4 } from 'uuid';

import { Instance } from '../instance/instance';

const PLAYER_COLORS = [
  'amber-400',
  'red-400',
  'blue-400',
  'emerald-400',
  'violet-400',
  'purple-400',
  'cyan-400',
  'pink-400',
  'green-500',
  'slate-500',
];

const PLAYERS_NAMES = [
  "Yoda's lovers",
  'Gamemasters',
  'Cesar slaves',
  'Masterchief fans',
  'Run Forest, RUN',
  'Monstres & Cie',
  'Fight Club',
  'The Escapes',
  'Nom de Zeus',
  'Texas Massacre',
];

export class Lobby {
  public readonly id: string = v4();

  public updatedAt: Date = new Date();

  public clients: AuthenticatedSocket[] = [];

  public stateLobby: string = LOBBY_STATES.IN_LOBBY;

  public stateBeforePause: string = '';

  public players: Player[] = [];

  public readonly instance: Instance = new Instance(this);

  constructor(
    private readonly server: Server,
    public readonly owner: AuthenticatedSocket,
  ) {}

  public addOwner(newOwner: AuthenticatedSocket): void {
    this.clients.push(newOwner);
    newOwner.join(this.id);

    newOwner.lobby = this;
  }

  public addClient(newClient: AuthenticatedSocket): void {
    if (this.clients.find((c) => c.id === newClient.id)) {
      throw new WsException('Client already in lobby');
    }

    if (
      this.stateLobby == LOBBY_STATES.GAME_DELETED ||
      this.stateLobby == LOBBY_STATES.GAME_FINISHED_BY_LEAVING
    ) {
      this.server.to(newClient.id).emit(ServerEvents.LobbyError, {
        error: 'Lobby finished',
        message:
          "La partie n'est pas joignable car elle est terminée ou supprimée.",
      });
      return;
    }

    if (this.stateLobby != LOBBY_STATES.IN_LOBBY) {
      this.server.to(newClient.id).emit(ServerEvents.LobbyError, {
        error: 'Lobby in progress',
        message:
          'La partie est déjà en cours. Vous ne pouvez pas la rejoindre.',
      });
      return;
    }

    if (this.players.length >= 10) {
      this.server.to(newClient.id).emit(ServerEvents.LobbyError, {
        error: 'Lobby in progress',
        message: 'Trop de personnes dans la partie.',
      });
      return;
    }

    this.clients.push(newClient);
    newClient.join(this.id);

    newClient.lobby = this;

    this.players.push(new Player(newClient.id));

    this.initColorsPlayers();
    this.initNamesPlayers();

    this.dispatchLobbyState();
  }

  public getPlayerById(userId: string): Player | undefined {
    return this.players.find((p) => p.clientId === userId);
  }

  public removeClient(client: AuthenticatedSocket): void {
    if (client.id !== this.owner.id) {
      if (this.stateLobby !== LOBBY_STATES.IN_LOBBY) {
        this.deleteLobby();
        return;
      }
      this.leaveLobby(client);
      return;
    }

    this.deleteLobby();
  }

  private initColorsPlayers(): void {
    this.players.forEach((player, index) => {
      player.color = PLAYER_COLORS[index];
    });
  }

  private initNamesPlayers(): void {
    this.players.forEach((player, index) => {
      player.userName = PLAYERS_NAMES[index];
    });
  }

  public startGame(client: AuthenticatedSocket): void {
    this.instance.triggerStart(client);
  }

  public leaveLobby(client: AuthenticatedSocket): void {
    client.lobby = null;
    client.leave(this.id);
    client.emit(ServerEvents.LobbyLeave);

    this.players = this.players.filter((p) => p.clientId !== client.id);
    this.clients = this.clients.filter((c) => c.id !== client.id);

    this.dispatchLobbyState();
  }

  public deleteLobby(): void {
    this.stateLobby = LOBBY_STATES.GAME_DELETED;

    this.dispatchLobbyState();
  }

  public dispatchLobbyState(): void {
    this.updatedAt = new Date();
    const payload: ServerPayloads[ServerEvents.LobbyState] = {
      lobbyId: this.id,
      ownerId: this.owner.id,
      stateLobby: this.stateLobby,
      players: this.players,
    };

    this.dispatchToLobby(ServerEvents.LobbyState, payload);
  }

  public dispatchToLobby<T>(event: ServerEvents, payload: T): void {
    this.server.to(this.id).emit(event, payload);
  }
}
