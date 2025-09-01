import { NAME_CARD } from '@shadow-network/shared/consts/NameCard';

import ListTileCardSelector from './list_tiles/ListTileCardSelector';

type Props = {
  selectedCard: string | null;
  setSelectedCard: (cardName: string | null) => void;
};

export default function CardSelector({ selectedCard, setSelectedCard }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-center text-xs sm:text-sm md:text-base">
        Veuillez sélectionner une carte.
      </div>
      <ul className="flex w-64 flex-col items-center text-xs sm:text-sm">
        <ListTileCardSelector
          cardName={NAME_CARD.SECRET_OPERATOR}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.INFORMANT}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.MAGNATE}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.DISCREET_ASSISTANT}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.UNDERCOVER_AGENT}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.STRATEGIST}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.DIRECTOR_OF_OPERATIONS}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.DIPLOMAT}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <ListTileCardSelector
          cardName={NAME_CARD.DOUBLE_AGENT}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      </ul>
    </div>
  );
}
