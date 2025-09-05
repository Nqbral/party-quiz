import { TYPE_QUESTIONS } from "../../consts/TypeQuestions";
import { Question } from "../Question";

export class TextQuestionValidationQuestion extends Question {
  constructor(label: string) {
    super(label, TYPE_QUESTIONS.TEXT_QUESTION_VALIDATION);
  }
}
