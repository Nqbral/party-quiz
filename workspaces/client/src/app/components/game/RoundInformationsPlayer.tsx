import { Player } from '@party-quiz/shared/classes/Player';
import { ServerEvents } from '@party-quiz/shared/enums/ServerEvents';
import { ServerPayloads } from '@party-quiz/shared/types/ServerPayloads';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  player: Player | undefined;
};

export default function RoundInformationsPlayer({ gameState, player }: Props) {
  return (
    <div className="bg-bg-navbar flex w-48 flex-col items-center gap-2 rounded-lg px-2 py-4 text-center text-base shadow-sm shadow-neutral-950 sm:w-72 sm:text-lg md:text-2xl">
      <div>Manche {gameState?.roundNumber}</div>
      <div className={`text-${player?.color}`}>{player?.userName}</div>
    </div>
  );
}
