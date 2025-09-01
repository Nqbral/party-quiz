import { faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DiscreetAssistantImg from '@public/discreet_assistant.png';
import SecretOperatorImg from '@public/secret_operator.png';
import { Player } from '@shadow-network/shared/classes/Player';
import { NAME_CARD } from '@shadow-network/shared/consts/NameCard';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import Image from 'next/image';

import PlayerCards from './my_player/MyPlayerCard';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  myPlayer: Player | undefined;
  handleCardAction: (cardName: string | null) => void;
};

export default function MyPlayerDisplay({
  gameState,
  myPlayer,
  handleCardAction,
}: Props) {
  let classesPlayer = 'text-' + myPlayer?.color;

  if (!myPlayer?.alive) {
    classesPlayer += ' line-through';
  }

  return (
    <div className="flex flex-col items-center gap-2 border-1 border-slate-700 px-8 py-4 sm:gap-4">
      <div className="flex flex-row items-center gap-2 text-sm sm:text-base">
        <div>{myPlayer?.score}</div>
        <FontAwesomeIcon
          icon={faFolderClosed}
          color="oklch(92.4% 0.12 95.746)"
        />
        <div className={classesPlayer}>{myPlayer?.userName}</div>
      </div>
      {myPlayer?.alive ? (
        <>
          <div className="flex flex-row gap-6 text-xs sm:gap-8 sm:text-sm md:gap-12 md:text-base">
            <div className="flex flex-col items-center gap-2">
              <div className="">Main</div>
              <div className="flex flex-row gap-2">
                <PlayerCards
                  isPlayerTurn={
                    gameState?.playerTurn?.userId == myPlayer?.userId
                  }
                  cards={myPlayer?.hand}
                  handleCardAction={handleCardAction}
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full text-center">Carte(s) active(s)</div>
              <div className="flex flex-row gap-2">
                {myPlayer?.activeCards.length == 0 ? (
                  <div className="h-[75px] w-12 rounded-sm border-1 border-dashed border-slate-700 sm:h-[97px] sm:w-16 md:h-[122px] md:w-20 lg:h-[142px] lg:w-24" />
                ) : (
                  myPlayer?.activeCards.map((card, index) => {
                    if (card.nameCard == NAME_CARD.SECRET_OPERATOR) {
                      return (
                        <Image
                          key={'activeCards-' + myPlayer.userId + '-' + index}
                          className="w-12 sm:w-16 md:w-20 lg:w-24"
                          src={SecretOperatorImg}
                          alt="secret-operator"
                        />
                      );
                    }

                    return (
                      <Image
                        key={'activeCards-' + myPlayer.userId + '-' + index}
                        className="w-12 sm:w-16 md:w-20 lg:w-24"
                        src={DiscreetAssistantImg}
                        alt="discreet-assistant"
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-xs font-bold sm:text-sm md:text-base">
          Éliminé
        </div>
      )}
    </div>
  );
}
