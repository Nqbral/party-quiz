import { useSocket } from '@contexts/SocketContext';
import { Player } from '@party-quiz/shared/classes/Player';
import { GAME_STATES } from '@party-quiz/shared/consts/GameStates';
import { ServerEvents } from '@party-quiz/shared/enums/ServerEvents';
import { ServerPayloads } from '@party-quiz/shared/types/ServerPayloads';
import { useEffect, useState } from 'react';

import DisplayQuestionPlayer from './DisplayQuestionPlayer';
import RoundInformationsPlayer from './RoundInformationsPlayer';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function Game({ gameState }: Props) {
  const { clientId } = useSocket();
  const [myPlayer, setPlayer] = useState<Player | undefined>(undefined);

  useEffect(() => {
    if (gameState != null) {
      setPlayer(
        gameState.players.find((player) => {
          return player.clientId == clientId;
        }),
      );
    }
  }, [gameState, clientId]);

  useEffect(() => {
    const handleBeforeUnload = (event: { preventDefault: () => void }) => {
      event.preventDefault();
      // Custom logic to handle the refresh
      // Display a confirmation message or perform necessary actions
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {/* GAME */}
      <div className="flex min-h-screen w-full flex-row pt-12 sm:pt-16 md:pt-20">
        <div className="flex w-full flex-col items-center gap-4 px-4 sm:gap-6">
          <RoundInformationsPlayer gameState={gameState} player={myPlayer} />
          {(gameState?.stateGame == GAME_STATES.QCM_QUESTION ||
            gameState?.stateGame == GAME_STATES.QCM_QUESTION_VALIDATE ||
            gameState?.stateGame == GAME_STATES.CLOSE_NUMBER_QUESTION ||
            gameState?.stateGame == GAME_STATES.TEXT_QUESTION_VALIDATION) && (
            <DisplayQuestionPlayer
              question={gameState?.question}
              player={myPlayer}
            />
          )}
          {(gameState?.stateGame == GAME_STATES.QCM_QUESTION_SHOW_ANSWER ||
            gameState?.stateGame ==
              GAME_STATES.QCM_QUESTION_VALIDATE_SHOW_ANSWER ||
            gameState?.stateGame ==
              GAME_STATES.CLOSE_NUMBER_QUESTION_SHOW_ANSWER ||
            gameState?.stateGame ==
              GAME_STATES.TEXT_QUESTION_VALIDATION_SHOW_ANSWER) && (
            <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center sm:p-8">
              Les résultats sont affichés à l&apos;écran
            </div>
          )}
          {(gameState?.stateGame ==
            GAME_STATES.TEXT_QUESTION_VALIDATION_VALIDATION ||
            gameState?.stateGame ==
              GAME_STATES.QCM_QUESTION_VALIDATE_OWNER) && (
            <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center sm:p-8">
              En attente de la validation de la réponse
            </div>
          )}
          {gameState?.stateGame == GAME_STATES.GAME_FINISHED && (
            <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center sm:p-8">
              FIN DU QUIZ ! Les résultats sont affichés à l&apos;écran
            </div>
          )}
        </div>
      </div>
    </>
  );
}
