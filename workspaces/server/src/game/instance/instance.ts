import { AuthenticatedSocket } from '@app/types/AuthenticatedSocket';
import { HttpService } from '@nestjs/axios';
import { WsException } from '@nestjs/websockets';
import { Card } from '@shared/classes/Card';
import { HistoryEvent } from '@shared/classes/HistoryEvent';
import { Player } from '@shared/classes/Player';
import { RoundRecap } from '@shared/classes/RoundRecap';
import { DiplomatCard } from '@shared/classes/cards/DiplomatCard';
import { DirectorOfOperationsCard } from '@shared/classes/cards/DirectorOfOperationsCard';
import { DiscreetAssistantCard } from '@shared/classes/cards/DiscreetAssistantCard';
import { DoubleAgentCard } from '@shared/classes/cards/DoubleAgentCard';
import { InformantCard } from '@shared/classes/cards/InformantCard';
import { MagnateCard } from '@shared/classes/cards/MagnateCard';
import { SecretOperatorCard } from '@shared/classes/cards/SecretOperatorCard';
import { SecurityAgentCard } from '@shared/classes/cards/SecurityAgentCard';
import { StrategistCard } from '@shared/classes/cards/StrategistCard';
import { UndercoverAgentCard } from '@shared/classes/cards/UndercoverAgentCard';
import { DiplomatHistoryEvent } from '@shared/classes/historyevents/DiplomatHistoryEvent';
import { DirectorOfOperationsHistoryEvent } from '@shared/classes/historyevents/DirectorOfOperationsHistoryEvent';
import { DiscreetAssistantHistoryEvent } from '@shared/classes/historyevents/DiscreetAssistantHistoryEvent';
import { DoubleAgentHistoryEvent } from '@shared/classes/historyevents/DoubleAgentHistoryEvent';
import { InformantHistoryEvent } from '@shared/classes/historyevents/InformantHistoryEvent';
import { MagnateHistoryEvent } from '@shared/classes/historyevents/MagnateHistoryEvent';
import { SecretOperatorHistoryEvent } from '@shared/classes/historyevents/SecretOperatorHistoryEvent';
import { SecurityAgentHistoryEvent } from '@shared/classes/historyevents/SecurityAgentHistoryEvent';
import { StrategistHistoryEvent } from '@shared/classes/historyevents/StrategistHistoryEvent';
import { StrategistPartTwoHistoryEvent } from '@shared/classes/historyevents/StrategistPartTwoHistoryEvent';
import { UndercoverAgentHistoryEvent } from '@shared/classes/historyevents/UndercoverAgentHistoryEvent';
import { WithoutEffectHistoryEvent } from '@shared/classes/historyevents/WithoutEffectHistoryEvent';
import { GAME_STATES } from '@shared/consts/GameStates';
import { LOBBY_STATES } from '@shared/consts/LobbyStates';
import { MAGNATE_RESULT } from '@shared/consts/MagnateResult';
import { NAME_CARD } from '@shared/consts/NameCard';
import { EventDescriptonNames } from '@shared/enums/EventDescriptionNames';
import { ServerEvents } from '@shared/enums/ServerEvents';
import {
  EventDescription,
  EventDescriptionKey,
} from '@shared/types/EventDescription';
import { ServerPayloads } from '@shared/types/ServerPayloads';
import { lastValueFrom } from 'rxjs';

import {
  PlayDirectorOfOperationsDto,
  PlayInformantDto,
  PlayMagnateDto,
  PlaySecurityAgentDto,
  PlayStrategistPartTwoDto,
  PlayUndercoverAgentDto,
} from '../lobby/dtos';
import { Lobby } from '../lobby/lobby';

export class Instance {
  private stateGame: string = '';
  private roundNumber: number = 1;
  private playerTurn: Player | null = null;
  private playersTurnOrder: Player[] = [];
  private deck: Card[] = [];
  private lastPlayedCard: string;
  private secondPlayedCard: string;
  private discardedCard: Card | null;
  private historyEvents: HistoryEvent[] = [];
  private scoreToReach: number = 0;
  private timeoutId: NodeJS.Timeout | null = null;
  private eventDescriptionKey: EventDescriptionKey;
  private eventDescription: EventDescription[EventDescriptionKey] = undefined;
  private roundRecap: RoundRecap | null = null;

