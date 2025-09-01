import PrimaryButton from '@components/buttons/PrimaryButton';
import CardImage from '@components/images/CardImage';
import { useSocket } from '@contexts/SocketContext';
import BackCard from '@public/backcard.png';
import { Card } from '@shadow-network/shared/classes/Card';
import { Player } from '@shadow-network/shared/classes/Player';
import { CLIENT_EVENTS } from '@shadow-network/shared/consts/ClientEvents';
import { EventDescriptonNames } from '@shadow-network/shared/enums/EventDescriptionNames';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import ModalTemplate from '../ModalTemplate';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  myPlayer: Player | undefined;
};

export default function ModalStrategistDraw({ gameState, myPlayer }: Props) {
  type SelectionCard = {
    card: Card;
    selected: boolean;
    orderSelected: number;
  };

  const { emitEvent } = useSocket();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [nbSelected, setNbSelected] = useState<number>(0);
  const [selectedIndexCards, setSelectedIndexCards] = useState<number[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [selectionCards, setSelectionCards] = useState<SelectionCard[]>([]);

  useEffect(() => {
    if (
      gameState?.eventDescription &&
      gameState.eventDescriptionKey == EventDescriptonNames.StrategistDraw &&
      'playerWhoPlay' in gameState?.eventDescription
    ) {
      setSelectionCards(
        gameState.eventDescription.playerWhoPlay.hand.map((card) => {
          const newSelectCard: SelectionCard = {
            card: card,
            selected: false,
            orderSelected: 0,
          };

          return newSelectCard;
        }),
      );
    }
  }, [gameState?.eventDescription, gameState?.eventDescriptionKey]);

  const selectCard = (indexSelectedCard: number, selectedCard: Card) => {
    const arrSelectionCards = selectionCards;
    const arrIndexSelectedCards = selectedIndexCards;
    const arrSelectedCards = selectedCards;

    if (selectionCards[indexSelectedCard].selected) {
      setNbSelected(nbSelected - 1);

      arrSelectionCards[indexSelectedCard].selected = false;
      arrIndexSelectedCards.splice(
        arrIndexSelectedCards.indexOf(indexSelectedCard),
        1,
      );
      arrSelectedCards.splice(arrSelectedCards.indexOf(selectedCard), 1);

      if (
        gameState?.eventDescription?.playerWhoPlay.hand.length == 3 &&
        arrSelectionCards[indexSelectedCard].orderSelected == 1
      ) {
        const findSecondChoise = arrSelectionCards.findIndex(
          (selectionCard) => {
            return selectionCard.selected;
          },
        );

        if (findSecondChoise != -1) {
          arrSelectionCards[findSecondChoise].orderSelected = 1;
        }
      }

      setSelectionCards(arrSelectionCards);
      setSelectedIndexCards(arrIndexSelectedCards);
      setSelectedCards(arrSelectedCards);

      return;
    }

    if (
      gameState?.eventDescription?.playerWhoPlay.hand.length &&
      nbSelected === gameState?.eventDescription?.playerWhoPlay.hand.length - 1
    ) {
      return;
    }

    setNbSelected(nbSelected + 1);
    arrSelectionCards[indexSelectedCard].selected = true;
    arrSelectionCards[indexSelectedCard].orderSelected = nbSelected + 1;
    arrIndexSelectedCards.push(indexSelectedCard);
    arrSelectedCards.push(selectedCard);

    setSelectionCards(arrSelectionCards);
    setSelectedIndexCards(arrIndexSelectedCards);
    setSelectedCards(arrSelectedCards);
  };

  const playStrategist = () => {
    let nbCardsToDiscard = 1;

    if (myPlayer?.hand.length == 3) {
      nbCardsToDiscard = 2;
    }
    if (nbSelected < nbCardsToDiscard) {
      setErrorMessage(
        'Vous devez défausser ' + nbCardsToDiscard + ' carte(s) !',
      );
      return;
    }

    emitEvent(CLIENT_EVENTS.GAME_PLAY_STRATEGIST_PART_TWO, {
      indexCardsDiscarded: selectedIndexCards,
      cardsDiscarded: selectedCards,
    });
  };

  if (
    gameState?.eventDescription &&
    gameState.eventDescriptionKey == EventDescriptonNames.StrategistDraw &&
    'playerWhoPlay' in gameState?.eventDescription
  ) {
    if (myPlayer?.userId == gameState.eventDescription.playerWhoPlay.userId) {
      return (
        <ModalTemplate>
          <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
            <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
              Action du Stratège
            </h2>
            {myPlayer.hand.length == 3 && (
              <>
                <div className="text-xs sm:text-sm">
                  Vous devez placer 2 cartes sous la pioche.
                </div>
                <p className="text-primary-hover text-xs sm:text-sm">
                  La première carte défaussée sera en avant-dernière position de
                  la pioche alors que la deuxième se trouvera à la fin.
                </p>
              </>
            )}
            {myPlayer.hand.length == 2 && (
              <>
                <div className="text-xs sm:text-sm">
                  Vous devez placer une carte sous la pioche.
                </div>
                <p className="text-primary-hover text-xs sm:text-sm">
                  La carte défaussée se trouvera en dernière position de la
                  pioche.
                </p>
              </>
            )}
            <div className="flex flex-row items-center gap-3 sm:gap-6 md:gap-12">
              {selectionCards.map((selectionCard, index) => {
                return (
                  <div
                    key={'discard-chancellor-' + index}
                    onClick={() => selectCard(index, selectionCard.card)}
                    className="flex flex-col items-center gap-2"
                  >
                    <CardImage card={selectionCard.card.nameCard} />
                    {selectionCard.selected ? (
                      <p className="text-xs font-bold text-white sm:text-sm md:text-base">
                        Sélectionnée ({selectionCard.orderSelected})
                      </p>
                    ) : (
                      <p className="text-xs text-neutral-500 sm:text-sm md:text-base">
                        Non sélectionnée
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            {errorMessage != '' && (
              <p className="text-red-500">{errorMessage}</p>
            )}
            <PrimaryButton buttonText="Défaussez" onClick={playStrategist} />
          </div>
        </ModalTemplate>
      );
    }
    return (
      <ModalTemplate>
        <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
          <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
            Action du Stratège
          </h2>
          <div className="text-xs sm:text-sm">
            <span
              className={`text-${gameState.eventDescription.playerWhoPlay.color}`}
            >
              {gameState.eventDescription.playerWhoPlay.userName}
            </span>{' '}
            sélectionne la carte qu&apos;il souhaite garder et place le reste
            sous la pioche.
          </div>
          <div className="flex flex-row items-center justify-center gap-6">
            {gameState.eventDescription.playerWhoPlay.hand.map(
              (card, index) => {
                return (
                  <Image
                    key={`backcard-strategist-draw-${index}`}
                    src={BackCard}
                    alt="backcard-img"
                    className="w-16 sm:w-20"
                  />
                );
              },
            )}
          </div>
          <div className="text-xs sm:text-sm">En attente de son action.</div>
        </div>
      </ModalTemplate>
    );
  }
  return <></>;
}
