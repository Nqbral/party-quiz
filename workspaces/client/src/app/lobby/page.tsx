import LobbyClient from '@components/clients/LobbyClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lobby - Shadow Network',
  description:
    'Créez un lobby ou rejoignez celui de vos amis pour débuter une partie de Shadow Network, le jeu d’espionnage stratégique. Invitez, organisez et lancez vos parties facilement.',
  robots: 'noindex, nofollow',
};

export default function LobbyPage() {
  return <LobbyClient />;
}
