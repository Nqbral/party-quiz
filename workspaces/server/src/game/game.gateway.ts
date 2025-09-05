import { LobbyManager } from '@app/game/lobby/lobby.manager';
import { AuthenticatedSocket } from '@app/types/AuthenticatedSocket';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { CLIENT_EVENTS } from '@shared/consts/ClientEvents';
import { LOBBY_STATES } from '@shared/consts/LobbyStates';
import { ServerEvents } from '@shared/enums/ServerEvents';
import { Server } from 'socket.io';

import {
  GameOwnerValidateQcmQuestionDto,
  GameOwnerValidateTextQuestionDto,
  LobbyJoinDto,
  LobbyRenameDto,
  PlayerSubmitCloseNumberAnswerDto,
  PlayerSubmitQcmAnswerDto,
  PlayerSubmitTextAnswerDto,
} from './lobby/dtos';

@WebSocketGateway()
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  public playerConnections: Map<string, AuthenticatedSocket[]> = new Map();

  constructor(private lobbyManager: LobbyManager) {}

  afterInit(server: Server): any {
    this.lobbyManager.server = server;
    this.lobbyManager.setGameGateway(this);
  }

  async handleConnection(client: any, ...args: any[]): Promise<void> {
    this.lobbyManager.initializeSocket(client as AuthenticatedSocket);

    const existingSockets = this.playerConnections.get(client.id) || [];
    this.playerConnections.set(client.id, [...existingSockets, client]);

    client.emit(ServerEvents.Authenticated, {
      clientId: client.id,
    });
  }

  async handleDisconnect(client: any): Promise<void> {
    // Handle termination of socket
    this.lobbyManager.terminateSocket(client);
  }

  @SubscribeMessage(CLIENT_EVENTS.LOBBY_CREATE)
  async createLobby(@ConnectedSocket() client: AuthenticatedSocket) {
    this.lobbyManager.createLobby(client);
  }

  @SubscribeMessage(CLIENT_EVENTS.LOBBY_JOIN)
  onLobbyJoin(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: LobbyJoinDto,
  ): void {
    this.lobbyManager.joinLobby(data.lobbyIdJoin, client);
  }

  @SubscribeMessage(CLIENT_EVENTS.LOBBY_START_GAME)
  handleStartGame(@ConnectedSocket() client: AuthenticatedSocket) {
    const lobby = client.lobby;

    if (!lobby) throw new WsException('Lobby introuvable');

    if (lobby.owner.id !== client.id) {
      throw new WsException("Vous n'êtes pas le propriétaire du lobby.");
    }

    lobby.startGame(client);
  }

  @SubscribeMessage(CLIENT_EVENTS.LOBBY_LEAVE)
  handleLeaveGame(@ConnectedSocket() client: AuthenticatedSocket) {
    const lobby = client.lobby;

    if (!lobby) throw new WsException('Lobby introuvable');

    this.lobbyManager.clearLastLobbyForUser(client.id);
    this.lobbyManager.emitEventForAllConnexionsClient(
      client,
      ServerEvents.LobbyLeave,
      undefined,
    );

    if (
      lobby.stateLobby === LOBBY_STATES.IN_LOBBY &&
      lobby.owner.id === client.id
    ) {
      this.lobbyManager.deleteLobby(client, lobby.id);
      return;
    }

    lobby.leaveLobby(client);
  }

  @SubscribeMessage(CLIENT_EVENTS.LOBBY_DELETE)
  handleDeleteLobby(@ConnectedSocket() client: AuthenticatedSocket) {
    const lobby = client.lobby;

    if (!lobby) throw new WsException('Lobby introuvable');

    if (lobby.owner.id !== client.id) {
      throw new WsException("Vous n'êtes pas le propriétaire du lobby.");
    }

    this.lobbyManager.deleteLobby(client, lobby.id);
  }

  @SubscribeMessage(CLIENT_EVENTS.LOBBY_RENAME)
  onLobbyRename(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: LobbyRenameDto,
  ) {
    const lobby = client.lobby;

    if (!lobby) throw new WsException('Lobby introuvable');

    lobby.instance.renamePlayer(client, data.newName);
  }

  @SubscribeMessage(CLIENT_EVENTS.GAME_OWNER_NEXT_EVENT)
  handleNextEvent(@ConnectedSocket() client: AuthenticatedSocket) {
    const lobby = client.lobby;

    if (!lobby) throw new WsException('Lobby introuvable');

    if (lobby.owner.id !== client.id) {
      throw new WsException("Vous n'êtes pas le propriétaire du lobby.");
    }

    lobby.instance.nextEvent();
  }

  @SubscribeMessage(CLIENT_EVENTS.GAME_OWNER_VALIDATE_QCM_QUESTION)
  onSubmitOwnerValidateQcmQuestion(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: GameOwnerValidateQcmQuestionDto,
  ) {
    const lobby = client.lobby;

    if (!lobby) throw new WsException('Lobby introuvable');

    if (lobby.owner.id !== client.id) {
      throw new WsException("Vous n'êtes pas le propriétaire du lobby.");
    }

    lobby.instance.ownerValidateQcm(data.answerIndex);
  }

  @SubscribeMessage(CLIENT_EVENTS.GAME_OWNER_VALIDATE_TEXT_QUESTION)
  onSubmitOwnerValidateTextQuestion(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: GameOwnerValidateTextQuestionDto,
  ) {
    const lobby = client.lobby;

    if (!lobby) throw new WsException('Lobby introuvable');

    if (lobby.owner.id !== client.id) {
      throw new WsException("Vous n'êtes pas le propriétaire du lobby.");
    }

    lobby.instance.ownerValidateText(data.correctPlayers);
  }

  @SubscribeMessage(CLIENT_EVENTS.PLAYER_SUBMIT_QCM_ANSWER)
  onSubmitAnswerQcm(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: PlayerSubmitQcmAnswerDto,
  ) {
    const lobby = client.lobby;

    if (!lobby) throw new WsException('Lobby introuvable');

    lobby.instance.answerQcm(client, data.answerIndex);
  }

  @SubscribeMessage(CLIENT_EVENTS.PLAYER_SUBMIT_TEXT_ANSWER)
  onSubmitTextAnswer(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: PlayerSubmitTextAnswerDto,
  ) {
    const lobby = client.lobby;

    if (!lobby) throw new WsException('Lobby introuvable');

    lobby.instance.answerText(client, data.answer);
  }

  @SubscribeMessage(CLIENT_EVENTS.PLAYER_SUBMIT_CLOSE_NUMBER_ANSWER)
  onSubmitAnswerCloseNumber(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: PlayerSubmitCloseNumberAnswerDto,
  ) {
    const lobby = client.lobby;

    if (!lobby) throw new WsException('Lobby introuvable');

    lobby.instance.answerCloseNumber(client, data.answer);
  }
}
