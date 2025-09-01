import { NAME_CARD } from '@shadow-network/shared/consts/NameCard';

type Props = {
  cardName: string;
  selectedCard: string | null;
  setSelectedCard: (cardName: string | null) => void;
};

export default function ListTileCardSelector({
  cardName,
  selectedCard,
  setSelectedCard,
}: Props) {
  return (
    <li className="w-full">
      <button
        className={`w-full px-4 py-2 hover:bg-neutral-700 ${selectedCard === cardName ? 'bg-neutral-900' : 'bg-neutral-800'} ${cardName == NAME_CARD.SECRET_OPERATOR && 'rounded-t-lg'} ${cardName == NAME_CARD.DOUBLE_AGENT && 'rounded-b-lg'} transition-colors`}
        onClick={() => setSelectedCard(cardName)}
      >
        {cardName} {selectedCard === cardName ? '(Sélectionné)' : ''}
      </button>
    </li>
  );
}
