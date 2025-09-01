import CardImage from '@components/images/CardImage';
import { Card } from '@love-letter/shared/classes/Card';
import { NAME_CARD } from '@love-letter/shared/consts/NameCard';
import { ServerEvents } from '@love-letter/shared/enums/ServerEvents';
import { ServerPayloads } from '@love-letter/shared/types/ServerPayloads';
import BackCard from '@public/backcard.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';

import ModalTemplate from './ModalTemplate';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function ModalOtherPlayerCardDraw({ gameState }: Props) {
  const [cardRevealed, setCardRevealed] = useState<Card | null>(null);

  useEffect(() => {
    if (gameState?.checkedPlayerHand != null) {
      const cardDraw = gameState.checkedPlayerHand.hand.find((card) => {
        return card.displayedCard;
      });

      if (cardDraw) {
        setCardRevealed(cardDraw);
      }
    }
  }, [gameState]);
  return (
    <ModalTemplate>
      <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
        <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
          Neutralisation effectuée
        </h2>
        <div className="text-xs sm:text-sm md:text-base">
          <span className={`text-${gameState?.playerTurn?.color}`}>
            {gameState?.playerTurn?.userName}
          </span>{' '}
          a tiré la carte{' '}
          {cardRevealed?.nameCard == NAME_CARD.REMEDY && (
            <span className="font-bold text-emerald-400">Remède</span>
          )}
          {cardRevealed?.nameCard == NAME_CARD.NEUTRAL && (
            <span className="font-bold">Neutre</span>
          )}{' '}
          chez{' '}
          <span className={`text-${gameState?.checkedPlayerHand?.color}`}>
            {gameState?.checkedPlayerHand?.userName}
          </span>
          .
        </div>
        <div className="flex flex-row items-center gap-2">
          {gameState?.checkedPlayerHand?.hand.map((card, index) => {
            if (card.displayedCard) {
              return (
                <CardImage
                  key={`card-revealed-${index}`}
                  card={card}
                  showText={false}
                />
              );
            }

            return (
              <Image
                src={BackCard}
                alt={`backcard-player-checked-${index}`}
                key={`backcard-player-checked-${index}`}
                className="w-12 sm:w-16 md:w-20 lg:w-24"
              />
            );
          })}
        </div>
        <div className="text-sm sm:text-base">
          Cette fenêtre va se fermer automatiquement d&apos;ici quelques
          secondes.
        </div>
        <Triangle
          visible={true}
          height="40"
          width="40"
          color="#2F9966"
          ariaLabel="three-dots-loading"
        />
      </div>
    </ModalTemplate>
  );
}
