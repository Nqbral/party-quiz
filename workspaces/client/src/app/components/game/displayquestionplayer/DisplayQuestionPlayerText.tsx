import { useSocket } from '@contexts/SocketContext';
import { CLIENT_EVENTS } from '@party-quiz/shared/consts/ClientEvents';
import { useState } from 'react';

export default function DisplayQuestionPlayerText() {
  const [value, setValue] = useState<string>('');
  const { emitEvent } = useSocket();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
  };

  const handleValidate = () => {
    emitEvent(CLIENT_EVENTS.PLAYER_SUBMIT_TEXT_ANSWER, {
      answer: value,
    });
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center">
      <input
        type="text"
        className="min-w-72 rounded-2xl border-2 border-gray-300 p-4 text-center text-base focus:border-amber-500 focus:outline-none"
        placeholder="Votre réponse"
        value={value}
        onChange={handleChange}
      />
      <button
        className="button border-primary hover:border-primary-hover my-1 min-w-48 rounded-md border-2 px-6 py-2 text-base transition-colors"
        onClick={handleValidate}
      >
        Valider
      </button>
    </div>
  );
}