  constructor(
    private readonly lobby: Lobby,
    private readonly httpService: HttpService,
  ) {}

  public triggerStart(client: AuthenticatedSocket) {
    if (client.userId !== this.lobby.owner.userId) {
      throw new WsException('Only the owner can start the game.');
    }

    if (this.lobby.players.length < 2) {
      throw new WsException('Not enough players to start the game.');
    }

    if (this.lobby.players.length > 6) {
      throw new WsException('Too much players to start the game.');
    }

    this.initPlayers();
    this.initCards();
    this.initTurnOrder();
    this.initScoreToReach();
    this.setRandomTurn();
    this.playerDrawCard();
    this.stateGame = GAME_STATES.STARTED;

    if (this.lobby.stateLobby != LOBBY_STATES.GAME_STARTED) {
      this.lobby.stateLobby = LOBBY_STATES.GAME_STARTED;
      this.lobby.dispatchLobbyState();
    }

    this.dispatchGameState();
  }

  private async updatePlayerStats(
    userId: string,
    token: string,
    stats: { gamesPlayed?: number; wins?: number; losses?: number },
  ) {
    try {
      const response = await lastValueFrom(
        this.httpService.put(
          `${process.env.NEXT_PUBLIC_WS_API_AUTH_URL}/user/stats/shadow-network`,
          stats,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        ),
      );
      return response.data;
    } catch (err) {
      console.error(
        `Erreur lors de la mise à jour des stats du joueur ${userId}`,
        err?.response?.data || err.message,
      );
    }
  }

  private async triggerFinish() {
    this.stateGame = GAME_STATES.GAME_FINISHED;

    if (this.roundRecap) {
      const loosers = this.lobby.players.filter((p) => {
        return (
          this.roundRecap?.playersWhoWinMatch.findIndex((pw) => {
            return pw.userId == p.userId;
          }) == -1
        );
      });

      const loosersClient = loosers.map((looser) => {
        return this.lobby.clients.find((client) => {
          return looser.userId == client.userId;
        });
      });

      const winnersClients = this.roundRecap.playersWhoWinMatch.map(
        (winner) => {
          return this.lobby.clients.find((client) => {
            return winner.userId == client.userId;
          });
        },
      );

      loosersClient.forEach((looser) => {
        if (looser) {
          this.updatePlayerStats(looser.userId, looser.token, {
            gamesPlayed: 1,
            wins: 0,
            losses: 1,
          });
        }
      });

      winnersClients.forEach((winner) => {
        if (winner) {
          this.updatePlayerStats(winner.userId, winner.token, {
            gamesPlayed: 1,
            wins: 1,
            losses: 0,
          });
        }
      });
    }

    this.dispatchGameState();
  }

  private initCards(): void {
    this.deck = [];

    this.deck.push(new DoubleAgentCard());
    this.deck.push(new DiplomatCard());
    this.deck.push(new DirectorOfOperationsCard());

    for (let index = 0; index < 2; index++) {
      this.deck.push(new StrategistCard());
      this.deck.push(new UndercoverAgentCard());
      this.deck.push(new DiscreetAssistantCard());
      this.deck.push(new MagnateCard());
      this.deck.push(new InformantCard());
      this.deck.push(new SecretOperatorCard());
    }

    for (let index = 0; index < 6; index++) {
      this.deck.push(new SecurityAgentCard());
    }

    this.deck = this.shuffle(this.deck);

    this.discardedCard = this.deck.pop() ?? null;

    this.lobby.players.forEach((playerGame) => {
      let card = this.deck.pop();

      if (card != undefined) {
        playerGame.hand = [card];
      }
    });
  }

  private initTurnOrder(): void {
    this.playersTurnOrder = this.lobby.players.sort(() => 0.5 - Math.random());
  }

  private initScoreToReach(): void {
    switch (this.lobby.players.length) {
      case 2:
        this.scoreToReach = 6;
        break;
      case 3:
        this.scoreToReach = 5;
        break;
      case 4:
        this.scoreToReach = 4;
        break;
      case 5:
      case 6:
        this.scoreToReach = 3;
        break;
      default:
        throw new WsException(
          'Init score to reach error : number of players incorrect.',
        );
    }
  }

