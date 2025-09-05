'use client';

import { SocketProvider } from '@contexts/SocketContext';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
});
export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketProvider>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1C1D30" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Party Quiz',
              url: 'https://party-quiz.nqbral-games.fr/',
              alternateName: 'Nqbral Games',
              inLanguage: 'fr',
              sameAs: ['https://nqbral-games.fr/'],
            }),
          }}
        />
      </head>
      <html className={`${montserrat.className}`}>
        <body>{children}</body>
      </html>
    </SocketProvider>
  );
}
