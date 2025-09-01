import PrimaryButton from '@components/buttons/PrimaryButton';
import SecondaryButton from '@components/buttons/SecondaryButton';
import PlayerSelector from '@components/game/PlayerSelector';
import { useSocket } from '@contexts/SocketContext';
import { Player } from '@shadow-network/shared/classes/Player';
import { CLIENT_EVENTS } from '@shadow-network/shared/consts/ClientEvents';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import { useState } from 'react';

import ModalTemplate from '../ModalTemplate';

type Props = {
  setModalTypeCard: (type: string | null) => void;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  myPlayer: Player | undefined;
};

export default function ModalPlayUndercoverAgent({
  setModalTypeCard,
  gameState,
  myPlayer,
}: Props) {
  const { emitEvent } = useSocket();
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [errorMessagePlayer, setErrorMessagePlayer] = useState<string | null>(
    null,
  );

  const onPlayUndercoverAgent = () => {
    setErrorMessagePlayer(null);

    if (!selectedPlayer) {
      setErrorMessagePlayer('Veuillez sélectionner un joueur.');
      return;
    }

    emitEvent(CLIENT_EVENTS.GAME_PLAY_UNDERCOVER_AGENT, {
      playerTargetedId: selectedPlayer,
    });

    setModalTypeCard(null);
  };

  return (
    <ModalTemplate>
      <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
        <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
          Jouer l&apos;Agent Infiltré
        </h2>

        <p className="text-xs sm:text-sm">
          Sélectionnez le joueur dont vous souhaitez défausser sa main
        </p>
        <PlayerSelector
          players={gameState?.players}
          myPlayerId={myPlayer?.userId ?? ''}
          mode="all"
          setSelectedPlayer={setSelectedPlayer}
          selectedPlayer={selectedPlayer}
        />
        {errorMessagePlayer && (
          <div className="text-sm text-red-500">{errorMessagePlayer}</div>
        )}
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <PrimaryButton
            buttonText="Comparer"
            onClick={onPlayUndercoverAgent}
          />
          <SecondaryButton
            buttonText="Retour"
            onClick={() => {
              setModalTypeCard(null);
              setSelectedPlayer(null);
            }}
          />
        </div>
      </div>
    </ModalTemplate>
  );
}
