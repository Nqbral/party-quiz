import { HISTORY_EVENTS } from "../../consts/HistoryEvents";
import { HistoryEvent } from "../HistoryEvent";
import { Player } from "../Player";

export class SecurityAgentHistoryEvent extends HistoryEvent {
  constructor(
    public playerInitEvent: Player,
    public readonly targetPlayer: Player,
    public readonly card: string,
    public readonly cardGuessed: boolean
  ) {
    super(HISTORY_EVENTS.SECURITY_AGENT, playerInitEvent);
  }
}
