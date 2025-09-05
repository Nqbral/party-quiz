'use client';

import LinkButton, { TypeLinkButton } from '@components/buttons/LinkButton';
import PrimaryButton from '@components/buttons/PrimaryButton';
import Footer from '@components/footer/Footer';
import Navbar from '@components/navbar/Navbar';
import { useSocket } from '@contexts/SocketContext';
import { Listener } from '@lib/SocketManager';
import { CLIENT_EVENTS } from '@party-quiz/shared/consts/ClientEvents';
import { ServerEvents } from '@party-quiz/shared/enums/ServerEvents';
import { ServerPayloads } from '@party-quiz/shared/types/ServerPayloads';
import PartyQuizLogo from '@public/party-quiz-logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LobbyClient() {
  const { addListener, removeListener, emitEvent } = useSocket();
  const router = useRouter();

  const createLobby = () => {
    emitEvent(CLIENT_EVENTS.LOBBY_CREATE, undefined);
  };

  useEffect(() => {
    const onLobbyCreate: Listener<ServerPayloads[ServerEvents.LobbyCreate]> = (
      data,
    ) => {
      router.push('/game?lobby=' + data.lobbyId);
    };

    addListener(ServerEvents.LobbyCreate, onLobbyCreate);

    return () => {
      removeListener(ServerEvents.LobbyCreate, onLobbyCreate);
    };
  }, [addListener, removeListener, router]);

  return (
    <>
      <Navbar />
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-2 sm:gap-4">
        <Image
          src={PartyQuizLogo}
          alt="party-quiz-logo"
          className="w-24 sm:w-32 md:w-48"
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-12">
          <PrimaryButton buttonText="Créer un lobby" onClick={createLobby} />
        </div>
        <LinkButton
          buttonText={'Retour'}
          linkTo={'/'}
          typeButton={TypeLinkButton.tertiary}
        />
        <Footer />
      </div>
    </>
  );
}
