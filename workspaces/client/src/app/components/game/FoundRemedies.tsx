import { ServerEvents } from '@love-letter/shared/enums/ServerEvents';
import { ServerPayloads } from '@love-letter/shared/types/ServerPayloads';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function FoundRemedies({ gameState }: Props) {
  return (
    <div className="pb-8 text-base md:text-lg lg:text-xl">
      Remède(s) trouvé(s) :{' '}
      <span className="text-emerald-400">{gameState?.remediesFound}</span>
    </div>
  );
}
