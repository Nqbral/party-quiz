import PrimaryButton from '@components/buttons/PrimaryButton';
import { useSocket } from '@contexts/SocketContext';
import { Player } from '@shadow-network/shared/classes/Player';
import { CLIENT_EVENTS } from '@shadow-network/shared/consts/ClientEvents';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import { useEffect, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

type Props = {
  player: Player | undefined;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function ReadySection({ player, gameState }: Props) {
  const [playersNotReady, setPlayersNotReady] = useState<Player[]>([]);
  const { emitEvent } = useSocket();

  const handleReady = () => {
    emitEvent(CLIENT_EVENTS.GAME_READY, undefined);
  };

  useEffect(() => {
    if (gameState != null) {
      setPlayersNotReady(gameState.players.filter((p) => !p.ready));
    }
  }, [gameState]);

  return (
    <>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="text-xs sm:text-sm md:text-base">En attente de :</div>
        <div className="text-xs sm:text-sm md:text-base">
          {playersNotReady.map((playersNotReady, index) => {
            if (index == 0) {
              return (
                <div
                  className="inline-block"
                  key={`player-not-ready-${playersNotReady.userId}`}
                >
                  <span className={`text-${playersNotReady.color}`}>
                    {playersNotReady.userName}
                  </span>
                </div>
              );
            }

            return (
              <div
                className="inline-block"
                key={`player-not-ready-${playersNotReady.userId}`}
              >
                {', '}
                <span className={`text-${playersNotReady.color}`}>
                  {playersNotReady.userName}
                </span>
              </div>
            );
          })}
        </div>
        {player?.ready ? (
          <MagnifyingGlass
            visible={true}
            height="40"
            width="40"
            glassColor="#ffffff00"
            color="oklch(87.9% 0.169 91.605)"
            ariaLabel="three-dots-loading"
          />
        ) : (
          <PrimaryButton buttonText="Prêt à jouer" onClick={handleReady} />
        )}
      </div>
    </>
  );
}
