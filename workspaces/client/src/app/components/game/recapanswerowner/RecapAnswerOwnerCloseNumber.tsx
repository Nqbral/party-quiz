import { CloseNumberQuestion } from '@party-quiz/shared/classes/questions/CloseNumberQuestion';

type Props = {
  question: CloseNumberQuestion | null;
};

export default function RecapAnswerownerCloseNumber({ question }: Props) {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center text-2xl sm:pt-8">
      <div>
        La bonne réponse est :{' '}
        <span className="font-bold">{question?.correctAnswer}</span>
      </div>
    </div>
  );
}
