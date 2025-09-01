import CardImage from '@components/images/CardImage';
import BackCard from '@public/backcard.png';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import Image from 'next/image';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function DeckAndDiscardedCards({ gameState }: Props) {
  return (
    <div className="border-sm flex flex-col items-center gap-4 border-1 border-slate-700 px-8 py-4 text-sm sm:text-base">
      <div className="flex flex-row gap-6 md:gap-8 lg:gap-12">
        <div className="flex flex-col items-center gap-4">
          <div className="text-center">Pioche ({gameState?.deck.length})</div>
          <Image
            src={BackCard}
            alt="deck"
            className="w-12 sm:w-14 md:w-16 lg:w-18"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <div>Défausse</div>
          <div className="flex h-full flex-row items-center gap-2">
            {gameState?.lastPlayedCard ? (
              <div className="w-12 sm:w-14 md:w-16 lg:w-18">
                <CardImage card={gameState.lastPlayedCard} />
              </div>
            ) : (
              <div className="h-[70px] w-12 rounded-sm border-1 border-dashed border-slate-700 sm:h-[80px] sm:w-14 md:h-[90px] md:w-16 lg:h-[100px] lg:w-18" />
            )}
            {gameState?.secondPlayedCard ? (
              <div className="w-12 sm:w-14 md:w-16 lg:w-18">
                <CardImage card={gameState.secondPlayedCard} />
              </div>
            ) : (
              <div className="h-[70px] w-12 rounded-sm border-1 border-dashed border-slate-700 sm:h-[80px] sm:w-14 md:h-[90px] md:w-16 lg:h-[100px] lg:w-18" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
