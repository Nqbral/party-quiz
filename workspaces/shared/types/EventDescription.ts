import { Player } from "../classes/Player";
import { EventDescriptonNames } from "../enums/EventDescriptionNames";

export type EventDescriptionKey = keyof EventDescription;

export type EventDescription = {
  [EventDescriptonNames.None]: undefined;

  [EventDescriptonNames.SecurityAgentGuess]: {
    playerWhoPlay: Player;
    playerTarget: Player;
    cardGuessed: string;
    isGuessed: boolean;
  };

  [EventDescriptonNames.InformantCheck]: {
    playerWhoPlay: Player;
    playerTarget: Player;
    cardChecked: string;
  };

  [EventDescriptonNames.MagnateComparison]: {
    playerWhoPlay: Player;
    playerTarget: Player;
    result: string;
    cardPlayer: string;
    cardTarget: string;
  };

  [EventDescriptonNames.UndercoverAgentDiscard]: {
    playerWhoPlay: Player;
    playerTarget: Player;
    cardDiscarded: string;
  };

  [EventDescriptonNames.StrategistDraw]: {
    playerWhoPlay: Player;
  };

  [EventDescriptonNames.DirectorOfOperationsSwap]: {
    playerWhoPlay: Player;
    playerTarget: Player;
    cardTradeWhoPlay: string;
    cardTradeTarget: string;
  };
};
