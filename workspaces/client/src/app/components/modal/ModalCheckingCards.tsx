import PrimaryButton from '@components/buttons/PrimaryButton';
import CardImage from '@components/images/CardImage';
import { useSocket } from '@contexts/SocketContext';
import { Player } from '@love-letter/shared/classes/Player';
import { CLIENT_EVENTS } from '@love-letter/shared/consts/ClientEvents';
import { ServerEvents } from '@love-letter/shared/enums/ServerEvents';
import { ServerPayloads } from '@love-letter/shared/types/ServerPayloads';
import { useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';

import ModalTemplate from './ModalTemplate';

type Props = {
  player: Player | undefined;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function ModalCheckingCards({ player, gameState }: Props) {
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
    <ModalTemplate>
      <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
        <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
          Vérification des cartes
        </h2>
        {player != undefined && (
          <div className="flex flex-col items-center gap-4 text-xs sm:text-sm md:text-base">
            <div>Votre main</div>
            <div className="flex flex-row items-center justify-center gap-2">
              {player.hand.map((card, index) => {
                return (
                  <CardImage
                    key={`card-player-${index}`}
                    card={card}
                    showText={true}
                  />
                );
              })}
            </div>
          </div>
        )}
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
          <Triangle
            visible={true}
            height="40"
            width="40"
            color="#2F9966"
            ariaLabel="three-dots-loading"
          />
        ) : (
          <PrimaryButton buttonText="Prêt à jouer" onClick={handleReady} />
        )}
      </div>
    </ModalTemplate>
  );
}
