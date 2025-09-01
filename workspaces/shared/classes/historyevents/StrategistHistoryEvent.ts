import { HISTORY_EVENTS } from "../../consts/HistoryEvents";
import { HistoryEvent } from "../HistoryEvent";
import { Player } from "../Player";

export class StrategistHistoryEvent extends HistoryEvent {
  constructor(
    public playerInitEvent: Player,
    public nbCardDraw: number
  ) {
    super(HISTORY_EVENTS.STRATEGIST, playerInitEvent);
  }
}
