import ModalDirectorOfOperationsSwap from '@components/modal/game_state_modals/ModalDirectorOfOperationsSwap';
import ModalFinishedGame from '@components/modal/game_state_modals/ModalFinishedGame';
import ModalInformantCheck from '@components/modal/game_state_modals/ModalInformantCheck';
import ModalMagnateComparison from '@components/modal/game_state_modals/ModalMagnateComparison';
import ModalRecapRound from '@components/modal/game_state_modals/ModalRecapRound';
import ModalSecurityAgentGuess from '@components/modal/game_state_modals/ModalSecurityAgentGuess';
import ModalStrategistDraw from '@components/modal/game_state_modals/ModalStrategistDraw';
import ModalUndercoverAgentDiscard from '@components/modal/game_state_modals/ModalUndercoverAgentDiscard';
import ModalFinishedByLeaving from '@components/modal/lobby_state_modals/ModalFinishedByLeaving';
import ModalPauseDisconnect from '@components/modal/lobby_state_modals/ModalPauseDisconnect';
import ModalPlayDirectorOfOperations from '@components/modal/play_modals/ModalPlayDirectorOfOperations';
import ModalPlayDoubleAgent from '@components/modal/play_modals/ModalPlayDoubleAgent';
import ModalPlayInformant from '@components/modal/play_modals/ModalPlayInformant';
import ModalPlayMagnate from '@components/modal/play_modals/ModalPlayMagnate';
import ModalPlaySecurityAgent from '@components/modal/play_modals/ModalPlaySecurityAgent';
import ModalPlayUndercoverAgent from '@components/modal/play_modals/ModalPlayUndercoverAgent';
import { useSocket } from '@contexts/SocketContext';
import { Modal } from '@mui/material';
import { Player } from '@shadow-network/shared/classes/Player';
import { GAME_STATES } from '@shadow-network/shared/consts/GameStates';
import { LOBBY_STATES } from '@shadow-network/shared/consts/LobbyStates';
import { NAME_CARD } from '@shadow-network/shared/consts/NameCard';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Slide, ToastContainer } from 'react-toastify';

import DeckAndDiscardedCards from './DeckAndDiscardedCards';
import GameInformations from './GameInformations';
import MyPlayerDisplay from './MyPlayerDisplay';
import PlayersDisplay from './PlayersDisplay';
import ScoreToReachInformation from './ScoreToReachInformation';
import RoundInformations from './gameinformations/RoundInformations';

