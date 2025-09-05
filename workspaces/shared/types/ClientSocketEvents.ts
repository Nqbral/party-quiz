import { CLIENT_EVENTS } from "../consts/ClientEvents";

export type ClientSocketEvents = {
  // Lobby
  [CLIENT_EVENTS.LOBBY_CREATE]: undefined;
  [CLIENT_EVENTS.LOBBY_JOIN]: { lobbyIdJoin: string };
  [CLIENT_EVENTS.LOBBY_START_GAME]: undefined;
  [CLIENT_EVENTS.LOBBY_LEAVE]: undefined;
  [CLIENT_EVENTS.LOBBY_DELETE]: undefined;
  [CLIENT_EVENTS.LOBBY_RENAME]: { newName: string };

  // Game Owner
  [CLIENT_EVENTS.GAME_OWNER_NEXT_EVENT]: undefined;
  [CLIENT_EVENTS.GAME_OWNER_VALIDATE_QCM_QUESTION]: { answerIndex: number };
  [CLIENT_EVENTS.GAME_OWNER_VALIDATE_TEXT_QUESTION]: {
    correctPlayers: string[];
  };

  // Player
  [CLIENT_EVENTS.PLAYER_SUBMIT_QCM_ANSWER]: { answerIndex: number };
  [CLIENT_EVENTS.PLAYER_SUBMIT_CLOSE_NUMBER_ANSWER]: { answer: number };
  [CLIENT_EVENTS.PLAYER_SUBMIT_TEXT_ANSWER]: { answer: string };
};
