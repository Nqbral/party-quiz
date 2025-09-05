import { useSocket } from '@contexts/SocketContext';
import { CloseNumberQuestion } from '@party-quiz/shared/classes/questions/CloseNumberQuestion';
import { CLIENT_EVENTS } from '@party-quiz/shared/consts/ClientEvents';
import { useState } from 'react';

type Props = {
  question: CloseNumberQuestion | null | undefined;
};

export default function DisplayQuestionPlayerCloseNumberQuestion({
  question,
}: Props) {
  const { emitEvent } = useSocket();
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const min = question?.minimum;
  const max = question?.maximum;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    if (val === '') {
      setError('');
      return;
    }

    const num = Number(val);
    if (
      (min !== undefined && min != null && num < min) ||
      (max !== undefined && max != null && num > max)
    ) {
      if (max == null || max == undefined) {
        setError(`La valeur doit être supérieure ou égale à ${min}.`);
        return;
      }
      setError(`La valeur doit être comprise entre ${min} et ${max}.`);
    } else {
      setError('');
    }
  };

  const handleValidate = () => {
    if (
      (min !== undefined && min != null && parseInt(value) < min) ||
      (max !== undefined && max != null && parseInt(value) > max)
    ) {
      if (max == null || max == undefined) {
        setError(`La valeur doit être supérieure ou égale à ${min}.`);
        return;
      }
      setError(`La valeur doit être comprise entre ${min} et ${max}.`);
      return;
    }

    emitEvent(CLIENT_EVENTS.PLAYER_SUBMIT_CLOSE_NUMBER_ANSWER, {
      answer: parseInt(value),
    });
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center">
      <input
        type="number"
        className="min-w-72 rounded-2xl border-2 border-gray-300 p-4 text-center text-base focus:border-amber-500 focus:outline-none"
        placeholder="Votre réponse"
        min={
          question?.minimum != undefined && question?.minimum != null
            ? question.minimum
            : undefined
        }
        max={
          question?.maximum != undefined && question?.maximum != null
            ? question.maximum
            : undefined
        }
        value={value}
        onChange={handleChange}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button
        className="button border-primary hover:border-primary-hover my-1 min-w-48 rounded-md border-2 px-6 py-2 text-base transition-colors"
        onClick={handleValidate}
      >
        Valider
      </button>
    </div>
  );
}
