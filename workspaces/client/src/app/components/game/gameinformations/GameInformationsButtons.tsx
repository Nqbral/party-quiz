import SecondaryButton from '@components/buttons/SecondaryButton';
import { useSocket } from '@contexts/SocketContext';
import { CLIENT_EVENTS } from '@party-quiz/shared/consts/ClientEvents';

export default function GameInformationsButtons() {
  const { emitEvent } = useSocket();

  const handleNextEvent = () => {
    emitEvent(CLIENT_EVENTS.GAME_OWNER_NEXT_EVENT, undefined);
  };

  return (
    <div className="bg-bg-navbar flex w-72 flex-col items-center gap-2 rounded-lg px-2 py-4 text-center text-base shadow-sm shadow-neutral-950 sm:text-lg md:text-2xl">
      <SecondaryButton buttonText="Suivant" onClick={handleNextEvent} />
    </div>
  );
}