type Props = {
  lobbyState: ServerPayloads[ServerEvents.LobbyState] | null;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function Game({ lobbyState, gameState }: Props) {
  const { userId } = useSocket();
  const [myPlayer, setPlayer] = useState<Player | undefined>(undefined);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [modalTypeCard, setModalTypeCard] = useState<string | null>(null);

  const handleCardAction = (cardName: string | null) => {
    setModalTypeCard(cardName);
  };

  useEffect(() => {
    if (gameState != null) {
      setPlayer(
        gameState.players.find((player) => {
          return player.userId == userId;
        }),
      );
    }
  }, [gameState, userId]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Modals */}
      {/* Lobby state modals */}
      <Modal
        open={lobbyState?.stateLobby == LOBBY_STATES.GAME_PAUSED}
        onClose={() => {}}
        aria-labelledby="modal-disconnected-pause"
        aria-describedby="modal-disconnected-pause"
      >
        <ModalPauseDisconnect lobbyState={lobbyState} />
      </Modal>

      <Modal
        open={lobbyState?.stateLobby == LOBBY_STATES.GAME_FINISHED_BY_LEAVING}
        onClose={() => {}}
        aria-labelledby="modal-finished-by-leaving"
        aria-describedby="modal-finished-by-leaving"
      >
        <ModalFinishedByLeaving lobbyState={lobbyState} />
      </Modal>

      {/* MODALS GAME STATE */}
      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          gameState?.stateGame == GAME_STATES.SECURITY_AGENT_GUESS
        }
        onClose={() => {}}
        aria-labelledby="modal-security-agent-guess"
        aria-describedby="modal-security-agent-guess"
      >
        <ModalSecurityAgentGuess gameState={gameState} myPlayer={myPlayer} />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          gameState?.stateGame == GAME_STATES.INFORMANT_CHECK
        }
        onClose={() => {}}
        aria-labelledby="modal-informant-check"
        aria-describedby="modal-informant-check"
      >
        <ModalInformantCheck gameState={gameState} myPlayer={myPlayer} />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          gameState?.stateGame == GAME_STATES.MAGNATE_COMPARISON
        }
        onClose={() => {}}
        aria-labelledby="modal-magnate-comparison"
        aria-describedby="modal-magnate-comparison"
      >
        <ModalMagnateComparison gameState={gameState} myPlayer={myPlayer} />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          gameState?.stateGame == GAME_STATES.UNDERCOVER_AGENT_DISCARD
        }
        onClose={() => {}}
        aria-labelledby="modal-undercover-agent-discard"
        aria-describedby="modal-undercover-agent-discard"
      >
        <ModalUndercoverAgentDiscard
          gameState={gameState}
          myPlayer={myPlayer}
        />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          gameState?.stateGame == GAME_STATES.STRATEGIST_DRAW
        }
        onClose={() => {}}
        aria-labelledby="modal-strategist-draw"
        aria-describedby="modal-strategist-draw"
      >
        <ModalStrategistDraw gameState={gameState} myPlayer={myPlayer} />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          gameState?.stateGame == GAME_STATES.DIRECTOR_OF_OPERATIONS_SWAP
        }
        onClose={() => {}}
        aria-labelledby="modal-director-of-operations-swap"
        aria-describedby="modal-director-of-operations-swap"
      >
        <ModalDirectorOfOperationsSwap
          gameState={gameState}
          myPlayer={myPlayer}
        />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          gameState?.stateGame == GAME_STATES.RECAP_ROUND
        }
        onClose={() => {}}
        aria-labelledby="modal-recap-round"
        aria-describedby="modal-recap-round"
      >
        <ModalRecapRound player={myPlayer} gameState={gameState} />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          gameState?.stateGame == GAME_STATES.GAME_FINISHED
        }
        onClose={() => {}}
        aria-labelledby="modal-recap-game"
        aria-describedby="modal-recap-game"
      >
        <ModalFinishedGame player={myPlayer} gameState={gameState} />
      </Modal>

      {/* MODALS USER PLAY */}
      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          modalTypeCard == NAME_CARD.SECURITY_AGENT
        }
        onClose={() => setModalTypeCard(null)}
        aria-labelledby="modal-play-security-agent"
      >
        <ModalPlaySecurityAgent
          setModalTypeCard={setModalTypeCard}
          gameState={gameState}
          myPlayer={myPlayer}
        />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          modalTypeCard == NAME_CARD.INFORMANT
        }
        onClose={() => setModalTypeCard(null)}
        aria-labelledby="modal-play-informant"
      >
        <ModalPlayInformant
          setModalTypeCard={setModalTypeCard}
          gameState={gameState}
          myPlayer={myPlayer}
        />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          modalTypeCard == NAME_CARD.MAGNATE
        }
        onClose={() => setModalTypeCard(null)}
        aria-labelledby="modal-play-magnate"
      >
        <ModalPlayMagnate
          setModalTypeCard={setModalTypeCard}
          gameState={gameState}
          myPlayer={myPlayer}
        />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          modalTypeCard == NAME_CARD.UNDERCOVER_AGENT
        }
        onClose={() => setModalTypeCard(null)}
        aria-labelledby="modal-play-undercover-agent"
      >
        <ModalPlayUndercoverAgent
          setModalTypeCard={setModalTypeCard}
          gameState={gameState}
          myPlayer={myPlayer}
        />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          modalTypeCard == NAME_CARD.DIRECTOR_OF_OPERATIONS
        }
        onClose={() => setModalTypeCard(null)}
        aria-labelledby="modal-play-director-of-operations"
      >
        <ModalPlayDirectorOfOperations
          setModalTypeCard={setModalTypeCard}
          gameState={gameState}
          myPlayer={myPlayer}
        />
      </Modal>

      <Modal
        open={
          lobbyState?.stateLobby != LOBBY_STATES.GAME_PAUSED &&
          lobbyState?.stateLobby != LOBBY_STATES.GAME_FINISHED_BY_LEAVING &&
          modalTypeCard == NAME_CARD.DOUBLE_AGENT
        }
        onClose={() => setModalTypeCard(null)}
        aria-labelledby="modal-play-double-agent"
      >
        <ModalPlayDoubleAgent setModalTypeCard={setModalTypeCard} />
      </Modal>

      {/* TOAST CONTAINER */}
      <ToastContainer transition={Slide} />

      {/* GAME */}
      <div className="flex min-h-screen w-full flex-row pt-12 sm:pt-16 md:pt-20">
        <button
          className="fixed top-12 left-4 z-50 sm:top-16 md:top-20 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu
            size={36}
            className="rounded-sm border-1 border-slate-700 bg-black p-2"
          />
        </button>

        <div className="hidden min-h-full w-96 pl-4 lg:flex lg:flex-col">
          <GameInformations player={myPlayer} gameState={gameState} />
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 left-0 z-50 h-full w-80 transform bg-neutral-950 p-4 shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden`}
        >
          <button
            className="mb-4 ml-auto"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
          <GameInformations player={myPlayer} gameState={gameState} />
        </div>

        <div className="flex w-full flex-col items-center gap-4 sm:gap-6">
          <div className="lg:hidden">
            <RoundInformations gameState={gameState} player={myPlayer} />
          </div>
          <ScoreToReachInformation gameState={gameState} />
          <MyPlayerDisplay
            gameState={gameState}
            myPlayer={myPlayer}
            handleCardAction={handleCardAction}
          />
          <DeckAndDiscardedCards gameState={gameState} />
          <PlayersDisplay gameState={gameState} myPlayer={myPlayer} />
        </div>
      </div>
    </>
  );
}
