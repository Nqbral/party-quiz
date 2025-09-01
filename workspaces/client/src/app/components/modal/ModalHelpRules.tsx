import SecondaryButton from '@components/buttons/SecondaryButton';
import ModalTemplate from '@components/modal/ModalTemplate';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEventHandler, useState } from 'react';

type Props = {
  handleClose: MouseEventHandler;
};

export default function ModalHelpRules({ handleClose }: Props) {
  const [page, setPage] = useState<number>(1);
  return (
    <ModalTemplate>
      <div className="flex flex-col items-center gap-2 text-center text-xs sm:gap-3 sm:text-sm md:gap-6 md:text-base">
        <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
          Aides de jeu
        </h2>
        {page == 1 && (
          <>
            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="w-32 border-1 border-slate-700 p-2 text-center font-bold sm:w-48">
                    9. Agent Double <span className="font-normal">x1</span>
                  </td>
                  <td className="min-w-8 border-1 border-slate-700 p-2 py-2 text-center">
                    Quittez la manche si vous la jouez/défaussez
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="w-32 border-1 border-slate-700 p-2 text-center font-bold sm:w-48">
                    8. Diplomate <span className="font-normal">x1</span>
                  </td>
                  <td className="min-w-8 border-1 border-slate-700 p-2 py-2 text-center">
                    Vous devez la jouer si vous détenez le Directeur des
                    Opérations ou un Agent Infiltré
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="w-32 border-1 border-slate-700 p-2 text-center font-bold sm:w-48">
                    7. Directeur des Opérations{' '}
                    <span className="font-normal">x1</span>
                  </td>
                  <td className="min-w-8 border-1 border-slate-700 p-2 py-2 text-center">
                    Échangez votre main contre celle d&apos;un autre joueur
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="w-32 border-1 border-slate-700 p-2 text-center font-bold sm:w-48">
                    6. Stratège <span className="font-normal">x2</span>
                  </td>
                  <td className="min-w-8 border-1 border-slate-700 p-2 py-2 text-center">
                    Piochez et remettez 2 cartes sous le paquet
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="w-32 border-1 border-slate-700 p-2 text-center font-bold sm:w-48">
                    5. Agent Infiltré <span className="font-normal">x2</span>
                  </td>
                  <td className="min-w-8 border-1 border-slate-700 p-2 py-2 text-center">
                    Défaussez la main d&apos;un joueur (vous-compris) qui
                    repioche
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {page == 2 && (
          <>
            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="w-32 border-1 border-slate-700 p-2 text-center font-bold sm:w-48">
                    4. Assistante Discrète{' '}
                    <span className="font-normal">x2</span>
                  </td>
                  <td className="min-w-8 border-1 border-slate-700 p-2 py-2 text-center">
                    Vous êtes immunisé contre les autres cartes jusqu&apos;à
                    votre prochain tour
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="w-32 border-1 border-slate-700 p-2 text-center font-bold sm:w-48">
                    3. Magnat <span className="font-normal">x2</span>
                  </td>
                  <td className="min-w-8 border-1 border-slate-700 p-2 py-2 text-center">
                    Comparez votre main avec celle d&apos;un autre joueur
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="w-32 border-1 border-slate-700 p-2 text-center font-bold sm:w-48">
                    2. Informateur <span className="font-normal">x2</span>
                  </td>
                  <td className="min-w-8 border-1 border-slate-700 p-2 py-2 text-center">
                    Regarder la main d&apos;un autre joueur
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="w-32 border-1 border-slate-700 p-2 text-center font-bold sm:w-48">
                    1. Agent de Sécurité <span className="font-normal">x6</span>
                  </td>
                  <td className="min-w-8 border-1 border-slate-700 p-2 py-2 text-center">
                    Devinez la main d&apos;un autre joueur (sauf Agent de
                    Sécurité)
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="w-full">
              <tbody className="w-full">
                <tr className="w-full">
                  <td className="w-32 border-1 border-slate-700 p-2 text-center font-bold sm:w-48">
                    0. Opérateur Secret <span className="font-normal">x1</span>
                  </td>
                  <td className="min-w-8 border-1 border-slate-700 p-2 py-2 text-center">
                    Gagnez 1 pion Dossier Confidentiel si personne d&apos;autre
                    ne joue/défausse une Espionne
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        <div className="flex flex-row items-center gap-4">
          <button
            onClick={() => {
              if (page == 2) {
                setPage(1);
              }
            }}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="rounded-lg border-1 border-neutral-400 p-2 transition-colors hover:border-neutral-500"
            />
          </button>
          <button
            onClick={() => {
              if (page == 1) {
                setPage(2);
              }
            }}
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              className="rounded-lg border-1 border-neutral-400 p-2 transition-colors hover:border-neutral-500"
            />
          </button>
        </div>

        <SecondaryButton buttonText="Retour" onClick={handleClose} />
      </div>
    </ModalTemplate>
  );
}
