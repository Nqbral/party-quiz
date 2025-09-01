import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class UndercoverAgentCard extends Card {
  constructor() {
    super(
      NAME_CARD.UNDERCOVER_AGENT,
      5,
      2,
      "Choisissez un joueur (y compris vous-même) pour défausser sa main."
    );
  }
}
