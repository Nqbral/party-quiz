import ReadySection from '@components/game/ReadySection';
import HistoryChatListTile from '@components/game/gameinformations/HistoryChatListTile';
import CardImage from '@components/images/CardImage';
import { faFolderClosed, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Player } from '@shadow-network/shared/classes/Player';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';

import ModalTemplate from '../ModalTemplate';

type Props = {
  player: Player | undefined;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function ModalRecapRound({ player, gameState }: Props) {
  return (
    <ModalTemplate>
      <div className="flex flex-col items-center gap-3 text-center sm:gap-6">
        <h2 className="text-secondary-hover text-lg sm:text-2xl">
          Récapitulatif de manche
        </h2>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold underline sm:text-lg">
            Cartes des joueurs en lice
          </h3>
          <div className="flex flex-row items-center justify-center gap-2">
            {gameState?.roundRecap?.playersAlive.map((player) => {
              return (
                <div
                  className="flex flex-col gap-2"
                  key={'recap-round-player-card-' + player.userId}
                >
                  <div className={`text-${player.color} text-sm sm:text-base`}>
                    {player.userName}
                  </div>
                  <CardImage card={player.hand[0].nameCard} />
                </div>
              );
            })}
          </div>
          {gameState?.roundRecap?.playersWhoWinByValue.length == 1 && (
            <div className="text-xs sm:text-sm">
              Le joueur ayant gagné avec la carte ayant la plus grande valeur
              est :{' '}
              <span
                className={`text-${gameState.roundRecap.playersWhoWinByValue[0].color}`}
              >
                {gameState.roundRecap.playersWhoWinByValue[0].userName}
              </span>
            </div>
          )}
          {gameState?.roundRecap?.playersWhoWinByValue.length != undefined &&
            gameState?.roundRecap?.playersWhoWinByValue.length >= 2 && (
              <div className="text-xs sm:text-sm">
                Les joueurs ayant gagné avec la carte ayant la plus grande
                valeur sont :
                {gameState.roundRecap?.playersWhoWinByValue.map(
                  (player, index) => {
                    if (index == 0) {
                      return (
                        <span
                          key={'player-win-by-value-' + player.userId}
                          className={`text-${player.color}`}
                        >
                          {player.userName}
                        </span>
                      );
                    }

                    if (
                      gameState.roundRecap?.playersWhoWinByValue.length !=
                        undefined &&
                      index ==
                        gameState.roundRecap?.playersWhoWinByValue.length - 1
                    ) {
                      return (
                        <>
                          {', '}
                          <span
                            key={'player-win-by-value-' + player.userId}
                            className={`text-${player.color}`}
                          >
                            {player.userName}
                          </span>
                          .
                        </>
                      );
                    }

                    return (
                      <>
                        {', '}
                        <span
                          key={'player-win-by-value-' + player.userId}
                          className={`text-${player.color}`}
                        >
                          {player.userName}
                        </span>
                      </>
                    );
                  },
                )}
              </div>
            )}
        </div>
        {gameState?.roundRecap?.playerWhoWinBySecretOperator != undefined && (
          <div className="text-xs sm:text-sm">
            Le seul joueur en lice ayant un{' '}
            <span className="font-bold">Opérateur Secret</span> actif est :{' '}
            <span
              className={`text-${gameState.roundRecap?.playerWhoWinBySecretOperator.color}`}
            >
              {gameState.roundRecap?.playerWhoWinBySecretOperator.userName}
            </span>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold underline sm:text-lg">
            Dernière action de jeu
          </h3>
          {gameState?.historyEvents && (
            <div className="text-xs sm:text-sm">
              <HistoryChatListTile
                event={
                  gameState?.historyEvents[gameState.historyEvents.length - 1]
                }
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold underline sm:text-lg">
            Récapitulatif des scores
          </h3>
          <table>
            <tbody className="text-xs sm:text-sm md:text-base">
              <tr>
                <td className="min-w-12 border-2 border-slate-700 px-3 py-2 text-center">
                  <FontAwesomeIcon icon={faUser} color="#8d9eaa" />
                </td>
                {gameState?.roundRecap?.players.map((player) => {
                  return (
                    <td
                      key={'table-score-player-playername-' + player.userId}
                      className={`min-w-24 border-2 border-slate-700 p-2 text-center text-${player.color}`}
                    >
                      {player.userName}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="min-w-12 border-2 border-slate-700 px-3 py-2">
                  <FontAwesomeIcon
                    icon={faFolderClosed}
                    color="oklch(92.4% 0.12 95.746)"
                  />
                </td>
                {gameState?.roundRecap?.players.map((player) => {
                  return (
                    <td
                      key={'table-score-player-playerscore-' + player.userId}
                      className="min-w-24 border-2 border-slate-700 p-2 text-center"
                    >
                      {player.score}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <ReadySection gameState={gameState} player={player} />
      </div>
    </ModalTemplate>
  );
}
