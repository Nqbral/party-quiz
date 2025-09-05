import { useSocket } from '@contexts/SocketContext';
import { CLIENT_EVENTS } from '@party-quiz/shared/consts/ClientEvents';
import { useState } from 'react';

export default function GameLobbyRename() {
  const [playerName, setPlayerName] = useState('');
  const { emitEvent } = useSocket();
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(playerName)) {
      setError('Le nom ne doit contenir que des caractères alphanumériques.');
      return;
    }
    setError('');

    emitEvent(CLIENT_EVENTS.LOBBY_RENAME, { newName: playerName });
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 text-sm sm:text-base">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 text-center"
      >
        <label htmlFor="playerName">Nom du joueur :</label>
        <input
          id="playerName"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="border-b-2 border-slate-700 bg-transparent pb-1 text-center focus:outline-none"
          placeholder="Entrez votre nom"
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button
          type="submit"
          className="button border-primary hover:border-primary-hover my-1 min-w-48 rounded-md border-2 px-6 py-2 text-xs transition-colors sm:text-sm md:text-base"
        >
          Valider
        </button>
      </form>
    </div>
  );
}
