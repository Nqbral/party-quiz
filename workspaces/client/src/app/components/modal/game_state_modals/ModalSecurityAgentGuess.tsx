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

export default function ModalSecurityAgentGuess({
  gameState,
  myPlayer,
}: Props) {
  if (
    gameState?.eventDescription &&
    gameState.eventDescriptionKey == EventDescriptonNames.SecurityAgentGuess &&
    'playerWhoPlay' in gameState?.eventDescription &&
    'playerTarget' in gameState?.eventDescription &&
    'cardGuessed' in gameState?.eventDescription &&
    'isGuessed' in gameState?.eventDescription
  ) {
    // Modal for player who play
    if (myPlayer?.userId == gameState.eventDescription.playerWhoPlay.userId) {
      return (
        <ModalTemplate>
          <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
            <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
              Action de l&apos;Agent de Sécurité
            </h2>
            <div className="text-xs sm:text-sm">
              Vous avez utilisé votre{' '}
              <span className="font-bold">Agent de Sécurité</span> sur{' '}
              <span
                className={`text-${gameState.eventDescription.playerTarget.color}`}
              >
                {gameState.eventDescription.playerTarget.userName}
              </span>{' '}
              en pensant qu&apos;il possède la carte{' '}
              <span className="font-bold">
                {gameState.eventDescription.cardGuessed}
              </span>
              .
            </div>
            {gameState.eventDescription.isGuessed ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm">Main éliminée</div>
                  <CardImage card={gameState.eventDescription.cardGuessed} />
                  <div>
                    <span
                      className={`text-${gameState.eventDescription.playerTarget.color}`}
                    >
                      {gameState.eventDescription.playerTarget.userName}
                    </span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm">
                  C&apos;est le cas. Il est{' '}
                  <span className="font-bold">éliminé</span>.
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm">Tentative échouée</div>
                  <CardImage card={gameState.eventDescription.cardGuessed} />
                </div>
                <div className="text-xs sm:text-sm">
                  Ce n&apos;est pas le cas. Rien ne se passe.
                </div>
              </>
            )}
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
              Action de l&apos;Agent de Sécurité
            </h2>
            <div className="text-xs sm:text-sm">
              <span
                className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
              >
                {gameState.eventDescription.playerWhoPlay.userName}
              </span>{' '}
              joue l&apos;Agent de Sécurité sur vous en pensant que vous
              possédez la carte{' '}
              <span className="font-bold">
                {gameState.eventDescription.cardGuessed}
              </span>
              .
            </div>
            {gameState.eventDescription.isGuessed ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm">Main éliminée</div>
                  <CardImage card={gameState.eventDescription.cardGuessed} />
                  <div>
                    <span
                      className={`text-${gameState.eventDescription.playerTarget.color}`}
                    >
                      {gameState.eventDescription.playerTarget.userName}
                    </span>
                  </div>
                </div>
                <div className="text-xs sm:text-sm">
                  C&apos;est le cas. Vous êtes{' '}
                  <span className="font-bold">éliminé</span>.
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-2">
                  <div className="text-sm">Tentative échouée</div>
                  <CardImage card={gameState.eventDescription.cardGuessed} />
                </div>
                <div className="text-xs sm:text-sm">
                  Ce n&apos;est pas le cas. Rien ne se passe.
                </div>
              </>
            )}
          </div>
        </ModalTemplate>
      );
    }

    // Other modal
    return (
      <ModalTemplate>
        <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
          <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
            Action de l&apos;Agent de Sécurité
          </h2>
          <div className="text-xs sm:text-sm">
            <span
              className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
            >
              {gameState.eventDescription.playerWhoPlay.userName}
            </span>{' '}
            joue l&apos;Agent de Sécurité sur{' '}
            <span
              className={`text-${gameState.eventDescription.playerTarget.color}`}
            >
              {gameState.eventDescription.playerTarget.userName}
            </span>{' '}
            en pensant qu&apos;il possède la carte{' '}
            <span className="font-bold">
              {gameState.eventDescription.cardGuessed}
            </span>
            .
          </div>
          {gameState.eventDescription.isGuessed ? (
            <>
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm">Main éliminée</div>
                <CardImage card={gameState.eventDescription.cardGuessed} />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerTarget.color} text-xs sm:text-sm md:text-base`}
                  >
                    {gameState.eventDescription.playerTarget.userName}
                  </span>
                </div>
              </div>
              <div className="text-xs sm:text-sm">
                C&apos;est le cas.{' '}
                <span
                  className={`text-${gameState.eventDescription.playerTarget.color}`}
                >
                  {gameState.eventDescription.playerTarget.userName}
                </span>{' '}
                est <span className="font-bold">éliminé</span>.
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm">Tentative échouée</div>
                <CardImage card={gameState.eventDescription.cardGuessed} />
              </div>
              <div className="text-xs sm:text-sm">
                Ce n&apos;est pas le cas. Rien ne se passe.
              </div>
            </>
          )}
        </div>
      </ModalTemplate>
    );
  }

  return <></>;
}
