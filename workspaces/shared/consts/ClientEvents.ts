export const CLIENT_EVENTS = {
  // Lobby
  LOBBY_CREATE: "client.lobby.create",
  LOBBY_JOIN: "client.lobby.join",
  LOBBY_START_GAME: "client.lobby.start.game",
  LOBBY_LEAVE: "client.lobby.leave",
  LOBBY_DELETE: "client.lobby.delete",

  // Game
  GAME_READY: "client.game.ready",
  GAME_PLAY_WITHOUT_EFFECT: "client.game.play.without.effect",
  GAME_PLAY_SECRET_OPERATOR: "client.game.play.secret.operator",
  GAME_PLAY_SECURITY_AGENT: "client.game.play.security.agent",
  GAME_PLAY_INFORMANT: "client.game.play.informant",
  GAME_PLAY_MAGNATE: "client.game.play.magnate",
  GAME_PLAY_DISCREET_ASSISTANT: "client.game.play.discreet.assistant",
  GAME_PLAY_UNDERCOVER_AGENT: "client.game.play.undercover.agent",
  GAME_PLAY_STRATEGIST: "client.game.play.strategist",
  GAME_PLAY_STRATEGIST_PART_TWO: "client.game.play.strategist.part.two",
  GAME_PLAY_DIRECTOR_OF_OPERATIONS: "client.game.play.director.of.operations",
  GAME_PLAY_DIPLOMAT: "client.game.play.diplomat",
  GAME_PLAY_DOUBLE_AGENT: "client.game.play.double.agent",
} as const;
