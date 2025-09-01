import CardImage from '@components/images/CardImage';
import { Player } from '@shadow-network/shared/classes/Player';
import { MAGNATE_RESULT } from '@shadow-network/shared/consts/MagnateResult';
import { EventDescriptonNames } from '@shadow-network/shared/enums/EventDescriptionNames';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';

import ModalTemplate from '../ModalTemplate';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  myPlayer: Player | undefined;
};

export default function ModalMagnateComparison({ gameState, myPlayer }: Props) {
  if (
    gameState?.eventDescription &&
    gameState.eventDescriptionKey == EventDescriptonNames.MagnateComparison &&
    'playerWhoPlay' in gameState?.eventDescription &&
    'playerTarget' in gameState?.eventDescription &&
    'result' in gameState?.eventDescription &&
    'cardPlayer' in gameState?.eventDescription &&
    'cardTarget' in gameState?.eventDescription
  ) {
    if (myPlayer?.userId == gameState.eventDescription.playerWhoPlay.userId) {
      return (
        <ModalTemplate>
          <div className="flex flex-col items-center gap-3 text-center md:gap-6">
            <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
              Action du Magnat
            </h2>
            <div className="text-xs sm:text-sm">
              Vous avez utilisé votre <span className="font-bold">Magnat</span>{' '}
              sur{' '}
              <span
                className={`text-${gameState.eventDescription.playerTarget.color}`}
              >
                {gameState.eventDescription.playerTarget.userName}
              </span>
              .
            </div>
            <div className="flex flex-row items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <CardImage card={gameState.eventDescription.cardPlayer} />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerWhoPlay.color} text-xs sm:text-sm md:text-base`}
                  >
                    {gameState.eventDescription.playerWhoPlay.userName}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CardImage card={gameState.eventDescription.cardTarget} />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerTarget.color} text-xs sm:text-sm md:text-base`}
                  >
                    {gameState.eventDescription.playerTarget.userName}
                  </span>
                </div>
              </div>
            </div>
            {gameState.eventDescription.result == MAGNATE_RESULT.WIN_PLAYER && (
              <div className="text-xs sm:text-sm">
                Vous remportez le duel.{' '}
                <span
                  className={`text-${gameState.eventDescription.playerTarget.color}`}
                >
                  {gameState.eventDescription.playerTarget.userName}
                </span>{' '}
                est <span className="font-bold">éliminé</span>.
              </div>
            )}
            {gameState.eventDescription.result == MAGNATE_RESULT.WIN_TARGET && (
              <div className="text-xs sm:text-sm">
                Vous perdez le duel. Vous êtes{' '}
                <span className="font-bold">éliminé</span>.
              </div>
            )}
            {gameState.eventDescription.result == MAGNATE_RESULT.DRAW && (
              <div className="text-xs sm:text-sm">
                Égalité. Rien ne se passe.
              </div>
            )}
          </div>
        </ModalTemplate>
      );
    }

    if (myPlayer?.userId == gameState.eventDescription.playerTarget.userId) {
      return (
        <ModalTemplate>
          <div className="flex flex-col items-center gap-3 text-center md:gap-6">
            <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
              Action du Magnat
            </h2>
            <div className="text-xs sm:text-sm">
              <span
                className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
              >
                {gameState.eventDescription.playerWhoPlay.userName}
              </span>{' '}
              joue le <span className="font-bold">Magnat</span> sur vous.
            </div>
            <div className="flex flex-row items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <CardImage card={gameState.eventDescription.cardTarget} />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerTarget.color} text-xs sm:text-sm md:text-base`}
                  >
                    {gameState.eventDescription.playerTarget.userName}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CardImage card={gameState.eventDescription.cardPlayer} />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerWhoPlay.color} text-xs sm:text-sm md:text-base`}
                  >
                    {gameState.eventDescription.playerWhoPlay.userName}
                  </span>
                </div>
              </div>
            </div>
            {gameState.eventDescription.result == MAGNATE_RESULT.WIN_PLAYER && (
              <div className="text-xs sm:text-sm">
                Vous perdez le duel. Vous êtes{' '}
                <span className="font-bold">éliminé</span>.
              </div>
            )}
            {gameState.eventDescription.result == MAGNATE_RESULT.WIN_TARGET && (
              <div className="text-xs sm:text-sm">
                Vous remportez le duel.{' '}
                <span
                  className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
                >
                  {gameState.eventDescription.playerWhoPlay.userName}
                </span>{' '}
                est <span className="font-bold">éliminé</span>.
              </div>
            )}
            {gameState.eventDescription.result == MAGNATE_RESULT.DRAW && (
              <div className="text-xs sm:text-sm">
                Égalité. Rien ne se passe.
              </div>
            )}
          </div>
        </ModalTemplate>
      );
    }

    return (
      <ModalTemplate>
        <div className="flex flex-col items-center gap-3 text-center md:gap-6">
          <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
            Action du Magnat
          </h2>
          <div className="text-xs sm:text-sm">
            <span
              className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
            >
              {gameState.eventDescription.playerWhoPlay.userName}
            </span>{' '}
            joue le <span className="font-bold">Magnat</span> sur{' '}
            <span
              className={`text-${gameState.eventDescription.playerTarget.color}`}
            >
              {gameState.eventDescription.playerTarget.userName}
            </span>
            .
          </div>
          {gameState.eventDescription.result == MAGNATE_RESULT.WIN_PLAYER && (
            <>
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm">Main perdante</div>
                <CardImage card={gameState.eventDescription.cardTarget} />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerTarget.color} text-xs sm:text-sm md:text-base`}
                  >
                    {gameState.eventDescription.playerTarget.userName}
                  </span>
                </div>
              </div>
              <div className="text-xs sm:text-sm">
                <span
                  className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
                >
                  {gameState.eventDescription.playerWhoPlay.userName}
                </span>{' '}
                l&apos;emporte.{' '}
                <span
                  className={`text-${gameState.eventDescription.playerTarget.color}`}
                >
                  {gameState.eventDescription.playerTarget.userName}
                </span>{' '}
                est <span className="font-bold">éliminé</span>.
              </div>
            </>
          )}
          {gameState.eventDescription.result == MAGNATE_RESULT.WIN_TARGET && (
            <>
              <div className="flex flex-col items-center gap-2">
                <div className="text-sm">Main perdante</div>
                <CardImage card={gameState.eventDescription.cardPlayer} />
                <div>
                  <span
                    className={`text-${gameState.eventDescription.playerWhoPlay.color} text-xs sm:text-sm md:text-base`}
                  >
                    {gameState.eventDescription.playerWhoPlay.userName}
                  </span>
                </div>
              </div>
              <div className="text-xs sm:text-sm">
                <span
                  className={`text-${gameState.eventDescription.playerTarget.color}`}
                >
                  {gameState.eventDescription.playerTarget.userName}
                </span>{' '}
                l&apos;emporte.{' '}
                <span
                  className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
                >
                  {gameState.eventDescription.playerWhoPlay.userName}
                </span>{' '}
                est <span className="font-bold">éliminé</span>.
              </div>
            </>
          )}
          {gameState.eventDescription.result == MAGNATE_RESULT.DRAW && (
            <div className="text-xs sm:text-sm">Égalité. Rien ne se passe.</div>
          )}
        </div>
      </ModalTemplate>
    );
  }
  return <></>;
}
