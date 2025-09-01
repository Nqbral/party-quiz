import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class StrategistCard extends Card {
  constructor() {
    super(
      NAME_CARD.STRATEGIST,
      6,
      2,
      "Piochez deux cartes, gardez-en une et replacez les autres sous la pioche."
    );
  }
}
