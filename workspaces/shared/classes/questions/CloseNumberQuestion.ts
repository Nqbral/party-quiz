import { TYPE_QUESTIONS } from "../../consts/TypeQuestions";
import { Question } from "../Question";

export class CloseNumberQuestion extends Question {
  constructor(
    label: string,
    public readonly correctAnswer: number,
    public readonly minimum: number | null = null,
    public readonly maximum: number | null = null
  ) {
    super(label, TYPE_QUESTIONS.CLOSE_NUMBER);
  }
}
