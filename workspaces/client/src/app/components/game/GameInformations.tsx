import { Player } from '@love-letter/shared/classes/Player';
import { ServerEvents } from '@love-letter/shared/enums/ServerEvents';
import { ServerPayloads } from '@love-letter/shared/types/ServerPayloads';

import HistoryChat from './gameinformations/HistoryChat';
import RolePlayer from './gameinformations/RolePlayer';

type Props = {
  player: Player | undefined;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function GameInformations({ player, gameState }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center gap-2 pb-8">
      <HistoryChat gameState={gameState} />
      <RolePlayer player={player} />
    </div>
  );
}
