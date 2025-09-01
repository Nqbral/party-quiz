import { Player } from '@shadow-network/shared/classes/Player';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import { useEffect, useState } from 'react';

import PlayerDisplay from './player/PlayerDisplay';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  myPlayer: Player | undefined;
};

export default function PlayersDisplay({ gameState, myPlayer }: Props) {
  const [myPlayerTurnOrder, setMyPlayerTurnOrder] = useState<Player[]>([]);

  useEffect(() => {
    if (gameState?.playersTurnOrder) {
      const indexMyPlayerTurn = gameState.playersTurnOrder.findIndex(
        (playerTurn) => {
          return playerTurn.userId == myPlayer?.userId;
        },
      );

      if (indexMyPlayerTurn != -1) {
        const lengthPlayersTurnOrder = gameState.playersTurnOrder.length;

        if (indexMyPlayerTurn === 0) {
          setMyPlayerTurnOrder(
            gameState.playersTurnOrder.slice(1, lengthPlayersTurnOrder),
          );
          return;
        }

        if (indexMyPlayerTurn === lengthPlayersTurnOrder - 1) {
          setMyPlayerTurnOrder(
            gameState.playersTurnOrder.slice(0, indexMyPlayerTurn),
          );
          return;
        }

        setMyPlayerTurnOrder(
          gameState.playersTurnOrder
            .slice(indexMyPlayerTurn + 1, lengthPlayersTurnOrder)
            .concat(gameState.playersTurnOrder.slice(0, indexMyPlayerTurn)),
        );
      }
    }
  }, [gameState?.playersTurnOrder, myPlayer?.userId]);

  return (
    <div className="flex w-full flex-row flex-wrap justify-center gap-1 pb-8 sm:gap-2 md:gap-4 lg:gap-6">
      {myPlayerTurnOrder
        .filter((player) => player.userId !== myPlayer?.userId)
        .map((player, index) => {
          return (
            <PlayerDisplay key={`player-display-${index}`} player={player} />
          );
        })}
    </div>
  );
}
