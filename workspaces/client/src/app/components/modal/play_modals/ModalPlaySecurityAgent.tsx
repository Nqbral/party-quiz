import PrimaryButton from '@components/buttons/PrimaryButton';
import SecondaryButton from '@components/buttons/SecondaryButton';
import TertiaryButton from '@components/buttons/TertiaryButton';
import CardSelector from '@components/game/CardSelector';
import PlayerSelector from '@components/game/PlayerSelector';
import { useSocket } from '@contexts/SocketContext';
import { Player } from '@shadow-network/shared/classes/Player';
import { CLIENT_EVENTS } from '@shadow-network/shared/consts/ClientEvents';
import { NAME_CARD } from '@shadow-network/shared/consts/NameCard';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import { useState } from 'react';

import ModalTemplate from '../ModalTemplate';

type Props = {
  setModalTypeCard: (type: string | null) => void;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  myPlayer: Player | undefined;
};

export default function ModalPlaySecurityAgent({
  setModalTypeCard,
  gameState,
  myPlayer,
}: Props) {
  const { emitEvent } = useSocket();
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [errorMessagePlayer, setErrorMessagePlayer] = useState<string | null>(
    null,
  );
  const [errorMessageCard, setErrorMessageCard] = useState<string | null>(null);
  const [typeSelect, setTypeSelect] = useState<string>('player');

  const onPlaySecurityAgent = () => {
    setErrorMessagePlayer(null);
    setErrorMessageCard(null);

    if (!selectedPlayer) {
      setErrorMessagePlayer('Veuillez sélectionner un joueur.');
    }

    if (!selectedCard) {
      setErrorMessageCard('Veuillez sélectionner une carte.');
    }

    if (!selectedCard || !selectedPlayer) return;

    emitEvent(CLIENT_EVENTS.GAME_PLAY_SECURITY_AGENT, {
      playerTargetedId: selectedPlayer,
      cardGuessed: selectedCard,
    });

    setModalTypeCard(null);
    setTypeSelect('player');
  };

  const onPlaySecurityAgentWithoutEffect = () => {
    emitEvent(CLIENT_EVENTS.GAME_PLAY_WITHOUT_EFFECT, {
      cardPlayed: NAME_CARD.SECURITY_AGENT,
    });

    setModalTypeCard(null);
  };

  return (
    <ModalTemplate>
      <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
        <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
          Jouer l&apos;Agent de Sécurité
        </h2>
        {gameState?.players.filter((p) => {
          const hasDiscreetAssistant = p.activeCards.some(
            (c) => c.nameCard === NAME_CARD.DISCREET_ASSISTANT,
          );
          if (hasDiscreetAssistant) return false;
          if (p.userId === myPlayer?.userId) return false;
          return p.alive;
        }).length == 0 ? (
          <>
            <p className="text-xs sm:text-sm">
              Aucun agent ne peut être ciblé.
            </p>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <PrimaryButton
                buttonText="Jouer sans effet"
                onClick={onPlaySecurityAgentWithoutEffect}
              />
              <SecondaryButton
                buttonText="Retour"
                onClick={() => {
                  setModalTypeCard(null);
                  setSelectedPlayer(null);
                  setSelectedCard(null);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <p className="text-xs sm:text-sm">
              Sélectionnez le joueur dont vous voulez devinez la carte
            </p>
            <div className="flex flex-col items-center gap-2 sm:hidden">
              {typeSelect == 'player' && (
                <>
                  <PlayerSelector
                    players={gameState?.players}
                    myPlayerId={myPlayer?.userId ?? ''}
                    mode="exceptMe"
                    setSelectedPlayer={setSelectedPlayer}
                    selectedPlayer={selectedPlayer}
                  />
                  {errorMessagePlayer && (
                    <div className="text-xs text-red-500 sm:text-sm">
                      {errorMessagePlayer}
                    </div>
                  )}
                  {errorMessageCard && (
                    <div className="text-xs text-red-500 sm:text-sm">
                      {errorMessageCard}
                    </div>
                  )}
                  <TertiaryButton
                    buttonText="Sélection de carte"
                    onClick={() => {
                      setTypeSelect('card');
                    }}
                  />
                </>
              )}
              {typeSelect == 'card' && (
                <>
                  <CardSelector
                    setSelectedCard={setSelectedCard}
                    selectedCard={selectedCard}
                  />
                  {errorMessagePlayer && (
                    <div className="text-xs text-red-500 sm:text-sm">
                      {errorMessagePlayer}
                    </div>
                  )}
                  {errorMessageCard && (
                    <div className="text-xs text-red-500 sm:text-sm">
                      {errorMessageCard}
                    </div>
                  )}
                  <TertiaryButton
                    buttonText="Sélection de joueur"
                    onClick={() => {
                      setTypeSelect('player');
                    }}
                  />
                </>
              )}
            </div>
            <div className="hidden flex-col gap-3 sm:flex md:gap-6">
              <PlayerSelector
                players={gameState?.players}
                myPlayerId={myPlayer?.userId ?? ''}
                mode="exceptMe"
                setSelectedPlayer={setSelectedPlayer}
                selectedPlayer={selectedPlayer}
              />
              {errorMessagePlayer && (
                <div className="text-xs text-red-500 sm:text-sm">
                  {errorMessagePlayer}
                </div>
              )}
              <CardSelector
                setSelectedCard={setSelectedCard}
                selectedCard={selectedCard}
              />
              {errorMessageCard && (
                <div className="text-xs text-red-500 sm:text-sm">
                  {errorMessageCard}
                </div>
              )}
            </div>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <PrimaryButton
                buttonText="Deviner"
                onClick={onPlaySecurityAgent}
              />
              <SecondaryButton
                buttonText="Retour"
                onClick={() => {
                  setModalTypeCard(null);
                  setSelectedPlayer(null);
                  setSelectedCard(null);
                }}
              />
            </div>
          </>
        )}
      </div>
    </ModalTemplate>
  );
}
