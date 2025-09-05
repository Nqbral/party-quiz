import LinkButton, { TypeLinkButton } from '@components/buttons/LinkButton';
import Footer from '@components/footer/Footer';
import Navbar from '@components/navbar/Navbar';
import PartyQuizLogo from '@public/party-quiz-logo.png';
import { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Quiz Party - Anniversaire David & Manon',
  alternates: {
    canonical: 'https://party-quiz.nqbral-games.fr/',
    languages: {
      fr: 'https://party-quiz.nqbral-games.fr/',
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
      <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-6">
        <Image
          src={PartyQuizLogo}
          alt="party-quiz-logo"
          className="w-24 sm:w-32 md:w-48"
        />
        <h1 className="px-4 text-center text-sm sm:text-lg md:text-xl">
          Anniversaire de David & Manon
        </h1>
        <div className="flex flex-col gap-1 md:flex-row md:gap-12">
          <LinkButton
            buttonText={'Jouer'}
            linkTo={'lobby'}
            typeButton={TypeLinkButton.primary}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
