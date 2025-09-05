import PrimaryButton from '@components/buttons/PrimaryButton';
import RedButton from '@components/buttons/RedButton';
import { useSocket } from '@contexts/SocketContext';
import { CLIENT_EVENTS } from '@party-quiz/shared/consts/ClientEvents';
import { ServerEvents } from '@party-quiz/shared/enums/ServerEvents';
import { ServerPayloads } from '@party-quiz/shared/types/ServerPayloads';
import { useRouter } from 'next/navigation';
import QRCode from 'react-qr-code';

type Props = {
  lobbyState: ServerPayloads[ServerEvents.LobbyState] | null;
};

export default function GameLobby({ lobbyState }: Props) {
  const { clientId, emitEvent } = useSocket();
  const router = useRouter();

  const isOwner = clientId === lobbyState?.ownerId;

  const handleStart = () => {
    emitEvent(CLIENT_EVENTS.LOBBY_START_GAME, undefined);
  };
  const handleDelete = () => emitEvent(CLIENT_EVENTS.LOBBY_DELETE, undefined);
  const handleLeave = () => {
    emitEvent(CLIENT_EVENTS.LOBBY_LEAVE, undefined);
    router.push('/lobby');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 text-sm sm:text-base">
      {isOwner ? (
        <div className="flex flex-row items-center gap-16">
          <div className="flex flex-col items-center gap-4">
            <div className="flex w-80 flex-col items-center justify-center gap-2 border-1 border-slate-700 py-4 sm:w-100">
              <h2 className="mb-2 text-base sm:text-lg">Liste des joueurs</h2>
              {lobbyState?.players.map((player, index) => {
                return (
                  <div key={`player_${index}`}>
                    {index + 1}.{' '}
                    <span className={`text-${player.color}`}>
                      {player.userName}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                <PrimaryButton
                  buttonText="Lancer la partie"
                  onClick={handleStart}
                />
              </div>
              <RedButton
                buttonText="Supprimer le lobby"
                onClick={handleDelete}
              />
            </div>
          </div>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={window.location.href}
            viewBox={`0 0 256 256`}
          />
        </div>
      ) : (
        <>
          <div className="flex w-80 flex-col items-center justify-center gap-2 border-1 border-slate-700 py-4 sm:w-100">
            <h2 className="mb-2 text-base sm:text-lg">Liste des joueurs</h2>
            {lobbyState?.players.map((player, index) => {
              return (
                <div key={`player_${index}`}>
                  {index + 1}.{' '}
                  <span className={`text-${player.color}`}>
                    {player.userName}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <RedButton buttonText="Quitter le lobby" onClick={handleLeave} />
          </div>
        </>
      )}
    </div>
  );
}
