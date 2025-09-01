import { HISTORY_EVENTS } from "../../consts/HistoryEvents";
import { HistoryEvent } from "../HistoryEvent";
import { Player } from "../Player";

export class WithoutEffectHistoryEvent extends HistoryEvent {
  constructor(
    public playerInitEvent: Player,
    public readonly cardName: string
  ) {
    super(HISTORY_EVENTS.WITHOUT_EFFECT_CARD, playerInitEvent);
  }
}
