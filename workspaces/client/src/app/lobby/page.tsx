import LobbyClient from '@components/clients/LobbyClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lobby - Party Quiz',
  robots: 'noindex, nofollow',
};

export default function LobbyPage() {
  return <LobbyClient />;
}
