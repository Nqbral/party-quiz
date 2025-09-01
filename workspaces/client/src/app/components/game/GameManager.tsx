'use client';

import Navbar from '@components/navbar/Navbar';
import { useSocket } from '@contexts/SocketContext';
import { Listener } from '@lib/SocketManager';
import { CLIENT_EVENTS } from '@love-letter/shared/consts/ClientEvents';
import { LOBBY_STATES } from '@love-letter/shared/consts/LobbyStates';
import { ServerEvents } from '@love-letter/shared/enums/ServerEvents';
import { ServerPayloads } from '@love-letter/shared/types/ServerPayloads';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';

import Game from './Game';
import GameLobby from './GameLobby';
import GameLobbyDeleted from './GameLobbyDeleted';
import GameLobbyError from './GameLobbyError';

export default function GameManager() {
  const searchParams = useSearchParams();
  const { isConnectedSocket, addListener, removeListener, emitEvent } =
    useSocket();
  const [loading, setLoading] = useState(true);
  const [hasJoined, setHasJoined] = useState(false);
  const [lobbyError, setLobbyError] = useState<
    ServerPayloads[ServerEvents.LobbyError]
  >({ error: '', message: '' });
  const [lobbyState, setLobbyState] = useState<
    ServerPayloads[ServerEvents.LobbyState]
  >({
    lobbyId: '',
    ownerId: '',
    stateLobby: '',
    players: [],
  });
  const [gameState, setGameState] = useState<
    ServerPayloads[ServerEvents.GameState]
  >({
    lobbyId: '',
    stateGame: '',
    players: [],
    roundNumber: 1,
    remediesToFind: 1,
    playerTurn: null,
    checkedPlayerHand: null,
    cardsDisplayedRound: [],
    remediesFound: 0,
    statusFinish: '',
    historyEvents: [],
  });

  useEffect(() => {
    if (!isConnectedSocket) {
      return;
    }

    const onLobbyState: Listener<ServerPayloads[ServerEvents.LobbyState]> = (
      data,
    ) => {
      setLobbyState(data);
      setHasJoined(true);
      setLoading(false);
    };

    const onGameState: Listener<ServerPayloads[ServerEvents.GameState]> = (
      data,
    ) => {
      setGameState(data);
      console.log('game state data');
    };

    const onLobbyError: Listener<ServerPayloads[ServerEvents.LobbyError]> = (
      data,
    ) => {
      setLobbyError(data);
      setLoading(false);
    };

    addListener(ServerEvents.LobbyState, onLobbyState);
    addListener(ServerEvents.GameState, onGameState);
    addListener(ServerEvents.LobbyError, onLobbyError);

    return () => {
      removeListener(ServerEvents.LobbyState, onLobbyState);
      removeListener(ServerEvents.GameState, onGameState);
      removeListener(ServerEvents.LobbyError, onLobbyError);
    };
  }, [isConnectedSocket, addListener, removeListener]);

  useEffect(() => {
    setLobbyError({ error: '', message: '' });

    if (!isConnectedSocket || hasJoined) {
      setLoading(false);
      return;
    }

    const lobbyIdJoin = searchParams.get('lobby');

    if (lobbyIdJoin) {
      emitEvent(CLIENT_EVENTS.LOBBY_JOIN, { lobbyIdJoin });
    }
  }, [emitEvent, searchParams, isConnectedSocket, hasJoined]);

  if (lobbyError.error != '') {
    return <GameLobbyError error={lobbyError} />;
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#2F9966"
            ariaLabel="three-dots-loading"
          />
        </div>
      </>
    );
  }

  if (lobbyState.lobbyId == '') {
    return (
      <GameLobbyError
        error={{
          error: 'Lobby not found',
          message: 'Aucune partie a été trouvée pour cette URL.',
        }}
      />
    );
  }

  if (lobbyState.lobbyId != '') {
    switch (lobbyState.stateLobby) {
      case LOBBY_STATES.IN_LOBBY:
        return <GameLobby lobbyState={lobbyState} />;
      case LOBBY_STATES.GAME_DELETED:
        return <GameLobbyDeleted />;
    }
  }

  return <Game lobbyState={lobbyState} gameState={gameState} />;
}
