import { Question } from '@party-quiz/shared/classes/Question';
import { CloseNumberQuestion } from '@party-quiz/shared/classes/questions/CloseNumberQuestion';
import { QcmQuestion } from '@party-quiz/shared/classes/questions/QcmQuestion';
import { QcmValidateQuestion } from '@party-quiz/shared/classes/questions/QcmValidateQuestion';
import { TYPE_QUESTIONS } from '@party-quiz/shared/consts/TypeQuestions';

import RecapAnswerownerCloseNumber from './recapanswerowner/RecapAnswerOwnerCloseNumber';
import RecapAnswerOwnerQcm from './recapanswerowner/RecapAnswerOwnerQcm';
import RecapAnswerOwnerValidateQcm from './recapanswerowner/RecapAnswerOwnerValidateQcm';

type Props = {
  question: Question | null | undefined;
};

export default function RecapAnswerOwner({ question }: Props) {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center sm:p-8">
      <h2 className="text-3xl font-bold">{question?.label}</h2>
      {question?.typeQuestion === TYPE_QUESTIONS.QCM && (
        <RecapAnswerOwnerQcm question={question as QcmQuestion} />
      )}
      {question?.typeQuestion === TYPE_QUESTIONS.CLOSE_NUMBER && (
        <RecapAnswerownerCloseNumber
          question={question as CloseNumberQuestion}
        />
      )}
      {question?.typeQuestion === TYPE_QUESTIONS.QCM_VALIDATE && (
        <RecapAnswerOwnerValidateQcm
          question={question as QcmValidateQuestion}
        />
      )}
    </div>
  );
}
