export class Player {
  public color: string = "";
  public score: number = 0;
  public isRenamed: boolean = false;
  public answer: string | number | null = null;
  public hasAnswered: boolean = false;
  public scoreThisRound: number = 0;
  public userName: string = "";

  constructor(public readonly clientId: string) {}
}
