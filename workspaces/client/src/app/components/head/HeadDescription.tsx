import Head from 'next/head';

export default function HeadDescription() {
  return (
    <Head>
      <title>Shadow Network by Nqbral Games</title>
      <meta
        name="description"
        content="Jeu de stratégie en ligne dans le milieu de l'espionnage"
      />
      <meta
        name="keywords"
        content="jeux de société, jeux en ligne, multijoueur, nqbral games, shadow network, love letter, espionnage"
      />
      <meta
        property="og:title"
        content="Shadow Network - Jeu de stratégie multijoueur"
      />
      <meta
        property="og:description"
        content="Affrontez les autres joueurs pour remettre votre message au président"
      />
      <meta
        property="og:url"
        content="https://shadow-network.nqbral-games.fr"
      />
      <meta property="og:type" content="website" />
      <link rel="canonical" href="https://shadow-network.nqbral-games.fr" />
    </Head>
  );
}
