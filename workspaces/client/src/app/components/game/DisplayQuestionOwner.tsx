import { Player } from '@party-quiz/shared/classes/Player';
import { Question } from '@party-quiz/shared/classes/Question';
import { QcmQuestion } from '@party-quiz/shared/classes/questions/QcmQuestion';
import { QcmValidateQuestion } from '@party-quiz/shared/classes/questions/QcmValidateQuestion';
import { TYPE_QUESTIONS } from '@party-quiz/shared/consts/TypeQuestions';
import { ServerEvents } from '@party-quiz/shared/enums/ServerEvents';
import { ServerPayloads } from '@party-quiz/shared/types/ServerPayloads';
import { useEffect, useState } from 'react';

import DisplayQuestionOwnerCloseNumberQuestion from './displayquestionowner/DisplayQuestionOwnerCloseNumberQuestion';
import DisplayQuestionOwnerQcm from './displayquestionowner/DisplayQuestionOwnerQcm';
import DisplayQuestionOwnerValidateQcm from './displayquestionowner/DisplayQuestionOwnerValidateQcm';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  question: Question | null | undefined;
  indexQuestion: number | null | undefined;
};

export default function DisplayQuestionOwner({
  gameState,
  question,
  indexQuestion,
}: Props) {
  const [waitingPlayers, setWaitingPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (gameState != null) {
      setWaitingPlayers(
        gameState.players.filter((player) => {
          return !player.hasAnswered;
        }),
      );
    }
  }, [gameState]);

  return (
    <div className="flex w-full max-w-4xl flex-col items-center justify-center gap-4 text-center sm:p-8">
      <h2 className="text-3xl font-bold">{question?.label}</h2>
      {question?.typeQuestion === TYPE_QUESTIONS.QCM && (
        <DisplayQuestionOwnerQcm question={question as QcmQuestion} />
      )}
      {question?.typeQuestion === TYPE_QUESTIONS.QCM_VALIDATE && (
        <DisplayQuestionOwnerValidateQcm
          question={question as QcmValidateQuestion}
        />
      )}
      {question?.typeQuestion === TYPE_QUESTIONS.CLOSE_NUMBER && (
        <DisplayQuestionOwnerCloseNumberQuestion
          indexQuestion={indexQuestion}
        />
      )}

      <div>
        {waitingPlayers.length > 0 ? (
          <div className="flex flex-col items-center text-lg">
            <div>En attente de :</div>
            <div>
              {waitingPlayers.map((player, index) => {
                if (index == 0) {
                  return (
                    <div
                      className="inline-block"
                      key={`player-not-ready-${player.clientId}`}
                    >
                      <span className={`text-${player.color}`}>
                        {player.userName}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    className="inline-block"
                    key={`player-not-ready-${player.clientId}`}
                  >
                    {', '}
                    <span className={`text-${player.color}`}>
                      {player.userName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>Tous les joueurs ont répondu</div>
        )}
      </div>
    </div>
  );
}
