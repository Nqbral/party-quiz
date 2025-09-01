import LinkButton, { TypeLinkButton } from '@components/buttons/LinkButton';
import ErrorMessage from '@components/error_message/ErrorMessage';
import Footer from '@components/footer/Footer';
import Navbar from '@components/navbar/Navbar';
import LobbyReconnectToast from '@components/toast/LobbyReconnectToast';
import ShadowNetworkLogo from '@public/shadow_network_logo.png';
import { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shadow Network – Jeu d’espionnage en ligne',
  description:
    'Jouez à Shadow Network, le jeu d’espionnage stratégique. Affrontez d’autres agents et tentez de transmettre votre message secret au Président.',
  keywords: [
    'Shadow Network',
    'règles',
    "jeu d'espionnage",
    'jeu de société en ligne',
    'stratégie',
    'bluff',
    'rôles cachés',
    'bluff',
    'Love Letter',
    'multijoueur',
    'Nqbral Games',
  ],
  openGraph: {
    title: 'Shadow Network – Jeu d’espionnage en ligne',
    description:
      'Découvrez Shadow Network, le jeu d’espionnage multijoueur où chaque agent tente de transmettre un message secret au Président. Rejoignez la partie sur Nqbral Games !',
    url: 'https://shadow-network.nqbral-games.fr/',
    images: [
      {
        url: 'https://shadow-network.nqbral-games.fr/shadow_network_logo.png',
        width: 697,
        height: 850,
        alt: 'Shadow Network logo',
      },
    ],
    siteName: 'Shadow Network',
    type: 'website',
  },
  alternates: {
    canonical: 'https://shadow-network.nqbral-games.fr/',
    languages: {
      fr: 'https://shadow-network.nqbral-games.fr/',
    },
    types: {},
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <Suspense>
        <Navbar />
      </Suspense>
      <LobbyReconnectToast />
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-6">
        <Image
          src={ShadowNetworkLogo}
          alt="shadow-network-logo"
          className="w-24 sm:w-32 md:w-48"
        />
        <h1 className="px-4 text-center text-sm sm:text-lg md:text-xl">
          Shadow Network - Jeu de cartes stratégique dans l&apos;univers de
          l&apos;espionnage
        </h1>
        <div className="flex flex-col gap-1 md:flex-row md:gap-12">
          <LinkButton
            buttonText={'Jouer'}
            linkTo={'lobby'}
            typeButton={TypeLinkButton.primary}
          />
          <LinkButton
            buttonText={'Règles'}
            linkTo={'rules'}
            typeButton={TypeLinkButton.secondary}
          />
        </div>
        <ErrorMessage />
      </div>
      <Footer />
    </>
  );
}
