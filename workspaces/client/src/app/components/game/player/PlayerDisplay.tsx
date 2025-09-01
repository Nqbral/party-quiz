import CustomNotification from '@components/notifications/CustomNotification';
import { useSocket } from '@contexts/SocketContext';
import { Player } from '@love-letter/shared/classes/Player';
import { CLIENT_EVENTS } from '@love-letter/shared/consts/ClientEvents';
import BackCard from '@public/backcard.png';
import Image from 'next/image';
import { toast } from 'react-toastify';

type Props = {
  player: Player;
  myPlayer: Player | undefined;
  isPlayerTurn: boolean;
};

export default function PlayerDisplay({
  player,
  myPlayer,
  isPlayerTurn,
}: Props) {
  const { emitEvent } = useSocket();
  const offset = 2;

  const checkOtherPlayerCard = (playerId: string) => {
    if (!isPlayerTurn) {
      toast(CustomNotification, {
        data: {
          title: 'Erreur',
          content: "Ce n'est pas à votre tour de jouer.",
        },
        hideProgressBar: true,
        closeButton: false,
        style: {
          width: 280,
        },
      });
      return;
    }

    if (myPlayer?.userId == playerId) {
      toast(CustomNotification, {
        data: {
          title: 'Erreur',
          content: 'Vous ne pouvez pas sélectionner votre propre main.',
        },
        hideProgressBar: true,
        closeButton: false,
        style: {
          width: 300,
        },
      });
      return;
    }

    if (player.hand.length == 0) {
      toast(CustomNotification, {
        data: {
          title: 'Erreur',
          content:
            'Vous ne pouvez pas sélectionner un joueur qui a une main vide.',
        },
        hideProgressBar: true,
        closeButton: false,
        style: {
          width: 300,
        },
      });
      return;
    }

    emitEvent(CLIENT_EVENTS.CHECKING_OTHER_CARDS, { idOtherPlayer: playerId });
  };

  return (
    <div
      className="flex flex-col items-center gap-2 rounded-sm border-1 border-neutral-600 px-4 py-4 shadow-md shadow-neutral-700 transition-colors hover:border-neutral-200 hover:shadow-neutral-400 sm:min-h-[234px] sm:min-w-36 sm:px-0 md:min-h-64"
      onClick={() => checkOtherPlayerCard(player.userId)}
    >
      <div className={`text-${player.color} text-sm sm:text-base`}>
        {player.userName}
      </div>
      <div className="text-xs sm:text-sm md:text-base">
        {player.hand.length} carte(s)
      </div>
      <div className="relative hidden w-32 sm:block">
        {player.hand.map((_, index) => (
          <Image
            key={`card-player-${player.userId}-${index}`}
            src={BackCard}
            alt={`img-backcard-player-${player.userId}-${index}`}
            className="absolute top-0 left-0 w-16 sm:block sm:w-24"
            style={{
              transform: `translateX(${index * offset * 4 + 4 * (5 - player.hand.length)}px)`,
              zIndex: index,
            }}
          />
        ))}
      </div>
    </div>
  );
}
