import { Player } from "./Player";

export class HistoryEvent {
  constructor(
    public readonly nameEvent: string,
    public readonly playerInitEvent: Player
  ) {}
}
