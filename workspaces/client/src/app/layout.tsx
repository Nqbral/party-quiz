import App from '@components/app';
import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: 'Shadow Network by Nqbral Games',
  description: "Jeu de stratégie en ligne dans le milieu de l'espionnage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <App>{children}</App>;
}
