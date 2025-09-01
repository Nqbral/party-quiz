import { Card } from "./Card";

export class Player {
  public color: string = "";
  public ready: boolean = false;
  public hand: Card[] = [];
  public activeCards: Card[] = [];
  public alive: boolean = true;
  public score: number = 0;

  constructor(
    public readonly userId: string,
    public readonly userName: string,
    public disconnected: boolean = false
  ) {}
}
