import { useSocket } from '@contexts/SocketContext';
import { TextQuestionValidationQuestion } from '@party-quiz/shared/classes/questions/TextQuestionValidationQuestion';
import { CLIENT_EVENTS } from '@party-quiz/shared/consts/ClientEvents';
import { ServerEvents } from '@party-quiz/shared/enums/ServerEvents';
import { ServerPayloads } from '@party-quiz/shared/types/ServerPayloads';
import { useState } from 'react';

type Props = {
  question: TextQuestionValidationQuestion | null;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function ValidateTextQuestionOwner({
  question,
  gameState,
}: Props) {
  const { emitEvent } = useSocket();
  const [playersCorrect, setPlayersCorrect] = useState<string[]>([]);

  const validate = () => {
    emitEvent(CLIENT_EVENTS.GAME_OWNER_VALIDATE_TEXT_QUESTION, {
      correctPlayers: playersCorrect,
    });
  };

  const addOrDeleteCorrectPlayer = (clientId: string) => {
    setPlayersCorrect((prev) => {
      if (prev.includes(clientId)) {
        return prev.filter((id) => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center">
      <h2 className="pb-8 text-3xl font-bold">{question?.label}</h2>
      <ul className="border-2 border-slate-700 shadow-lg shadow-black">
        {gameState?.players
          .filter((p) => {
            return p.hasAnswered;
          })
          .map((player, index) => {
            return (
              <li
                key={`text-answer-player-${index}`}
                className="odd:bg-odd-list-tile even:bg-even-list-tile px-4 py-2"
              >
                <div className="flex w-3xl flex-row items-center justify-between">
                  <div className={`text-${player.color}`}>
                    {player.userName}
                  </div>
                  <div>{player.answer}</div>
                  <input
                    type="checkbox"
                    onClick={() => addOrDeleteCorrectPlayer(player.clientId)}
                  />
                </div>
              </li>
            );
          })}
      </ul>
      <button
        className="button border-primary hover:border-primary-hover my-1 min-w-48 rounded-md border-2 px-6 py-2 text-base transition-colors"
        onClick={validate}
      >
        Valider
      </button>
    </div>
  );
}
