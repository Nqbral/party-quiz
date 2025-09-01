import { HistoryEvent } from '@shadow-network/shared/classes/HistoryEvent';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import { useEffect, useRef, useState } from 'react';

import HistoryChatListTile from './HistoryChatListTile';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function HistoryChat({ gameState }: Props) {
  const [historyEvents, setHistoryEvents] = useState<HistoryEvent[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (gameState != null) {
      setHistoryEvents(gameState.historyEvents);
    }
  }, [gameState]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [historyEvents]);

  return (
    <div className="bg-bg-navbar flex h-full max-h-[550px] min-h-[250px] w-72 flex-col overflow-hidden rounded-lg shadow-sm shadow-neutral-950">
      <div className="px-4 pt-4 font-bold">Historique de la partie</div>
      <hr className="my-2" />
      <ul className="custom-scrollbar h-full overflow-y-auto text-sm">
        {historyEvents.map((historyEvent, index) => (
          <li
            className="odd:bg-odd-list-tile even:bg-even-list-tile px-4 py-2 text-xs sm:text-sm md:text-base"
            key={`history-event-${index}`}
          >
            <HistoryChatListTile event={historyEvent} />
          </li>
        ))}
        <div ref={bottomRef} />
      </ul>
    </div>
  );
}
