import { HISTORY_EVENTS } from "../../consts/HistoryEvents";
import { HistoryEvent } from "../HistoryEvent";
import { Player } from "../Player";

export class MagnateHistoryEvent extends HistoryEvent {
  constructor(
    public playerInitEvent: Player,
    public readonly targetPlayer: Player,
    public result: string,
    public cardLooser: string
  ) {
    super(HISTORY_EVENTS.MAGNATE, playerInitEvent);
  }
}
