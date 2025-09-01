import { Player } from '@shadow-network/shared/classes/Player';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';

import GameInformationsButtons from './gameinformations/GameInformationsButtons';
import HistoryChat from './gameinformations/HistoryChat';
import RoundInformations from './gameinformations/RoundInformations';

type Props = {
  player: Player | undefined;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function GameInformations({ player, gameState }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center gap-2 pb-8">
      <div className="hidden lg:flex">
        <RoundInformations gameState={gameState} player={player} />
      </div>
      <HistoryChat gameState={gameState} />
      <GameInformationsButtons />
    </div>
  );
}
