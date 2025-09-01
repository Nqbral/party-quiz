import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class SecurityAgentCard extends Card {
  constructor() {
    super(
      NAME_CARD.SECURITY_AGENT,
      1,
      6,
      "Devinez la carte d'un autre joueur. S'il s'agit de la bonne carte, il est éliminé."
    );
  }
}
