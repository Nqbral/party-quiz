import { QcmValidateQuestion } from '@party-quiz/shared/classes/questions/QcmValidateQuestion';

type Props = {
  question: QcmValidateQuestion | null;
};

export default function RecapAnswerOwnerValidateQcm({ question }: Props) {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center text-2xl sm:pt-8">
      <div>
        La bonne réponse est :{' '}
        <span className="font-bold">
          {question?.valideAnswerIndex &&
            question?.answers[question.valideAnswerIndex]}
        </span>
      </div>
    </div>
  );
}
