import { HistoryEvent } from '@shadow-network/shared/classes/HistoryEvent';
import { HISTORY_EVENTS } from '@shadow-network/shared/consts/HistoryEvents';
import { MAGNATE_RESULT } from '@shadow-network/shared/consts/MagnateResult';

type Props = {
  event: HistoryEvent;
};

export default function HistoryChatListTile({ event }: Props) {
  if (event.nameEvent == HISTORY_EVENTS.SECRET_OPERATOR) {
    return (
      <div>
        <span className={`text-${event.playerInitEvent.color}`}>
          {event.playerInitEvent.userName}
        </span>{' '}
        a joué l&apos;<span className="font-bold">Opérateur Secret</span>.
      </div>
    );
  }

  if (
    event.nameEvent == HISTORY_EVENTS.SECURITY_AGENT &&
    'targetPlayer' in event &&
    'cardGuessed' in event &&
    'card' in event
  ) {
    const secEvent = event as {
      playerInitEvent: { color: string; userName: string };
      targetPlayer: { color: string; userName: string };
      card: string;
      cardGuessed: boolean;
    };

    return (
      <div>
        <span className={`text-${event.playerInitEvent.color}`}>
          {event.playerInitEvent.userName}
        </span>{' '}
        a joué l&apos;<span className="font-bold">Agent de Sécurité</span> sur{' '}
        <span className={`text-${secEvent.targetPlayer.color}`}>
          {secEvent.targetPlayer.userName}
        </span>
        . Il pense qu&apos;il possède la carte{' '}
        <span className="font-bold">{secEvent.card}</span>.{' '}
        {event.cardGuessed ? (
          <>
            C&apos;est le cas. Il est <span className="font-bold">éliminé</span>
            .
          </>
        ) : (
          <>Ce n&apos;est pas le cas. Rien ne se passe.</>
        )}
      </div>
    );
  }

  if (event.nameEvent == HISTORY_EVENTS.INFORMANT && 'targetPlayer' in event) {
    const secEvent = event as {
      playerInitEvent: { color: string; userName: string };
      targetPlayer: { color: string; userName: string };
    };

    return (
      <div>
        <span className={`text-${secEvent.playerInitEvent.color}`}>
          {secEvent.playerInitEvent.userName}
        </span>{' '}
        a joué l&apos;<span className="font-bold">Informateur</span> sur{' '}
        <span className={`text-${secEvent.targetPlayer.color}`}>
          {secEvent.targetPlayer.userName}
        </span>{' '}
        et regarde sa carte.
      </div>
    );
  }

  if (
    event.nameEvent == HISTORY_EVENTS.MAGNATE &&
    'targetPlayer' in event &&
    'result' in event &&
    'cardLooser' in event
  ) {
    const secEvent = event as {
      playerInitEvent: { color: string; userName: string };
      targetPlayer: { color: string; userName: string };
      result: string;
      cardLooser: string;
    };

    return (
      <div>
        <span className={`text-${secEvent.playerInitEvent.color}`}>
          {secEvent.playerInitEvent.userName}
        </span>{' '}
        a joué le <span className="font-bold">Magnat</span> sur{' '}
        <span className={`text-${secEvent.targetPlayer.color}`}>
          {secEvent.targetPlayer.userName}
        </span>
        . Ils comparent leurs mains.{' '}
        {secEvent.result == MAGNATE_RESULT.DRAW && (
          <>Égalité, rien ne se passe.</>
        )}
        {secEvent.result == MAGNATE_RESULT.WIN_PLAYER && (
          <>
            <span className={`text-${secEvent.targetPlayer.color}`}>
              {secEvent.targetPlayer.userName}
            </span>{' '}
            est <span className="font-bold">éliminé</span> en ayant la carte{' '}
            <span className="font-bold">{secEvent.cardLooser}</span>
          </>
        )}
        {secEvent.result == MAGNATE_RESULT.WIN_TARGET && (
          <>
            <span className={`text-${secEvent.playerInitEvent.color}`}>
              {secEvent.playerInitEvent.userName}
            </span>{' '}
            est <span className="font-bold">éliminé</span> en ayant la carte{' '}
            <span className="font-bold">{secEvent.cardLooser}</span>
          </>
        )}
      </div>
    );
  }

  if (event.nameEvent == HISTORY_EVENTS.DISCREET_ASSISTANT) {
    return (
      <div>
        <span className={`text-${event.playerInitEvent.color}`}>
          {event.playerInitEvent.userName}
        </span>{' '}
        a joué l&apos;<span className="font-bold">Assistante Discrète</span> et
        est protégé des actions des autres joueurs pendant un tour.
      </div>
    );
  }

  if (
    event.nameEvent == HISTORY_EVENTS.UNDERCOVER_AGENT &&
    'targetPlayer' in event &&
    'discardedCard' in event &&
    'kill' in event
  ) {
    const secEvent = event as {
      playerInitEvent: { color: string; userName: string; userId: string };
      targetPlayer: { color: string; userName: string; userId: string };
      discardedCard: string;
      kill: boolean;
    };

    return (
      <div>
        <span className={`text-${secEvent.playerInitEvent.color}`}>
          {secEvent.playerInitEvent.userName}
        </span>{' '}
        a joué l&apos;<span className="font-bold">Agent Infiltré</span> sur{' '}
        {secEvent.playerInitEvent.userId == secEvent.targetPlayer.userId ? (
          <>lui-même</>
        ) : (
          <span className={`text-${secEvent.targetPlayer.color}`}>
            {secEvent.targetPlayer.userName}
          </span>
        )}
        . La carte défaussée est{' '}
        <span className="font-bold">{secEvent.discardedCard}</span>.{' '}
        {secEvent.kill && (
          <>
            <span className={`text-${secEvent.targetPlayer.color}`}>
              {secEvent.targetPlayer.userName}
            </span>{' '}
            est <span className="font-bold">éliminé</span>.
          </>
        )}
      </div>
    );
  }

  if (event.nameEvent == HISTORY_EVENTS.STRATEGIST && 'nbCardDraw' in event) {
    const secEvent = event as {
      playerInitEvent: { color: string; userName: string };
      nbCardDraw: number;
    };

    return (
      <div>
        <span className={`text-${secEvent.playerInitEvent.color}`}>
          {secEvent.playerInitEvent.userName}
        </span>{' '}
        a joué le <span className="font-bold">Stratégiste</span> et pioche{' '}
        {secEvent.nbCardDraw} carte(s) et décide quelle carte il garde en main
        et place le reste sous la pioche.
      </div>
    );
  }

  if (
    event.nameEvent == HISTORY_EVENTS.STRATEGIST_PART_TWO &&
    'nbCardDraw' in event
  ) {
    const secEvent = event as {
      playerInitEvent: { color: string; userName: string };
      nbCardDraw: number;
    };

    return (
      <div>
        <span className={`text-${secEvent.playerInitEvent.color}`}>
          {secEvent.playerInitEvent.userName}
        </span>{' '}
        a placé {secEvent.nbCardDraw} carte(s) sous la pioche.
      </div>
    );
  }

  if (
    event.nameEvent == HISTORY_EVENTS.DIRECTOR_OF_OPERATIONS &&
    'targetPlayer' in event
  ) {
    const secEvent = event as {
      playerInitEvent: { color: string; userName: string };
      targetPlayer: { color: string; userName: string; userId: string };
    };

    return (
      <div>
        <span className={`text-${secEvent.playerInitEvent.color}`}>
          {secEvent.playerInitEvent.userName}
        </span>{' '}
        a joué le <span className="font-bold">Directeur des Opérations</span>{' '}
        sur{' '}
        <span className={`text-${secEvent.targetPlayer.color}`}>
          {secEvent.targetPlayer.userName}
        </span>
        . Ils échangent leur main.
      </div>
    );
  }

  if (event.nameEvent == HISTORY_EVENTS.DIPLOMAT) {
    return (
      <div>
        <span className={`text-${event.playerInitEvent.color}`}>
          {event.playerInitEvent.userName}
        </span>{' '}
        a joué la <span className="font-bold">Diplomate</span>.
      </div>
    );
  }

  if (event.nameEvent == HISTORY_EVENTS.DOUBLE_AGENT) {
    return (
      <div>
        <span className={`text-${event.playerInitEvent.color}`}>
          {event.playerInitEvent.userName}
        </span>{' '}
        a joué l&apos;
        <span className="font-bold">Agent Double</span>. Le joueur est donc{' '}
        <span className="font-bold">éliminé</span>.
      </div>
    );
  }

  if (
    event.nameEvent == HISTORY_EVENTS.WITHOUT_EFFECT_CARD &&
    'cardName' in event
  ) {
    const secEvent = event as {
      playerInitEvent: { color: string; userName: string };
      cardName: string;
    };

    return (
      <div>
        <span className={`text-${secEvent.playerInitEvent.color}`}>
          {secEvent.playerInitEvent.userName}
        </span>{' '}
        a joué la carte <span className="font-bold">{secEvent.cardName}</span>{' '}
        sans effet.
      </div>
    );
  }

  return <></>;
}
