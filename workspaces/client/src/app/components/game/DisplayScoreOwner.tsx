import { ServerEvents } from '@party-quiz/shared/enums/ServerEvents';
import { ServerPayloads } from '@party-quiz/shared/types/ServerPayloads';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function DisplayScoreOwner({ gameState }: Props) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <h2 className="pb-4 text-3xl font-bold">Récapitulatif des scores</h2>
      {gameState?.players
        .sort((playerA, playerB) => {
          if (playerA.score < playerB.score) {
            return 1;
          }

          if (playerA.score > playerB.score) {
            return -1;
          }

          return 0;
        })
        .map((player, index) => {
          return (
            <div key={'player-score-recap-' + index}>
              <span className={`text-${player.color}`}>{player.userName}</span>{' '}
              : {player.score}{' '}
              {player.scoreThisRound > 0 && (
                <span className="text-emerald-500">
                  +{player.scoreThisRound}
                </span>
              )}
              {player.scoreThisRound < 0 && (
                <span className="text-red-500">{player.scoreThisRound}</span>
              )}
            </div>
          );
        })}
    </div>
  );
}
