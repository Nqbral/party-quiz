import { TYPE_QUESTIONS } from "../../consts/TypeQuestions";
import { Question } from "../Question";

export class QcmValidateQuestion extends Question {
  constructor(
    label: string,
    public readonly answers: string[],
    public valideAnswerIndex: number | null = null
  ) {
    super(label, TYPE_QUESTIONS.QCM_VALIDATE);
  }
}
