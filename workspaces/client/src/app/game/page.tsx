import GameManager from '@components/game/GameManager';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Jeu - Party Quiz',
  robots: 'noindex, nofollow',
};

export default function GamePage() {
  return (
    <>
      <Suspense>
        <GameManager />
      </Suspense>
    </>
  );
}
