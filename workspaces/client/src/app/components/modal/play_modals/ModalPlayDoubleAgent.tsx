import PrimaryButton from '@components/buttons/PrimaryButton';
import SecondaryButton from '@components/buttons/SecondaryButton';
import { useSocket } from '@contexts/SocketContext';
import { CLIENT_EVENTS } from '@shadow-network/shared/consts/ClientEvents';

import ModalTemplate from '../ModalTemplate';

type Props = {
  setModalTypeCard: (type: string | null) => void;
};

export default function ModalPlayDoubleAgent({ setModalTypeCard }: Props) {
  const { emitEvent } = useSocket();

  const onPlayDoubleAgent = () => {
    emitEvent(CLIENT_EVENTS.GAME_PLAY_DOUBLE_AGENT, undefined);
    setModalTypeCard(null);
  };

  return (
    <ModalTemplate>
      <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
        <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
          Jouer l&apos;Agent Double
        </h2>
        <p className="text-primary-hover">
          Jouer l&apos;Agent Double vous fera mourir !
        </p>
        <div className="flex flex-col items-center gap-2 sm:flex-row">
          <PrimaryButton buttonText="Mourir" onClick={onPlayDoubleAgent} />
          <SecondaryButton
            buttonText="Retour"
            onClick={() => {
              setModalTypeCard(null);
            }}
          />
        </div>
      </div>
    </ModalTemplate>
  );
}
