import RedButton from '@components/buttons/RedButton';
import { useSocket } from '@contexts/SocketContext';
import { QcmValidateQuestion } from '@party-quiz/shared/classes/questions/QcmValidateQuestion';
import { TextQuestionValidationQuestion } from '@party-quiz/shared/classes/questions/TextQuestionValidationQuestion';
import { CLIENT_EVENTS } from '@party-quiz/shared/consts/ClientEvents';
import { GAME_STATES } from '@party-quiz/shared/consts/GameStates';
import { ServerEvents } from '@party-quiz/shared/enums/ServerEvents';
import { ServerPayloads } from '@party-quiz/shared/types/ServerPayloads';

import DisplayQuestionOwner from './DisplayQuestionOwner';
import DisplayScoreOwner from './DisplayScoreOwner';
import GameInformations from './GameInformations';
import RecapAnswerOwner from './RecapAnswerOwner';
import ValidateQcmQuestionOwner from './ValidateQcmQuestionOwner';
import ValidateTextQuestionOwner from './ValidateTextQuestionOwner';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function GameOwner({ gameState }: Props) {
  const { emitEvent } = useSocket();

  const handleDelete = () => emitEvent(CLIENT_EVENTS.LOBBY_DELETE, undefined);
  return (
    <div className="flex min-h-dvh w-full flex-row pt-12 sm:pt-16 md:pt-20">
      {gameState?.stateGame == GAME_STATES.GAME_FINISHED ? (
        <div className="flex w-full flex-col items-center justify-center gap-4 text-center sm:p-8">
          <DisplayScoreOwner gameState={gameState} />
          <RedButton buttonText="Supprimer le lobby" onClick={handleDelete} />
        </div>
      ) : (
        <>
          <div className="flex min-h-full w-96 flex-col pl-4">
            <GameInformations gameState={gameState} />
          </div>
          {(gameState?.stateGame == GAME_STATES.QCM_QUESTION ||
            gameState?.stateGame == GAME_STATES.QCM_QUESTION_VALIDATE ||
            gameState?.stateGame == GAME_STATES.CLOSE_NUMBER_QUESTION ||
            gameState?.stateGame == GAME_STATES.TEXT_QUESTION_VALIDATION) && (
            <div className="flex w-full flex-col items-center gap-4 sm:gap-6">
              <DisplayQuestionOwner
                gameState={gameState}
                question={gameState?.question}
                indexQuestion={gameState?.indexQuestion}
              />
            </div>
          )}
          {(gameState?.stateGame == GAME_STATES.QCM_QUESTION_SHOW_ANSWER ||
            gameState?.stateGame ==
              GAME_STATES.QCM_QUESTION_VALIDATE_SHOW_ANSWER ||
            gameState?.stateGame ==
              GAME_STATES.CLOSE_NUMBER_QUESTION_SHOW_ANSWER ||
            gameState?.stateGame ==
              GAME_STATES.TEXT_QUESTION_VALIDATION_SHOW_ANSWER) && (
            <div className="flex w-full flex-col items-center gap-4">
              <RecapAnswerOwner question={gameState.question} />
              <DisplayScoreOwner gameState={gameState} />
            </div>
          )}
          {gameState?.stateGame == GAME_STATES.QCM_QUESTION_VALIDATE_OWNER && (
            <div className="flex w-full flex-col items-center gap-4 sm:gap-6">
              <ValidateQcmQuestionOwner
                question={gameState?.question as QcmValidateQuestion}
              />
            </div>
          )}
          {gameState?.stateGame ==
            GAME_STATES.TEXT_QUESTION_VALIDATION_VALIDATION && (
            <div className="flex w-full flex-col items-center gap-4 sm:gap-6">
              <ValidateTextQuestionOwner
                question={gameState?.question as TextQuestionValidationQuestion}
                gameState={gameState}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
