import HeadDescription from '@components/head/HeadDescription';
import Navbar from '@components/navbar/Navbar';
import { faFolderClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingAuth from 'app/layout/LoadingAuth';

import DiplomatImg from '../../../public/diplomat_without_value.png';
import DirectorOfOperationsImg from '../../../public/director_of_operations_without_value.png';
import DiscreetAssistantImg from '../../../public/discreet_assistant_without_value.png';
import DoubleAgentImg from '../../../public/double_agent_without_value.png';
import InformantImg from '../../../public/informant_without_value.png';
import MagnateImg from '../../../public/magnate_without_value.png';
import SecretOperatorImg from '../../../public/secret_operator_without_value.png';
import SecurityAgentImg from '../../../public/security_guard_without_value.png';
import StrategistImg from '../../../public/strategist_without_value.png';
import UndercoverAgentImg from '../../../public/undercover_agent_without_value.png';
import LinkButton, { TypeLinkButton } from '../components/buttons/LinkButton';
import CardDescription from '../components/rules/CardDescription';

export const metadata = {
  title: 'Règles du jeu – Shadow Network',
  description:
    'Découvrez les règles officielles de Shadow Network, le jeu d’espionnage stratégique. Apprenez à jouer, maîtrisez les cartes et devenez le meilleur agent secret.',
  robots: 'index, follow',
  openGraph: {
    title: 'Règles du jeu – Shadow Network',
    description:
      'Découvrez les règles officielles de Shadow Network, le jeu d’espionnage stratégique. Apprenez à jouer, maîtrisez les cartes et devenez le meilleur agent secret.',
    url: 'https://shadow-network.nqbral-games.fr/rules',
    type: 'article',
    images: [
      {
        url: 'https://shadow-network.nqbral-games.fr/shadow_network_logo.png',
        width: 697,
        height: 850,
        alt: 'Shadow Network logo',
      },
    ],
  },
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
};

export default function RulesPage() {
  return (
    <>
      <HeadDescription />
      <LoadingAuth>
        <Navbar />
        <div className="flex w-full flex-col items-center gap-12 px-4 pt-24 pb-16">
          <h1 className="text-primary text-4xl">Règles</h1>
          <div className="container flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl underline underline-offset-4">
                Présentation
              </h2>
              <p className="text-center">
                Dans <span className="font-bold">Shadow Network</span>, de 2 à 6
                agents secrets rivalisent pour remettre un message crucial
                directement entre les mains du Président. Celui-ci ne fera
                confiance qu&apos;à une seule personne pour le recevoir, et le
                sort du monde libre en dépend.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl underline underline-offset-4">
                Mise en place du jeu
              </h2>
              <p className="text-center">
                Au début de chaque manche de{' '}
                <span className="font-bold">Shadow Network</span>, les 21 cartes
                Opérateur sont mélangées. Une carte est ensuite placée face
                cachée à côté pour garantir le secret.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl underline underline-offset-4">
                Déroulement de la Partie
              </h2>
              <p className="text-center">
                Chaque manche de{' '}
                <span className="font-bold">Shadow Network</span> vous met dans
                la peau d&apos;un agent tentant de faire parvenir un message
                codé par l&apos;intermédiaire de membres influents du réseau.
                <br />
                La carte en main représente la personne transportant
                actuellement votre message. Cette personne peut changer au fil
                des tours, selon les cartes piochées et jouées.
                <br />
                Pour remporter une manche, vous devez être le dernier agent en
                jeu, ou détenir la carte la plus influente au moment où la
                manche se termine.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl underline underline-offset-4">
                Tour des Joueurs
              </h2>
              <p className="text-center">
                Les joueurs jouent dans le sens horaire. Au début de votre tour,
                piochez 1 carte. Choisissez ensuite l&apos;une des deux cartes
                en main, jouez-la et appliquez son effet.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl underline underline-offset-4">
                Exclusion d&apos;une Manche
              </h2>
              <p className="text-center">
                Certains effets de cartes peuvent entraîner votre exclusion de
                la manche : votre message a été intercepté ou votre identité
                révélée.
                <br />
                Dans ce cas,{' '}
                <span className="font-bold">
                  défaussez votre carte face visible
                </span>{' '}
                sans appliquer son effet.
                <br />
                <span className="font-bold">
                  Vous ne pouvez plus être ciblé par d&apos;autres effets et
                  vous passez votre tour jusqu&apos;à la prochaine manche.
                </span>
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl underline underline-offset-4">
                Cartes Jouées et Défaussées
              </h2>
              <p className="text-center">
                Les seules cartes visibles pendant la partie sont :
              </p>
              <ul className="list-inside list-disc text-center">
                <li>la dernière carte jouée par chaque joueur</li>
                <li>
                  les cartes avec un effet en cours (comme l&apos;Assistante
                  Discrète ou l&apos;Opérateur Secret)
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl underline underline-offset-4">
                Fin de la manche
              </h2>
              <p className="text-center">
                Une manche se termine lorsque{' '}
                <span className="font-bold">le paquet est vide</span> ou
                qu&apos;
                <span className="font-bold">
                  il ne reste qu&apos;un seul agent actif
                </span>
                .
                <br />
                <br />
                Si le paquet est vide, les agents restants comparent leurs
                cartes après le dernier tour. Celui ayant la valeur la plus
                élevée remporte la manche et reçoit un jeton Dossier
                Confidentiel.
                <br />
                En cas d&apos;égalité, les joueurs concernés remportent chacun
                un jeton.
                <br />
                <br />
                Si un seul joueur est encore actif, il remporte immédiatement la
                manche.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl underline underline-offset-4">
                Manche suivante
              </h2>
              <p className="text-center">
                Toutes les cartes sont réunies, mélangées, puis une carte est
                mise de côté face cachée.
                <br />
                <span className="font-bold">
                  Le vainqueur de la manche précédente
                </span>{' '}
                commence. En cas d&apos;égalité, un joueur parmi les gagnants
                commence au hasard.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl underline underline-offset-4">
                Remporter la partie
              </h2>
              <p className="text-center">
                La partie s&apos;arrête lorsqu&apos;un joueur possède
                suffisamment de jetons Dossier Confidentiel pour l&apos;emporter
                (selon le nombre de joueurs, voir tableau ci-dessous).
              </p>
              <table>
                <tbody>
                  <tr>
                    <td className="min-w-12 border-2 border-slate-700 px-3 py-2 text-center">
                      <FontAwesomeIcon icon={faUser} color="#8d9eaa" />
                    </td>
                    <td className="min-w-8 border-2 border-slate-700 py-2 text-center">
                      2
                    </td>
                    <td className="min-w-8 border-2 border-slate-700 py-2 text-center">
                      3
                    </td>
                    <td className="min-w-8 border-2 border-slate-700 py-2 text-center">
                      4
                    </td>
                    <td className="min-w-8 border-2 border-slate-700 py-2 text-center">
                      5
                    </td>
                    <td className="min-w-8 border-2 border-slate-700 py-2 text-center">
                      6
                    </td>
                  </tr>
                  <tr>
                    <td className="min-w-12 border-2 border-slate-700 px-3 py-2">
                      <FontAwesomeIcon
                        icon={faFolderClosed}
                        color="oklch(92.4% 0.12 95.746)"
                      />
                    </td>
                    <td className="min-w-8 border-2 border-slate-700 py-2 text-center">
                      6
                    </td>
                    <td className="min-w-8 border-2 border-slate-700 py-2 text-center">
                      5
                    </td>
                    <td className="min-w-8 border-2 border-slate-700 py-2 text-center">
                      4
                    </td>
                    <td className="min-w-8 border-2 border-slate-700 py-2 text-center">
                      3
                    </td>
                    <td className="min-w-8 border-2 border-slate-700 py-2 text-center">
                      3
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-col items-center gap-3">
              <h2 className="text-xl underline underline-offset-4">
                Effet des cartes
              </h2>
              <p className="mb-6 text-center">
                Chaque carte Opérateur incarne un personnage influent du réseau
                d&apos;espionnage. Chacun dispose de compétences uniques que
                vous devrez utiliser à bon escient pour atteindre votre
                objectif.
              </p>

              <div className="flex flex-col items-center gap-8">
                {/* Double Agent */}
                <CardDescription
                  nameCard="Agent Double"
                  img={DoubleAgentImg}
                  altimg="princess_img"
                  description={
                    <p className="text-center">
                      L&apos;Agent Double est la carte avec{' '}
                      <span className="font-bold">
                        la valeur la plus élevée du jeu
                      </span>
                      .
                      <br />
                      <br />
                      Toutefois, si vous jouez ou défaussez cette carte{' '}
                      <span className="font-bold">
                        pour quelque raison que ce soit
                      </span>
                      , vous quittez immédiatement la manche.
                    </p>
                  }
                  value={9}
                  nbCard={1}
                />

                {/* Diplomat */}
                <CardDescription
                  nameCard="Diplomate"
                  img={DiplomatImg}
                  altimg="diplomat_img"
                  description={
                    <p className="text-center">
                      La Diplomate n&apos;a pas d&apos;effect actif
                      lorsqu&apos;elle est jouée ou défaussée.
                      <br />
                      <br />
                      Vous <span className="font-bold">devez</span> la jouer
                      pendant votre tour si l&apos;autre carte de votre main est
                      le{' '}
                      <span className="font-bold">
                        Directeur des Opérations
                      </span>{' '}
                      ou un <span className="font-bold">Agent Infiltré</span>.
                      <br />
                      <br />
                      Néanmoins, vous pouvez choisir de la jouer durant votre
                      tour même si vous ne détenez ni le Directeur des
                      Opérations, ni un Agent Infiltré.
                      <br />
                      <br />
                      Son effet ne s&apos;applique pas lorsque vous piochez des
                      cartes suite à d&apos;autres effets (Stratège).
                    </p>
                  }
                  value={8}
                  nbCard={1}
                />

                {/* Directeur des opérations */}
                <CardDescription
                  nameCard="Directeur des Opérations"
                  img={DirectorOfOperationsImg}
                  altimg="director_of_operations_img"
                  description={
                    <p className="text-center">
                      Choisissez un autre joueur et échangez votre main contre
                      la sienne.
                    </p>
                  }
                  value={7}
                  nbCard={1}
                />

                {/* Stratège */}
                <CardDescription
                  nameCard="Stratège"
                  img={StrategistImg}
                  altimg="strategist_img"
                  description={
                    <p className="text-center">
                      Piochez 2 cartes du paquet et ajoutez-les à votre main.
                      Choisissez et conservez{' '}
                      <span className="font-bold">une</span> des trois cartes de
                      votre main, puis placez les{' '}
                      <span className="font-bold">deux</span> autres face cachée
                      au-dessous du paquet (dans l&apos;ordre de votre choix).
                      <br />
                      <br />
                      S&apos;il ne reste qu&apos;une seule carte dans le paquet,
                      piochez-la et remettez-en une à sa place. Si le paquet est
                      épuisé, le Stratège n&apos;a pas d&apos;effet
                      lorsqu&apos;il est joué.
                    </p>
                  }
                  value={6}
                  nbCard={2}
                />

                {/* Prince */}
                <CardDescription
                  nameCard="Agent Infiltré"
                  img={UndercoverAgentImg}
                  altimg="undercover_agent_img"
                  description={
                    <p className="text-center">
                      Choisissez{' '}
                      <span className="font-bold">
                        n&apos;importe quel joueur
                      </span>
                      , y compris vous-même. Le joueur choisi défausse sa main
                      face visible (sans résoudre l&apos;effet de la carte
                      qu&apos;elle contenait) et en pioche une nouvelle.
                      <br />
                      <br />
                      Si le paquet est épuisé, le joueur choisi pioche la carte
                      face cachée mise de côté en début de la partie
                      <br />
                      <br />
                      Si un joueur vous cible en résolvant l&apos;effet du Agent
                      Infiltré et que vous êtes contrait de défausser
                      l&apos;Agent Double, vous quittez la manche immédiatement
                      sans piocher de nouvelle main.
                    </p>
                  }
                  value={5}
                  nbCard={2}
                />

                {/* Assistante discrète */}
                <CardDescription
                  nameCard="Assistante discrète"
                  img={DiscreetAssistantImg}
                  altimg="discreet_assistant_img"
                  description={
                    <div>
                      <p className="text-center">
                        Jusqu&apos;au début de{' '}
                        <span className="font-bold">votre prochain tour</span>,
                        les autres joueurs ne peuvent pas vous cibler
                        lorsqu&apos;ils résolvent leurs effets de cartes.
                        <br />
                        <br />
                        Dans le cas extrêmement rare où{' '}
                        <span className="font-bold">
                          tous les autres joueurs
                        </span>{' '}
                        encore en lice seraient &quot;protégés&quot; par une
                        Assistante discrète au moment où vous jouez une carte,
                        suivez ces consignes :
                      </p>
                      <br />
                      <ul className="list-inside list-disc text-center">
                        <li>
                          Si cette carte nécessite que vous choisissez{' '}
                          <span className="font-bold">un autre joueur</span>{' '}
                          (Agent de Sécurité, Informateur, Magnat ou Directeur
                          des Opérations), elle n&apos;a pas d&apos;effet.
                        </li>
                        <li>
                          Si cette carte nécessite que vous choisissez{' '}
                          <span className="font-bold">
                            n&apos;importe quel joueur
                          </span>{' '}
                          (Agent Infiltré), vous êtes contraint de vous cibler
                          vous-même pour résoudre son effet.
                        </li>
                      </ul>
                    </div>
                  }
                  value={4}
                  nbCard={2}
                />

                {/* Magnat */}
                <CardDescription
                  nameCard="Magnat"
                  img={MagnateImg}
                  altimg="magnate_img"
                  description={
                    <p className="text-center">
                      Choisissez un autre joueur et comparer discrètement vos
                      deux mains. Celui d&apos;entre vous qui détient la carte
                      dont la valeur est la plus faible quitte immédiatement la
                      manche.
                      <br />
                      <br />
                      En cas d&apos;égalité, aucun de vous deux ne quitte la
                      manche.
                    </p>
                  }
                  value={3}
                  nbCard={2}
                />

                {/* Informateur */}
                <CardDescription
                  nameCard="Informateur"
                  img={InformantImg}
                  altimg="informant_img"
                  description={
                    <p className="text-center">
                      Choisissez un autre joueur et regardez discrètement sa
                      main (personne d&apos;autre que vous ne le voit).
                    </p>
                  }
                  value={2}
                  nbCard={2}
                />

                {/* Agent de Sécurité */}
                <CardDescription
                  nameCard="Agent de Sécurité"
                  img={SecurityAgentImg}
                  altimg="security_agent_img"
                  description={
                    <p className="text-center">
                      Choisissez un autre joueur et nommez un personnage autre
                      que l&apos;Agent de Sécurité. Si le joueur choisi a cette
                      carte en main, il quitte la manche.
                    </p>
                  }
                  value={1}
                  nbCard={6}
                />

                {/* Opérateur Secret */}
                <CardDescription
                  nameCard="Opérateur Secret"
                  img={SecretOperatorImg}
                  altimg="secret_operator_img"
                  description={
                    <p className="text-center">
                      Un Opérateur Secret n&apos;a pas d&apos;effet actif
                      lorsqu&apos;il est joué ou défaussé.
                      <br />
                      <br />À la fin de manche, si vous êtes{' '}
                      <span className="font-bold">
                        le seul joueur encore en lice
                      </span>{' '}
                      qui a joué ou défaussé une Opérateur Secret, vous gagnez 1
                      Dossier Confidentiel.
                      <br />
                      <br />
                      Cela ne revient pas à remporter la manche ; le vainqueur
                      (même si c&apos;est vous) gagne quand même son pion
                      faveur.
                      <br />
                      <br />
                      Vous ne gagnez toujours qu&apos;un seul dossier, même si
                      vous jouez et/ou défaussez les deux Opérateurs Secrets.
                    </p>
                  }
                  value={0}
                  nbCard={2}
                />
              </div>
            </div>
          </div>
          <LinkButton
            buttonText="Retour"
            linkTo="/"
            typeButton={TypeLinkButton.secondary}
          />
        </div>
      </LoadingAuth>
    </>
  );
}
