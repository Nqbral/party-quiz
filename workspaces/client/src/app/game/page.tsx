import IsPrivate from '@components/IsPrivate';
import GameManager from '@components/game/GameManager';
import HeadDescription from '@components/head/HeadDescription';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Jeu - Shadow Network',
  description:
    'Participez à une partie de Shadow Network, le jeu d’espionnage stratégique. Affrontez vos amis, élaborez vos stratégies et tentez de transmettre votre message secret au Président.',
  robots: 'noindex, nofollow',
};

export default function GamePage() {
  return (
    <>
      <HeadDescription />
      <IsPrivate>
        <Suspense>
          <GameManager />
        </Suspense>
      </IsPrivate>
    </>
  );
}
