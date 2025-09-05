export const GAME_STATES = {
  QCM_QUESTION: "game.state.qcm.question",
  QCM_QUESTION_SHOW_ANSWER: "game.state.qcm.question.show.answer",
  QCM_QUESTION_VALIDATE: "game.state.qcm.question.validate",
  QCM_QUESTION_VALIDATE_OWNER: "game.state.qcm.question.validate.owner",
  QCM_QUESTION_VALIDATE_SHOW_ANSWER:
    "game.state.qcm.question.validate.show.answer",
  CLOSE_NUMBER_QUESTION: "game.state.close.number.question",
  CLOSE_NUMBER_QUESTION_SHOW_ANSWER:
    "game.state.close.number.question.show.answer",
  TEXT_QUESTION_VALIDATION: "game.state.text.question.validation",
  TEXT_QUESTION_VALIDATION_VALIDATION:
    "game.state.text.question.validation.validation",
  TEXT_QUESTION_VALIDATION_SHOW_ANSWER:
    "game.state.text.question.validation.show.answer",
  GAME_FINISHED: "game.state.finished",
} as const;
