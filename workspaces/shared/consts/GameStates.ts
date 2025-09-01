export const GAME_STATES = {
  STARTED: "game.state.started",
  SECURITY_AGENT_GUESS: "game.state.security.agent.guess",
  INFORMANT_CHECK: "game.state.informant.check",
  MAGNATE_COMPARISON: "game.state.magnate.comparison",
  UNDERCOVER_AGENT_DISCARD: "game.state.undercover.agent.discard",
  STRATEGIST_DRAW: "game.state.strategist.draw",
  DIRECTOR_OF_OPERATIONS_SWAP: "game.state.director.of.operations.swap",
  RECAP_ROUND: "game.state.recap.round",
  GAME_FINISHED: "game.state.finished",
} as const;
