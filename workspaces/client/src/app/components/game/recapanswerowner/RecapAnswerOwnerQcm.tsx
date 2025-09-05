import { QcmQuestion } from '@party-quiz/shared/classes/questions/QcmQuestion';

type Props = {
  question: QcmQuestion | null;
};

export default function RecapAnswerOwnerQcm({ question }: Props) {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center text-2xl sm:pt-8">
      <div>
        La bonne réponse est :{' '}
        <span className="font-bold">
          {question?.answers[question.valideAnswerIndex]}
        </span>
      </div>
      {question?.negativeAnswerIndex != null && (
        <div>
          Il ne fallait pas répondre{' '}
          <span className="font-bold">
            {' '}
            : {question?.answers[question.negativeAnswerIndex]}
          </span>
        </div>
      )}
    </div>
  );
}
