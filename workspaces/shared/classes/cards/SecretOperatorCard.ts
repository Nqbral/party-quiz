import { NAME_CARD } from "../../consts/NameCard";
import { Card } from "../Card";

export class SecretOperatorCard extends Card {
  constructor() {
    super(
      NAME_CARD.SECRET_OPERATOR,
      0,
      2,
      "Si vous êtes le seul joueur en lice avec un opérateur secret joué à la fin de la manche, gagnez un jeton Dossier Confidentiel."
    );
  }
}
