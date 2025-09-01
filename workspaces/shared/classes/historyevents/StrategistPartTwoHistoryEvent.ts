import { HISTORY_EVENTS } from "../../consts/HistoryEvents";
import { HistoryEvent } from "../HistoryEvent";
import { Player } from "../Player";

export class StrategistPartTwoHistoryEvent extends HistoryEvent {
  constructor(
    public playerInitEvent: Player,
    public readonly nbCardDraw: number
  ) {
    super(HISTORY_EVENTS.STRATEGIST_PART_TWO, playerInitEvent);
  }
}
