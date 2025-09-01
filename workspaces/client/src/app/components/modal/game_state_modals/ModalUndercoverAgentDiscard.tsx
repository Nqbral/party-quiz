import CardImage from '@components/images/CardImage';
import { Player } from '@shadow-network/shared/classes/Player';
import { EventDescriptonNames } from '@shadow-network/shared/enums/EventDescriptionNames';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';

import ModalTemplate from '../ModalTemplate';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  myPlayer: Player | undefined;
};

export default function ModalUndercoverAgentDiscard({
  gameState,
  myPlayer,
}: Props) {
  if (
    gameState?.eventDescription &&
    gameState.eventDescriptionKey ==
      EventDescriptonNames.UndercoverAgentDiscard &&
    'playerWhoPlay' in gameState?.eventDescription &&
    'playerTarget' in gameState?.eventDescription &&
    'cardDiscarded' in gameState?.eventDescription
  ) {
    // Modal for player who play
    if (myPlayer?.userId == gameState.eventDescription.playerWhoPlay.userId) {
      return (
        <ModalTemplate>
          <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
            <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
              Action de l&apos;Agent Infiltré
            </h2>
            <div className="text-xs sm:text-sm">
              Vous avez utilisé votre{' '}
              <span className="font-bold">Agent Infiltré</span> sur{' '}
              {gameState.eventDescription.playerTarget.userId ==
              myPlayer.userId ? (
                <>vous-même. Vous défaussez votre propre main.</>
              ) : (
                <>
                  <span
                    className={`text-${gameState.eventDescription.playerTarget.color}`}
                  >
                    {gameState.eventDescription.playerTarget.userName}
                  </span>
                  . Il défausse sa main.
                </>
              )}
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-sm">Main défaussée</div>
              <CardImage card={gameState.eventDescription.cardDiscarded} />
              <div>
                <span
                  className={`text-${gameState.eventDescription.playerTarget.color} text-xs sm:text-sm md:text-base`}
                >
                  {gameState.eventDescription.playerTarget.userName}
                </span>
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
              Action de l&apos;Agent Infiltré
            </h2>
            <div className="text-xs sm:text-sm">
              <span
                className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
              >
                {gameState.eventDescription.playerWhoPlay.userName}
              </span>{' '}
              joue l&apos;Agent Infiltré sur vous. Vous défaussez votre main.
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-sm">Main défaussée</div>
              <CardImage card={gameState.eventDescription.cardDiscarded} />
              <div>
                <span
                  className={`text-${gameState.eventDescription.playerTarget.color} text-xs sm:text-sm md:text-base`}
                >
                  {gameState.eventDescription.playerTarget.userName}
                </span>
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
            Action de l&apos;Agent Infiltré
          </h2>
          <div className="text-xs sm:text-sm">
            <span
              className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
            >
              {gameState.eventDescription.playerWhoPlay.userName}
            </span>{' '}
            joue l&apos;Agent Infiltré sur{' '}
            <span
              className={`text-${gameState.eventDescription.playerTarget.color}`}
            >
              {gameState.eventDescription.playerTarget.userName}
            </span>
            . Il défausse sa main.
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm">Main défaussée</div>
            <CardImage card={gameState.eventDescription.cardDiscarded} />
            <div>
              <span
                className={`text-${gameState.eventDescription.playerTarget.color}`}
              >
                {gameState.eventDescription.playerTarget.userName}
              </span>
            </div>
          </div>
        </div>
      </ModalTemplate>
    );
  }

  return <></>;
}
