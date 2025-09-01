import { NAME_CARD } from "../consts/NameCard";
import { Player } from "./Player";

export class RoundRecap {
  public playersWhoWinByValue: Player[] = [];

  public playerWhoWinBySecretOperator: Player | undefined;

  public playersAlive: Player[];

  public playersWhoWinMatch: Player[] = [];

  constructor(
    public players: Player[],
    public scoreToReach: number
  ) {
    this.playersAlive = this.players.filter((player) => {
      return player.alive;
    });
  }

  public calculateScoreByValue(): void {
    let maxCardValue = 0;

    this.playersAlive.forEach((playerAlive) => {
      if (playerAlive.hand[0].value > maxCardValue) {
        maxCardValue = playerAlive.hand[0].value;
      }
    });

    this.playersWhoWinByValue = this.playersAlive.filter((player) => {
      return player.hand[0].value == maxCardValue;
    });

    this.playersWhoWinByValue.forEach((player) => {
      player.score = player.score + 1;
    });

    this.playersWhoWinByValue = this.playersWhoWinByValue.sort(
      (playerA, playerB) => {
        if (playerA.hand[0].value > playerB.hand[0].value) {
          return 1;
        }

        if (playerA.hand[0].value < playerB.hand[0].value) {
          return -1;
        }

        return 0;
      }
    );
  }

  public calculateScoreBySpy(): void {
    this.playerWhoWinBySecretOperator = undefined;

    let playersWhoHaveSecretOperator = this.playersAlive.filter((player) => {
      return (
        player.activeCards.find(
          (card) => card.nameCard == NAME_CARD.SECRET_OPERATOR
        ) !== undefined
      );
    });

    if (playersWhoHaveSecretOperator.length == 1) {
      this.playerWhoWinBySecretOperator = playersWhoHaveSecretOperator[0];
      this.playerWhoWinBySecretOperator.score =
        this.playerWhoWinBySecretOperator.score + 1;
      return;
    }
  }

  public checkEndGame(): boolean {
    let endGame = false;

    this.players.forEach((player) => {
      if (player.score >= this.scoreToReach) {
        endGame = true;
        this.playersWhoWinMatch.push(player);
      }
    });

    return endGame;
  }

  public getPlayerFromWinner(): Player {
    let index = Math.floor(Math.random() * this.playersWhoWinByValue.length);
    return this.playersWhoWinByValue[index];
  }
}
