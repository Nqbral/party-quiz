import { Player } from '@shadow-network/shared/classes/Player';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import { useEffect, useState } from 'react';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  player: Player | undefined;
};

export default function RoundInformations({ gameState, player }: Props) {
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);

  useEffect(() => {
    if (gameState?.playerTurn?.userId == player?.userId) {
      setIsPlayerTurn(true);
      return;
    }

    setIsPlayerTurn(false);
  }, [gameState, player]);

  return (
    <div className="bg-bg-navbar flex w-48 flex-col items-center gap-2 rounded-lg px-2 py-4 text-center text-base shadow-sm shadow-neutral-950 sm:w-72 sm:text-lg md:text-2xl">
      <div>Manche {gameState?.roundNumber}</div>
      {isPlayerTurn ? (
        <div className="text-sm sm:text-base">À votre tour de jouer</div>
      ) : (
        <div className="text-sm sm:text-base">
          Au tour de{' '}
          <span className={`text-${gameState?.playerTurn?.color}`}>
            {gameState?.playerTurn?.userName}
          </span>{' '}
          de jouer
        </div>
      )}
    </div>
  );
}
