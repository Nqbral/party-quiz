import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class DiscreetAssistantCard extends Card {
  constructor() {
    super(
      NAME_CARD.DISCREET_ASSISTANT,
      4,
      2,
      "Vous êtes protégé jusqu'à votre prochain tour."
    );
  }
}
