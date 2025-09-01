import { Card } from "../classes/Card";
import { CLIENT_EVENTS } from "../consts/ClientEvents";

export type ClientSocketEvents = {
  // Lobby
  [CLIENT_EVENTS.LOBBY_CREATE]: undefined;
  [CLIENT_EVENTS.LOBBY_JOIN]: { lobbyIdJoin: string };
  [CLIENT_EVENTS.LOBBY_START_GAME]: undefined;
  [CLIENT_EVENTS.LOBBY_LEAVE]: undefined;
  [CLIENT_EVENTS.LOBBY_DELETE]: undefined;

  // Game
  [CLIENT_EVENTS.GAME_READY]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_WITHOUT_EFFECT]: { cardPlayed: string };
  [CLIENT_EVENTS.GAME_PLAY_SECRET_OPERATOR]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_SECURITY_AGENT]: {
    cardGuessed: string;
    playerTargetedId: string;
  };
  [CLIENT_EVENTS.GAME_PLAY_INFORMANT]: { playerTargetedId: string };
  [CLIENT_EVENTS.GAME_PLAY_MAGNATE]: { playerTargetedId: string };
  [CLIENT_EVENTS.GAME_PLAY_DISCREET_ASSISTANT]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_UNDERCOVER_AGENT]: { playerTargetedId: string };
  [CLIENT_EVENTS.GAME_PLAY_STRATEGIST]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_STRATEGIST_PART_TWO]: {
    indexCardsDiscarded: number[];
    cardsDiscarded: Card[];
  };
  [CLIENT_EVENTS.GAME_PLAY_DIRECTOR_OF_OPERATIONS]: {
    playerTargetedId: string;
  };
  [CLIENT_EVENTS.GAME_PLAY_DIPLOMAT]: undefined;
  [CLIENT_EVENTS.GAME_PLAY_DOUBLE_AGENT]: undefined;
};
