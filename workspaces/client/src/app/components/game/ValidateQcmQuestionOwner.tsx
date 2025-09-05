import { useSocket } from '@contexts/SocketContext';
import { QcmValidateQuestion } from '@party-quiz/shared/classes/questions/QcmValidateQuestion';
import { CLIENT_EVENTS } from '@party-quiz/shared/consts/ClientEvents';

type Props = {
  question: QcmValidateQuestion | null;
};

export default function ValidateQcmQuestionOwner({ question }: Props) {
  const { emitEvent } = useSocket();

  const handleAnswer = (index: number) => {
    emitEvent(CLIENT_EVENTS.GAME_OWNER_VALIDATE_QCM_QUESTION, {
      answerIndex: index,
    });
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-3xl font-bold">{question?.label}</h2>
      <button
        className="min-w-72 rounded-2xl bg-amber-500 p-4 text-base"
        onClick={() => handleAnswer(0)}
      >
        {question?.answers[0]}
      </button>
      <button
        className="min-w-72 rounded-2xl bg-red-500 p-4 text-base"
        onClick={() => handleAnswer(1)}
      >
        {question?.answers[1]}
      </button>
      <button
        className="min-w-72 rounded-2xl bg-blue-500 p-4 text-base"
        onClick={() => handleAnswer(2)}
      >
        {question?.answers[2]}
      </button>
      {question?.answers[3] && (
        <button
          className="min-w-72 rounded-2xl bg-emerald-500 p-4 text-base"
          onClick={() => handleAnswer(3)}
        >
          {question?.answers[3]}
        </button>
      )}
    </div>
  );
}
