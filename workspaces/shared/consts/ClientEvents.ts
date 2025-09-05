export const CLIENT_EVENTS = {
  // Lobby
  LOBBY_CREATE: "client.lobby.create",
  LOBBY_JOIN: "client.lobby.join",
  LOBBY_START_GAME: "client.lobby.start.game",
  LOBBY_LEAVE: "client.lobby.leave",
  LOBBY_DELETE: "client.lobby.delete",
  LOBBY_RENAME: "client.lobby.rename",

  // Game Owner
  GAME_OWNER_NEXT_EVENT: "client.game.owner.next.event",
  GAME_OWNER_VALIDATE_QCM_QUESTION: "client.game.owner.validate.qcm.question",
  GAME_OWNER_VALIDATE_TEXT_QUESTION: "client.game.owner.validate.text.question",

  // Player
  PLAYER_SUBMIT_QCM_ANSWER: "client.player.submit.qcm.answer",
  PLAYER_SUBMIT_CLOSE_NUMBER_ANSWER: "client.player.submit.close.number.answer",
  PLAYER_SUBMIT_TEXT_ANSWER: "client.player.submit.text.answer",
} as const;
