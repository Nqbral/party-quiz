import { Player } from '@party-quiz/shared/classes/Player';
import { Question } from '@party-quiz/shared/classes/Question';
import { CloseNumberQuestion } from '@party-quiz/shared/classes/questions/CloseNumberQuestion';
import { QcmQuestion } from '@party-quiz/shared/classes/questions/QcmQuestion';
import { QcmValidateQuestion } from '@party-quiz/shared/classes/questions/QcmValidateQuestion';
import { TYPE_QUESTIONS } from '@party-quiz/shared/consts/TypeQuestions';

import DisplayQuestionPlayerCloseNumberQuestion from './displayquestionplayer/DisplayQuestionCloseNumberQuestion';
import DisplayQuestionPlayerQcm from './displayquestionplayer/DisplayQuestionPlayerQcm';
import DisplayQuestionPlayerText from './displayquestionplayer/DisplayQuestionPlayerText';
import DisplayQuestionPlayerValidateQcm from './displayquestionplayer/DisplayQuestionPlayerValidateQcm';

type Props = {
  question: Question | null | undefined;
  player: Player | undefined;
};

export default function DisplayQuestionPlayer({ question, player }: Props) {
  if (player?.hasAnswered) {
    return (
      <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center sm:p-8">
        <h2 className="text-lg font-bold">{question?.label}</h2>
        <div>
          Vous avez répondu à cette question. En attente des autres joueurs.
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center sm:p-8">
      <h2 className="text-lg font-bold">{question?.label}</h2>
      {question?.typeQuestion === TYPE_QUESTIONS.QCM && (
        <DisplayQuestionPlayerQcm question={question as QcmQuestion} />
      )}
      {question?.typeQuestion === TYPE_QUESTIONS.QCM_VALIDATE && (
        <DisplayQuestionPlayerValidateQcm
          question={question as QcmValidateQuestion}
        />
      )}
      {question?.typeQuestion === TYPE_QUESTIONS.CLOSE_NUMBER && (
        <DisplayQuestionPlayerCloseNumberQuestion
          question={question as CloseNumberQuestion}
        />
      )}
      {question?.typeQuestion === TYPE_QUESTIONS.TEXT_QUESTION_VALIDATION && (
        <DisplayQuestionPlayerText />
      )}
    </div>
  );
}
