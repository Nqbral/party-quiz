import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class DoubleAgentCard extends Card {
  constructor() {
    super(
      NAME_CARD.DOUBLE_AGENT,
      9,
      1,
      "Si vous jouez ou défaussez cette carte, vous êtes éliminé."
    );
  }
}
