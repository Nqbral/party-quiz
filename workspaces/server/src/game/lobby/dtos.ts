import { Card } from '@shared/classes/Card';
import { IsNumber, IsString } from 'class-validator';

export class LobbyJoinDto {
  @IsString()
  lobbyIdJoin: string;
}

export class PlayWithoutEffectDto {
  @IsString()
  cardPlayed: string;
}

export class PlaySecurityAgentDto {
  @IsString()
  cardGuessed: string;

  @IsString()
  playerTargetedId: string;
}

export class PlayInformantDto {
  @IsString()
  playerTargetedId: string;
}

export class PlayMagnateDto {
  @IsString()
  playerTargetedId: string;
}

export class PlayUndercoverAgentDto {
  @IsString()
  playerTargetedId: string;
}

export class PlayStrategistPartTwoDto {
  indexCardsDiscarded: number[];
  cardsDiscarded: Card[];
}

export class PlayDirectorOfOperationsDto {
  @IsString()
  playerTargetedId: string;
}
