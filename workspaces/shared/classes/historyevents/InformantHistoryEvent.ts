import { HISTORY_EVENTS } from "../../consts/HistoryEvents";
import { HistoryEvent } from "../HistoryEvent";
import { Player } from "../Player";

export class InformantHistoryEvent extends HistoryEvent {
  constructor(
    public playerInitEvent: Player,
    public readonly targetPlayer: Player
  ) {
    super(HISTORY_EVENTS.INFORMANT, playerInitEvent);
  }
}
