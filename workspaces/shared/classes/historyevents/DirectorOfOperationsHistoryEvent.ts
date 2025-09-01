import { HISTORY_EVENTS } from "../../consts/HistoryEvents";
import { HistoryEvent } from "../HistoryEvent";
import { Player } from "../Player";

export class DirectorOfOperationsHistoryEvent extends HistoryEvent {
  constructor(
    public playerInitEvent: Player,
    public readonly targetPlayer: Player
  ) {
    super(HISTORY_EVENTS.DIRECTOR_OF_OPERATIONS, playerInitEvent);
  }
}
