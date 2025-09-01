import { faFolderClosed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackCard from '@public/backcard.png';
import { Player } from '@shadow-network/shared/classes/Player';
import { NAME_CARD } from '@shadow-network/shared/consts/NameCard';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  player: Player;
};

export default function PlayerDisplay({ player }: Props) {
  const offset = 2;
  const [nbSecretOperator, setNbSecretOperator] = useState(0);
  const [hasDiscreetAssistant, setHasDiscreetAssistant] = useState(false);

  let classesPlayer = 'text-' + player?.color + ' text-sm sm:text-base';

  if (!player?.alive) {
    classesPlayer += ' line-through';
  }

  useEffect(() => {
    const secretOperators = player.activeCards.filter(
      (card) => card.nameCard === NAME_CARD.SECRET_OPERATOR,
    );
    setNbSecretOperator(secretOperators.length);

    const hasDiscreet = player.activeCards.some(
      (card) => card.nameCard === NAME_CARD.DISCREET_ASSISTANT,
    );
    setHasDiscreetAssistant(hasDiscreet);
  }, [player]);

  return (
    <div className="flex flex-col items-center gap-2 rounded-sm border-1 border-slate-700 px-4 py-4 text-center sm:min-w-36 sm:px-2 lg:h-[210px]">
      <div className="flex flex-row items-center gap-2 text-sm sm:text-base">
        <div>{player?.score}</div>
        <FontAwesomeIcon
          icon={faFolderClosed}
          color="oklch(92.4% 0.12 95.746)"
        />
        <div className={classesPlayer}>{player?.userName}</div>
      </div>
      <div className="block text-xs sm:text-sm md:text-base lg:hidden">
        {player.hand.length} carte(s)
      </div>
      {!player.alive ? (
        <>
          <div className="hidden rounded-sm border-1 border-dashed border-slate-700 lg:block lg:h-[97px] lg:w-18" />
          <div className="text-xs font-bold sm:text-sm lg:pt-2">Éliminé</div>
        </>
      ) : (
        <>
          <div className="relative hidden h-24 w-32 lg:block">
            {player.hand.map((_, index) => (
              <Image
                key={`card-player-${player.userId}-${index}`}
                src={BackCard}
                alt={`img-backcard-player-${player.userId}-${index}`}
                className="absolute top-0 left-4 w-16"
                style={{
                  transform: `translateX(${index * offset * 4 + 4 * (5 - player.hand.length)}px)`,
                  zIndex: index,
                }}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {player.activeCards.length == 0 ? (
              <div className="w-20 text-xs sm:w-24 sm:text-sm">
                Pas de carte active
              </div>
            ) : (
              <>
                {nbSecretOperator != 0 && (
                  <div className="text-xs text-blue-400 sm:text-sm">
                    {nbSecretOperator} Opérateur(s) Secret(s)
                  </div>
                )}
                {hasDiscreetAssistant && (
                  <div className="text-xs text-purple-500 sm:text-sm">
                    Assistante Discrète
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
