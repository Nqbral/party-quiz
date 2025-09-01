import { HISTORY_EVENTS } from "../../consts/HistoryEvents";
import { HistoryEvent } from "../HistoryEvent";
import { Player } from "../Player";

export class UndercoverAgentHistoryEvent extends HistoryEvent {
  constructor(
    public playerInitEvent: Player,
    public readonly targetPlayer: Player,
    public readonly discardedCard: string,
    public kill: boolean
  ) {
    super(HISTORY_EVENTS.UNDERCOVER_AGENT, playerInitEvent);
  }
}
