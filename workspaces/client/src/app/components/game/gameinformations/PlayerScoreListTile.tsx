import { Player } from '@party-quiz/shared/classes/Player';

type Props = {
  player: Player;
};

export default function PlayerScoreListTile({ player }: Props) {
  return (
    <div>
      <span className={`text-${player.color}`}>{player.userName}</span> :{' '}
      {player.score}
    </div>
  );
}
