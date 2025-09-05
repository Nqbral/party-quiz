import { QcmValidateQuestion } from '@party-quiz/shared/classes/questions/QcmValidateQuestion';

type Props = {
  question: QcmValidateQuestion | null;
};

export default function DisplayQuestionOwnerValidateQcm({ question }: Props) {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center sm:p-8">
      <div className="min-w-72 rounded-2xl bg-amber-500 p-4 text-2xl">
        {question?.answers[0]}
      </div>
      <div className="min-w-72 rounded-2xl bg-red-500 p-4 text-2xl">
        {question?.answers[1]}
      </div>
      <div className="min-w-72 rounded-2xl bg-blue-500 p-4 text-2xl">
        {question?.answers[2]}
      </div>
      {question?.answers[3] && (
        <div className="min-w-72 rounded-2xl bg-emerald-500 p-4 text-2xl">
          {question?.answers[3]}
        </div>
      )}
    </div>
  );
}
