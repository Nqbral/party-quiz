import { IsArray, IsNumber, IsString } from 'class-validator';

export class LobbyJoinDto {
  @IsString()
  lobbyIdJoin: string;
}

export class LobbyRenameDto {
  @IsString()
  newName: string;
}

export class GameOwnerValidateQcmQuestionDto {
  @IsNumber()
  answerIndex: number;
}

export class GameOwnerValidateTextQuestionDto {
  @IsArray()
  correctPlayers: string[];
}

export class PlayerSubmitQcmAnswerDto {
  @IsNumber()
  answerIndex: number;
}

export class PlayerSubmitCloseNumberAnswerDto {
  @IsNumber()
  answer: number;
}

export class PlayerSubmitTextAnswerDto {
  @IsString()
  answer: string;
}
