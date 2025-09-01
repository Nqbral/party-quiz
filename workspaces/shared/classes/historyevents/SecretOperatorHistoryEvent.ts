import { HISTORY_EVENTS } from "../../consts/HistoryEvents";
import { HistoryEvent } from "../HistoryEvent";
import { Player } from "../Player";

export class SecretOperatorHistoryEvent extends HistoryEvent {
  constructor(public playerInitEvent: Player) {
    super(HISTORY_EVENTS.SECRET_OPERATOR, playerInitEvent);
  }
}
