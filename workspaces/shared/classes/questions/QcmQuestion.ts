import { TYPE_QUESTIONS } from "../../consts/TypeQuestions";
import { Question } from "../Question";

export class QcmQuestion extends Question {
  constructor(
    label: string,
    public readonly answers: string[],
    public readonly valideAnswerIndex: number,
    public readonly negativeAnswerIndex: number | null = null
  ) {
    super(label, TYPE_QUESTIONS.QCM);
  }
}
