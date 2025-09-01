import { HISTORY_EVENTS } from "../../consts/HistoryEvents";
import { HistoryEvent } from "../HistoryEvent";
import { Player } from "../Player";

export class DoubleAgentHistoryEvent extends HistoryEvent {
  constructor(public playerInitEvent: Player) {
    super(HISTORY_EVENTS.DOUBLE_AGENT, playerInitEvent);
  }
}
