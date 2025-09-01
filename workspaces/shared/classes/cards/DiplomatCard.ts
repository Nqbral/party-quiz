import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class DiplomatCard extends Card {
  constructor() {
    super(
      NAME_CARD.DIPLOMAT,
      8,
      1,
      "Doit être jouée si vous avez le Directeur des opérations ou l'agent infiltré en main."
    );
  }
}
