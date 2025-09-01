import RedButton from '@components/buttons/RedButton';
import SecondaryButton from '@components/buttons/SecondaryButton';
import ModalHelpRules from '@components/modal/ModalHelpRules';
import ModalLeaveGame from '@components/modal/ModalLeaveGame';
import { Modal } from '@mui/material';
import { useState } from 'react';

export default function GameInformationsButtons() {
  const [openLobbyLeave, setOpenLobbyLeave] = useState(false);
  const handleOpenLobbyLeave = () => setOpenLobbyLeave(true);
  const handleCloseLobbyLeave = () => setOpenLobbyLeave(false);

  const [openHelpRules, setOpenHelpRules] = useState(false);
  const handleOpenHelpRules = () => setOpenHelpRules(true);
  const handleCloseHelpRules = () => setOpenHelpRules(false);

  return (
    <div className="bg-bg-navbar flex w-72 flex-col items-center gap-2 rounded-lg px-2 py-4 text-center text-base shadow-sm shadow-neutral-950 sm:text-lg md:text-2xl">
      <Modal
        open={openLobbyLeave}
        onClose={handleCloseLobbyLeave}
        aria-labelledby="modal-lobby-leave"
        aria-describedby="modal-lobby-leave"
      >
        <ModalLeaveGame handleClose={handleCloseLobbyLeave} />
      </Modal>

      <Modal
        open={openHelpRules}
        onClose={handleCloseHelpRules}
        aria-labelledby="modal-help-rules"
        aria-describedby="modal-help-rules"
      >
        <ModalHelpRules handleClose={handleCloseHelpRules} />
      </Modal>

      <SecondaryButton
        buttonText="Aides de jeu"
        onClick={handleOpenHelpRules}
      />
      <RedButton
        buttonText="Quitter la partie"
        onClick={handleOpenLobbyLeave}
      />
    </div>
  );
}
