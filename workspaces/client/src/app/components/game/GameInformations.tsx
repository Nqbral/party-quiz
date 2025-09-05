import { ServerEvents } from '@party-quiz/shared/enums/ServerEvents';
import { ServerPayloads } from '@party-quiz/shared/types/ServerPayloads';

import GameInformationsButtons from './gameinformations/GameInformationsButtons';
import RoundInformations from './gameinformations/RoundInformations';
import ScoreInformations from './gameinformations/ScoreInformations';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function GameInformations({ gameState }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center gap-2 pb-8">
      <RoundInformations gameState={gameState} />
      <ScoreInformations gameState={gameState} />
      <GameInformationsButtons />
    </div>
  );
}
