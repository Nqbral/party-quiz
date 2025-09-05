import QuestionEau from '@public/question-eau.png';
import QuestionJeuMots from '@public/question-jeu-mots.png';
import Image from 'next/image';

type Props = {
  indexQuestion: number | null | undefined;
};

export default function DisplayQuestionOwnerCloseNumberQuestion({
  indexQuestion,
}: Props) {
  return (
    <>
      {indexQuestion !== null &&
        indexQuestion !== undefined &&
        indexQuestion == 1 && (
          <div className="flex h-full w-full max-w-4xl flex-col items-center justify-center gap-4 text-center">
            <Image
              src={QuestionEau}
              alt="Question Eau"
              className="mb-4 w-full"
            />
          </div>
        )}
      {indexQuestion !== null &&
        indexQuestion !== undefined &&
        indexQuestion == 11 && (
          <div className="flex h-full w-full max-w-4xl flex-col items-center justify-center gap-4 text-center">
            <Image
              src={QuestionJeuMots}
              alt="Question Eau"
              className="mb-4 w-full"
            />
          </div>
        )}
    </>
  );
}
