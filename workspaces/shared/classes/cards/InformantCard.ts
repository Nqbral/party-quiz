import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class InformantCard extends Card {
  constructor() {
    super(NAME_CARD.INFORMANT, 2, 2, "Regardez la main d'un autre joueur.");
  }
}
