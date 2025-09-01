import CardImage from '@components/images/CardImage';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackCard from '@public/backcard.png';
import { Player } from '@shadow-network/shared/classes/Player';
import { EventDescriptonNames } from '@shadow-network/shared/enums/EventDescriptionNames';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import Image from 'next/image';

import ModalTemplate from '../ModalTemplate';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  myPlayer: Player | undefined;
};

export default function ModalDirectorOfOperationsSwap({
  gameState,
  myPlayer,
}: Props) {
  if (
    gameState?.eventDescription &&
    gameState.eventDescriptionKey ==
      EventDescriptonNames.DirectorOfOperationsSwap &&
    'playerWhoPlay' in gameState?.eventDescription &&
    'playerTarget' in gameState?.eventDescription &&
    'cardTradeWhoPlay' in gameState?.eventDescription &&
    'cardTradeTarget' in gameState?.eventDescription
  ) {
    // Modal for player who play
    if (myPlayer?.userId == gameState.eventDescription.playerWhoPlay.userId) {
      return (
        <ModalTemplate>
          <div className="flex flex-col items-center gap-3 text-center md:gap-6">
            <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
              Action du Directeur des Opérations
            </h2>
            <div className="text-xs sm:text-sm">
              Vous avez utilisé votre{' '}
              <span className="font-bold">Directeur des Opérations</span> sur{' '}
              <span
                className={`text-${gameState.eventDescription.playerTarget.color}`}
              >
                {gameState.eventDescription.playerTarget.userName}
              </span>
              . Vous échangez vos mains.
            </div>
            <div className="flex flex-row items-center justify-center gap-3">
              <div className="flex flex-col items-center gap-2">
                <CardImage card={gameState.eventDescription.cardTradeWhoPlay} />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerWhoPlay.color} text-xs sm:text-sm md:text-base`}
                  >
                    {gameState.eventDescription.playerWhoPlay.userName}
                  </span>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faRightLeft}
                color="oklch(92.4% 0.12 95.746)"
              />
              <div className="flex flex-col items-center gap-2">
                <CardImage card={gameState.eventDescription.cardTradeTarget} />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerTarget.color} text-xs sm:text-sm md:text-base`}
                  >
                    {gameState.eventDescription.playerTarget.userName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ModalTemplate>
      );
    }

    // Modal for player who is targetted
    if (myPlayer?.userId == gameState.eventDescription.playerTarget.userId) {
      return (
        <ModalTemplate>
          <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
            <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
              Action du Directeur des Opérations
            </h2>
            <div className="text-xs sm:text-sm">
              <span
                className={`text-${gameState.eventDescription.playerWhoPlay.color} text-xs sm:text-sm md:text-base`}
              >
                {gameState.eventDescription.playerWhoPlay.userName}
              </span>{' '}
              joue le Directeur des Opérations sur vous. Vous échangez vos
              mains.
            </div>
            <div className="flex flex-row items-center justify-center gap-3">
              <div className="flex flex-col items-center gap-2">
                <CardImage card={gameState.eventDescription.cardTradeTarget} />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerTarget.color} text-xs sm:text-sm md:text-base`}
                  >
                    {gameState.eventDescription.playerTarget.userName}
                  </span>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faRightLeft}
                color="oklch(92.4% 0.12 95.746)"
              />
              <div className="flex flex-col items-center gap-2">
                <CardImage card={gameState.eventDescription.cardTradeWhoPlay} />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
                  >
                    {gameState.eventDescription.playerWhoPlay.userName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ModalTemplate>
      );
    }

    // Other modal
    return (
      <ModalTemplate>
        <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
          <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
            Action du Directeur des Opérations
          </h2>
          <div className="text-xs sm:text-sm">
            <span
              className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
            >
              {gameState.eventDescription.playerWhoPlay.userName}
            </span>{' '}
            joue le Directeur des Opérations sur{' '}
            <span
              className={`text-${gameState.eventDescription.playerTarget.color}`}
            >
              {gameState.eventDescription.playerTarget.userName}
            </span>
            . Ils échangent leur main.
            <div className="flex flex-row items-center justify-center gap-3">
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={BackCard}
                  alt="backcard-img"
                  className="w-16 sm:w-20"
                />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerTarget.color} text-xs sm:text-sm md:text-base`}
                  >
                    {gameState.eventDescription.playerTarget.userName}
                  </span>
                </div>
              </div>
              <FontAwesomeIcon
                icon={faRightLeft}
                color="oklch(92.4% 0.12 95.746)"
              />
              <div className="flex flex-col items-center gap-2">
                <Image
                  src={BackCard}
                  alt="backcard-img"
                  className="w-16 sm:w-20"
                />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerWhoPlay.color} text-xs sm:text-sm md:text-base`}
                  >
                    {gameState.eventDescription.playerWhoPlay.userName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalTemplate>
    );
  }

  return <></>;
}
