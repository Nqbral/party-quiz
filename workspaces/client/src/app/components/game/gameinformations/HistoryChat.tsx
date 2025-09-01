import { HistoryEvent } from '@love-letter/shared/classes/HistoryEvent';
import { ServerEvents } from '@love-letter/shared/enums/ServerEvents';
import { ServerPayloads } from '@love-letter/shared/types/ServerPayloads';
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
    <div className="flex h-full min-h-[250px] w-72 flex-col overflow-hidden rounded-lg bg-neutral-900">
      <div className="px-4 pt-4 font-bold">Historique de la partie</div>
      <hr className="my-2" />
      <ul className="custom-scrollbar h-full overflow-y-auto text-sm">
        {historyEvents.map((historyEvent, index) => (
          <HistoryChatListTile
            event={historyEvent}
            key={`history-event-${index}`}
          />
        ))}
        <div ref={bottomRef} />
      </ul>
    </div>
  );
}
