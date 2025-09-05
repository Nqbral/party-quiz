import { ServerEvents } from '@party-quiz/shared/enums/ServerEvents';
import { ServerPayloads } from '@party-quiz/shared/types/ServerPayloads';

import PlayerScoreListTile from './PlayerScoreListTile';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function ScoreInformations({ gameState }: Props) {
  return (
    <div className="bg-bg-navbar flex h-full max-h-[550px] min-h-[250px] w-72 flex-col overflow-hidden rounded-lg shadow-sm shadow-neutral-950">
      <div className="px-4 pt-4 font-bold">Scores</div>
      <hr className="my-2" />
      <ul className="custom-scrollbar h-full overflow-y-auto text-sm">
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
          .map((player, index) => (
            <li
              className="odd:bg-odd-list-tile even:bg-even-list-tile px-4 py-2 text-xs sm:text-sm md:text-base"
              key={`score-list-tile-${index}`}
            >
              <PlayerScoreListTile player={player} />
            </li>
          ))}
      </ul>
    </div>
  );
}
