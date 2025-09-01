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

export default function ModalInformantCheck({ gameState, myPlayer }: Props) {
  if (
    gameState?.eventDescription &&
    gameState.eventDescriptionKey == EventDescriptonNames.InformantCheck &&
    'playerWhoPlay' in gameState?.eventDescription &&
    'playerTarget' in gameState?.eventDescription &&
    'cardChecked' in gameState?.eventDescription
  ) {
    if (myPlayer?.userId == gameState.eventDescription.playerWhoPlay.userId) {
      return (
        <ModalTemplate>
          <div className="flex flex-col items-center gap-3 text-center md:gap-6">
            <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
              Action de l&apos;Informateur
            </h2>
            <div className="text-xs sm:text-sm">
              Vous avez utilisé votre{' '}
              <span className="font-bold">Informateur</span> sur{' '}
              <span
                className={`text-${gameState.eventDescription.playerTarget.color}`}
              >
                {gameState.eventDescription.playerTarget.userName}
              </span>
              . Il possède la carte{' '}
              <span className="font-bold">
                {gameState.eventDescription.cardChecked}
              </span>
              .
            </div>
            <div className="flex flex-col items-center gap-2">
              <CardImage card={gameState.eventDescription.cardChecked} />
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

    if (myPlayer?.userId == gameState.eventDescription.playerTarget.userId) {
      return (
        <ModalTemplate>
          <div className="flex flex-col items-center gap-3 text-center md:gap-6">
            <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
              Action de l&apos;Informateur
            </h2>
            <div className="text-xs sm:text-sm">
              <span
                className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
              >
                {gameState.eventDescription.playerWhoPlay.userName}
              </span>{' '}
              a utilisé son <span className="font-bold">Informateur</span> sur
              vous. Il sait que vous possédez la carte{' '}
              <span className="font-bold">
                {gameState.eventDescription.cardChecked}
              </span>
              .
            </div>
            <div className="flex flex-col items-center gap-2">
              <CardImage card={gameState.eventDescription.cardChecked} />
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

    return (
      <ModalTemplate>
        <div className="flex flex-col items-center gap-3 text-center md:gap-6">
          <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
            Action de l&apos;Informateur
          </h2>
          <div className="text-xs sm:text-sm">
            <span
              className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
            >
              {gameState.eventDescription.playerWhoPlay.userName}
            </span>{' '}
            a utilisé son <span className="font-bold">Informateur</span> sur{' '}
            <span
              className={`text-${gameState.eventDescription.playerTarget.color}`}
            >
              {gameState.eventDescription.playerTarget.userName}
            </span>
            . Il connaît donc sa main.
          </div>
        </div>
      </ModalTemplate>
    );
  }
  return <></>;
}
