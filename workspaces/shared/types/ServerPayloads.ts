import { ServerEvents } from "../enums/ServerEvents";
import { Player } from "../classes/Player";
import { Card } from "../classes/Card";
import { HistoryEvent } from "../classes/HistoryEvent";
import { EventDescription, EventDescriptionKey } from "./EventDescription";
import { RoundRecap } from "../classes/RoundRecap";

export type ServerPayloads = {
  [ServerEvents.LobbyCreate]: {
    lobbyId: string;
  };

  [ServerEvents.LobbyState]: {
    lobbyId: string;
    ownerId: string;
    stateLobby: string;
    players: Player[];
  };

  [ServerEvents.LobbyError]: {
    error: string;
    message: string;
  };

  [ServerEvents.GameState]: {
    lobbyId: string;
    stateGame: string;
    roundNumber: number;
    players: Player[];
    playerTurn: Player | null;
    playersTurnOrder: Player[];
    deck: Card[];
    lastPlayedCard: string;
    secondPlayedCard: string;
    scoreToReach: number;
    historyEvents: HistoryEvent[];
    eventDescription: EventDescription[EventDescriptionKey];
    eventDescriptionKey: EventDescriptionKey;
    roundRecap: RoundRecap | null;
  };
};
