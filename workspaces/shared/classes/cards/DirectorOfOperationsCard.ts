import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class DirectorOfOperationsCard extends Card {
  constructor() {
    super(
      NAME_CARD.DIRECTOR_OF_OPERATIONS,
      7,
      1,
      "Échangez votre main avec celle d'un autre joueur."
    );
  }
}