  private initPlayers(): void {
    this.lobby.players.forEach((player) => {
      player.ready = false;
      player.alive = true;
      player.hand = [];
      player.activeCards = [];
    });
  }

  private setRandomTurn(): void {
    this.playerTurn =
      this.lobby.players[Math.floor(Math.random() * this.lobby.players.length)];
  }

  private playerDrawCard() {
    if (this.deck.length == 0) {
      return;
    }

    if (this.playerTurn != null) {
      let card = this.deck.pop();

      if (card != undefined) {
        this.playerTurn.hand.push(card);
      }
    }
  }

  private shuffle(array: any[]): any[] {
    let currentIndex = array.length;

    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  private findPlayerOnUserId(userId: string): Player {
    let player = this.lobby.players.find((player) => player.userId == userId);

    if (player == undefined) {
      throw new WsException('Player not found in lobby');
    }

    return player;
  }

  public playCardWithoutEffect(
    client: AuthenticatedSocket,
    cardName: string,
  ): void {
    if (client.userId != this.playerTurn?.userId) {
      throw new WsException('This is not the turn of the player.');
    }

    let player = this.findPlayerOnUserId(client.userId);

    const indexCardPlayer = player.hand.findIndex((card) => {
      return card.nameCard == cardName;
    });

    if (indexCardPlayer == -1) {
      throw new WsException("The card has not been found in the player's hand");
    }

    this.lastPlayedCard = player.hand[indexCardPlayer].nameCard;
    player.hand.splice(indexCardPlayer, 1);

    this.secondPlayedCard = '';

    if (this.checkEndRound()) {
      this.endRound();
      return;
    }

    this.historyEvents.push(new WithoutEffectHistoryEvent(player, cardName));

    this.nextPlayerTurn();
    this.playerDrawCard();
    this.dispatchGameState();
  }

  public playCard(
    client: AuthenticatedSocket,
    cardName: string,
    data: any,
  ): void {
    if (client.userId != this.playerTurn?.userId) {
      throw new WsException('This is not the turn of the player.');
    }

    let player = this.findPlayerOnUserId(client.userId);

    const indexCardPlayer = player.hand.findIndex((card) => {
      return card.nameCard == cardName;
    });

    if (indexCardPlayer == -1) {
      throw new WsException("The card has not been found in the player's hand");
    }

    if (
      cardName != NAME_CARD.SECRET_OPERATOR &&
      cardName != NAME_CARD.DISCREET_ASSISTANT
    ) {
      this.lastPlayedCard = player.hand[indexCardPlayer].nameCard;
    }

    this.secondPlayedCard = '';

    switch (cardName) {
      case NAME_CARD.SECRET_OPERATOR:
        this.playSecretOperator(player);
        break;
      case NAME_CARD.SECURITY_AGENT:
        this.playSecurityAgent(player, data);
        break;
      case NAME_CARD.INFORMANT:
        this.playInformant(player, data);
        break;
      case NAME_CARD.MAGNATE:
        this.playMagnate(player, data);
        break;
      case NAME_CARD.DISCREET_ASSISTANT:
        this.playDiscreetAssistant(player);
        break;
      case NAME_CARD.UNDERCOVER_AGENT:
        this.playUndercoverAgent(player, data);
        break;
      case NAME_CARD.STRATEGIST:
        this.playStrategist(player);
        break;
      case NAME_CARD.DIRECTOR_OF_OPERATIONS:
        this.playDirectorOfOperations(player, data);
        break;
      case NAME_CARD.DIPLOMAT:
        this.playDiplomat(player);
        break;
      case NAME_CARD.DOUBLE_AGENT:
        this.playDoubleAgent(player);
        break;
      default:
        throw new WsException('Type of card not handled');
    }

    if (
      cardName != NAME_CARD.DIRECTOR_OF_OPERATIONS &&
      cardName != NAME_CARD.UNDERCOVER_AGENT
    ) {
      player.hand.splice(indexCardPlayer, 1);
    }

    if (cardName == NAME_CARD.STRATEGIST) {
      this.dispatchGameState();
      return;
    }

    if (this.checkEndRound()) {
      this.clearTimeout();
      this.endRound();
      return;
    }

    this.nextPlayerTurn();
    this.playerDrawCard();
    this.dispatchGameState();
  }

  private playSecretOperator(player: Player): void {
    player.activeCards.push(new SecretOperatorCard());

    this.historyEvents.push(new SecretOperatorHistoryEvent(player));
  }

  private playSecurityAgent(player: Player, data: PlaySecurityAgentDto): void {
    let playerTargeted = this.findPlayerOnUserId(data.playerTargetedId);
    let cardCorrectlyGuessed = false;

    this.checkPlayerIsProtected(playerTargeted);

    if (this.checkPlayerHasCard(playerTargeted, data.cardGuessed)) {
      this.secondPlayedCard = data.cardGuessed;
      this.killPlayer(playerTargeted);
      cardCorrectlyGuessed = true;
    }

    this.stateGame = GAME_STATES.SECURITY_AGENT_GUESS;

    const eventDescription: EventDescription[EventDescriptonNames.SecurityAgentGuess] =
      {
        playerWhoPlay: player,
        playerTarget: playerTargeted,
        cardGuessed: data.cardGuessed,
        isGuessed: cardCorrectlyGuessed,
      };

    this.eventDescription = eventDescription;
    this.eventDescriptionKey = EventDescriptonNames.SecurityAgentGuess;

    this.historyEvents.push(
      new SecurityAgentHistoryEvent(
        player,
        playerTargeted,
        data.cardGuessed,
        cardCorrectlyGuessed,
      ),
    );

    this.launchTimeoutContinueGame();
  }

  private playInformant(player: Player, data: PlayInformantDto): void {
    let playerTargeted = this.findPlayerOnUserId(data.playerTargetedId);

    this.stateGame = GAME_STATES.INFORMANT_CHECK;

    const eventDescription: EventDescription[EventDescriptonNames.InformantCheck] =
      {
        playerWhoPlay: player,
        playerTarget: playerTargeted,
        cardChecked: playerTargeted.hand[0].nameCard,
      };

    this.eventDescription = eventDescription;
    this.eventDescriptionKey = EventDescriptonNames.InformantCheck;

    this.historyEvents.push(new InformantHistoryEvent(player, playerTargeted));

    this.launchTimeoutContinueGame();
  }

  private playMagnate(player: Player, data: PlayMagnateDto): void {
    let playerTargeted = this.findPlayerOnUserId(data.playerTargetedId);

    let indexMagnateCard = this.getIndexPlayerHandCard(
      player,
      NAME_CARD.MAGNATE,
    );
    let indexOtherCards = 0;

    if (indexMagnateCard == 0) {
      indexOtherCards = 1;
    }

    const myPlayerValue = player.hand[indexOtherCards].value;
    const targetedPlayerValue = playerTargeted.hand[0].value;

    let eventDescription: EventDescription[EventDescriptonNames.MagnateComparison] =
      {
        playerWhoPlay: player,
        playerTarget: playerTargeted,
        cardPlayer: player.hand[indexOtherCards].nameCard,
        cardTarget: playerTargeted.hand[0].nameCard,
        result: MAGNATE_RESULT.DRAW,
      };

    let historyEvent = new MagnateHistoryEvent(
      player,
      playerTargeted,
      MAGNATE_RESULT.DRAW,
      '',
    );

    if (myPlayerValue < targetedPlayerValue) {
      eventDescription.result = MAGNATE_RESULT.WIN_TARGET;
      this.secondPlayedCard = player.hand[indexOtherCards].nameCard;
      historyEvent.result = MAGNATE_RESULT.WIN_TARGET;
      historyEvent.cardLooser = player.hand[indexOtherCards].nameCard;
      this.killPlayer(player);
    }

    if (myPlayerValue > targetedPlayerValue) {
      eventDescription.result = MAGNATE_RESULT.WIN_PLAYER;
      this.secondPlayedCard = playerTargeted.hand[0].nameCard;
      historyEvent.result = MAGNATE_RESULT.WIN_PLAYER;
      historyEvent.cardLooser = playerTargeted.hand[0].nameCard;
      this.killPlayer(playerTargeted);
    }

    this.stateGame = GAME_STATES.MAGNATE_COMPARISON;
    this.eventDescription = eventDescription;
    this.eventDescriptionKey = EventDescriptonNames.MagnateComparison;
    this.historyEvents.push(historyEvent);

    this.launchTimeoutContinueGame();
  }

  private playDiscreetAssistant(player: Player): void {
    player.activeCards.push(new DiscreetAssistantCard());

    this.historyEvents.push(new DiscreetAssistantHistoryEvent(player));
  }

  private playUndercoverAgent(
    player: Player,
    data: PlayUndercoverAgentDto,
  ): void {
    if (this.checkPlayerHasCard(player, NAME_CARD.DIPLOMAT)) {
      throw new WsException(
        'Cannot player Undercover Agent while having a Diplomat card in hand.',
      );
    }

    let playerTargeted = this.findPlayerOnUserId(data.playerTargetedId);

    let discardedCard = playerTargeted.hand[0];
    const indexUndercoverAgent = player.hand.findIndex(
      (card) => card.nameCard == NAME_CARD.UNDERCOVER_AGENT,
    );

    if (player.userId == playerTargeted.userId) {
      if (indexUndercoverAgent == 0) {
        discardedCard = playerTargeted.hand[1];
      }
    }

    this.secondPlayedCard = discardedCard.nameCard;

    if (player.userId != playerTargeted.userId) {
      player.hand.splice(indexUndercoverAgent, 1);
    }

    const eventDescription: EventDescription[EventDescriptonNames.UndercoverAgentDiscard] =
      {
        playerWhoPlay: player,
        playerTarget: playerTargeted,
        cardDiscarded: discardedCard.nameCard,
      };

    this.eventDescription = eventDescription;
    this.eventDescriptionKey = EventDescriptonNames.UndercoverAgentDiscard;

    let historyEvent = new UndercoverAgentHistoryEvent(
      player,
      playerTargeted,
      discardedCard.nameCard,
      false,
    );

    if (this.checkPlayerHasCard(playerTargeted, NAME_CARD.DOUBLE_AGENT)) {
      this.secondPlayedCard = NAME_CARD.DOUBLE_AGENT;
      this.killPlayer(playerTargeted);
      historyEvent.kill = true;
      return;
    }

    if (this.deck.length == 0) {
      if (this.discardedCard != null) {
        playerTargeted.hand = [this.discardedCard];
      }
      this.discardedCard = null;
    } else {
      const drawedCard = this.deck.pop();

      if (drawedCard) {
        playerTargeted.hand = [drawedCard];
      }
    }

    this.stateGame = GAME_STATES.UNDERCOVER_AGENT_DISCARD;
    this.historyEvents.push(historyEvent);

    this.launchTimeoutContinueGame();
  }

  private playStrategist(player: Player): void {
    let historyEvent = new StrategistHistoryEvent(player, 0);

    if (this.deck.length == 0) {
      this.historyEvents.push(historyEvent);
      return;
    }

    const firstCardDraw = this.deck.pop();
    let nbCardDraw = 0;

    if (firstCardDraw) {
      nbCardDraw++;
      player.hand.push(firstCardDraw);
    }

    const secondCardDraw = this.deck.pop();

    if (secondCardDraw) {
      nbCardDraw++;
      player.hand.push(secondCardDraw);
    }

    const eventDescription: EventDescription[EventDescriptonNames.StrategistDraw] =
      {
        playerWhoPlay: player,
      };

    historyEvent.nbCardDraw = nbCardDraw;

    this.eventDescription = eventDescription;
    this.eventDescriptionKey = EventDescriptonNames.StrategistDraw;
    this.historyEvents.push(historyEvent);

    this.stateGame = GAME_STATES.STRATEGIST_DRAW;
  }

  public playChancellorPartTwo(
    client: AuthenticatedSocket,
    data: PlayStrategistPartTwoDto,
  ) {
    let myPlayer = this.findPlayerOnUserId(client.userId);

    if (myPlayer != undefined) {
      data.indexCardsDiscarded.forEach((indexCardToDiscard) => {
        let card = myPlayer.hand[indexCardToDiscard];
        this.deck.unshift(card);
      });

      data.cardsDiscarded.forEach((cardDiscarded) => {
        const indexCardsDiscarded = myPlayer.hand.findIndex((card) => {
          return card.nameCard == cardDiscarded.nameCard;
        });

        if (indexCardsDiscarded == -1) {
          throw new WsException('Cannot discard the card.');
        }
        myPlayer.hand.splice(indexCardsDiscarded, 1);
      });

      this.historyEvents.push(
        new StrategistPartTwoHistoryEvent(myPlayer, data.cardsDiscarded.length),
      );

      this.nextPlayerTurn();
      this.playerDrawCard();

      this.stateGame = GAME_STATES.STARTED;
      this.dispatchGameState();
    }
  }

  private playDirectorOfOperations(
    player: Player,
    data: PlayDirectorOfOperationsDto,
  ): void {
    if (this.checkPlayerHasCard(player, NAME_CARD.DIPLOMAT)) {
      throw new WsException(
        'Cannot player Director of Operations while having a Diplomat card in hand.',
      );
    }

    let playerTargeted = this.findPlayerOnUserId(data.playerTargetedId);

    let indexDirectorOfOperationsCard = this.getIndexPlayerHandCard(
      player,
      NAME_CARD.DIRECTOR_OF_OPERATIONS,
    );
    let indexOtherCard = 0;

    if (indexDirectorOfOperationsCard == 0) {
      indexOtherCard = 1;
    }

    const eventDescription: EventDescription[EventDescriptonNames.DirectorOfOperationsSwap] =
      {
        playerWhoPlay: player,
        playerTarget: playerTargeted,
        cardTradeWhoPlay: player.hand[indexOtherCard].nameCard,
        cardTradeTarget: playerTargeted.hand[0].nameCard,
      };

    this.eventDescription = eventDescription;
    this.eventDescriptionKey = EventDescriptonNames.DirectorOfOperationsSwap;

    const myPlayerCard = player.hand[indexOtherCard];
    player.hand = [playerTargeted.hand[0]];
    playerTargeted.hand = [myPlayerCard];

    this.stateGame = GAME_STATES.DIRECTOR_OF_OPERATIONS_SWAP;

    this.historyEvents.push(
      new DirectorOfOperationsHistoryEvent(player, playerTargeted),
    );

    this.launchTimeoutContinueGame();
  }

  private playDiplomat(player: Player): void {
    this.historyEvents.push(new DiplomatHistoryEvent(player));
  }

  private playDoubleAgent(player: Player): void {
    const indexSecondCard = player.hand.findIndex(
      (card) => card.nameCard != NAME_CARD.DOUBLE_AGENT,
    );

    if (indexSecondCard != -1) {
      this.secondPlayedCard = player.hand[indexSecondCard].nameCard;
    }
    this.killPlayer(player);

    this.historyEvents.push(new DoubleAgentHistoryEvent(player));
  }

  public launchTimeoutContinueGame(): void {
    this.timeoutId = setTimeout(() => {
      this.stateGame = GAME_STATES.STARTED;
      this.dispatchGameState();
      this.clearTimeout();
    }, 5000);
  }

  public clearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  private checkPlayerIsProtected(player: Player): void {
    if (this.checkPlayerHasActiveCard(player, NAME_CARD.DISCREET_ASSISTANT)) {
      throw new WsException(
        'The player is protected by a discreet assistant and cannot be targeted.',
      );
    }
  }

  private getIndexPlayerHandCard(player: Player, card: string): number {
    return player.hand.findIndex((handCard) => {
      return handCard.nameCard == card;
    });
  }

  private getIndexPlayerActiveCard(player: Player, card: string): number {
    return player.activeCards.findIndex((activeCard) => {
      return activeCard.nameCard == card;
    });
  }

  private checkPlayerHasCard(player: Player, card: string): boolean {
    return (
      player.hand.find((handCard) => {
        return handCard.nameCard == card;
      }) !== undefined
    );
  }

  private checkPlayerHasActiveCard(player: Player, card: string): boolean {
    return (
      player.activeCards.find((activeCard) => {
        return activeCard.nameCard == card;
      }) !== undefined
    );
  }

  private killPlayer(player: Player): void {
    player.alive = false;
    player.hand = [];
    player.activeCards = [];
  }

  private nextPlayerTurn(): void {
    const currentIndex = this.playersTurnOrder.findIndex(
      (p) => p.userId === this.playerTurn?.userId,
    );

    if (currentIndex === -1) {
      throw new WsException('Current player not found in turn order.');
    }

    let playerFound = false;
    let nextPlayerTurnIndex = currentIndex;

    while (!playerFound) {
      nextPlayerTurnIndex++;

      if (nextPlayerTurnIndex >= this.playersTurnOrder.length) {
        nextPlayerTurnIndex = 0;
      }

      if (this.playersTurnOrder[nextPlayerTurnIndex].alive) {
        let playerTurn = this.playersTurnOrder[nextPlayerTurnIndex];

        if (
          this.checkPlayerHasActiveCard(
            playerTurn,
            NAME_CARD.DISCREET_ASSISTANT,
          )
        ) {
          let indexDiscreetAssistant = this.getIndexPlayerActiveCard(
            playerTurn,
            NAME_CARD.DISCREET_ASSISTANT,
          );
          playerTurn.activeCards.splice(indexDiscreetAssistant, 1);
        }

        this.playerTurn = playerTurn;
        playerFound = true;
      }
    }
  }

  private checkEndRound(): boolean {
    let playersAlive = this.lobby.players.filter((player) => {
      return player.alive;
    });

    return playersAlive.length < 2 || this.deck.length == 0;
  }

  public endRound(): void {
    let roundRecap = new RoundRecap(this.lobby.players, this.scoreToReach);

    roundRecap.calculateScoreByValue();
    roundRecap.calculateScoreBySpy();

    this.lobby.players.forEach((player) => {
      player.ready = false;
    });

    this.stateGame = GAME_STATES.RECAP_ROUND;

    this.roundRecap = roundRecap;

    if (roundRecap.checkEndGame()) {
      this.triggerFinish();
      return;
    }

    this.dispatchGameState();
  }

  public onGameReady(client: AuthenticatedSocket): void {
    let player = this.findPlayerOnUserId(client.userId);

    player.ready = true;

    if (this.checkAllPlayersAreReady()) {
      this.switchToNextState();
    }

    this.dispatchGameState();
  }

  private checkAllPlayersAreReady(): boolean {
    const playersNotReady = this.lobby.players.filter((player) => {
      return !player.ready;
    });

    return playersNotReady.length == 0;
  }

  private switchToNextState(): void {
    switch (this.stateGame) {
      case GAME_STATES.RECAP_ROUND:
        this.initPlayers();
        this.initCards();
        this.lastPlayedCard = '';
        this.secondPlayedCard = '';
        this.historyEvents = [];

        if (this.roundRecap) {
          this.playerTurn = this.roundRecap.getPlayerFromWinner();
        }

        this.playerDrawCard();

        this.stateGame = GAME_STATES.STARTED;

        break;
      case GAME_STATES.GAME_FINISHED:
        this.lobby.players.forEach((p) => (p.score = 0));
        this.initPlayers();
        this.initCards();
        this.initTurnOrder();
        this.initScoreToReach();
        this.setRandomTurn();
        this.playerDrawCard();
        this.lastPlayedCard = '';
        this.secondPlayedCard = '';
        this.historyEvents = [];

        this.stateGame = GAME_STATES.STARTED;
        break;
      default:
        throw new WsException('Game state not handled');
    }
  }

  public dispatchGameState(): void {
    this.lobby.updatedAt = new Date();

    const payload: ServerPayloads[ServerEvents.GameState] = {
      lobbyId: this.lobby.id,
      stateGame: this.stateGame,
      roundNumber: this.roundNumber,
      players: this.lobby.players,
      playerTurn: this.playerTurn,
      playersTurnOrder: this.playersTurnOrder,
      deck: this.deck,
      lastPlayedCard: this.lastPlayedCard,
      secondPlayedCard: this.secondPlayedCard,
      scoreToReach: this.scoreToReach,
      historyEvents: this.historyEvents,
      eventDescription: this.eventDescription,
      eventDescriptionKey: this.eventDescriptionKey,
      roundRecap: this.roundRecap,
    };

    this.lobby.dispatchToLobby(ServerEvents.GameState, payload);
  }
}
