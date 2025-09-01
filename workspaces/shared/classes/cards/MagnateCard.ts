import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class MagnateCard extends Card {
  constructor() {
    super(
      NAME_CARD.MAGNATE,
      3,
      2,
      "Comparez votre main avec celle d'un autre joueur."
    );
  }
}
