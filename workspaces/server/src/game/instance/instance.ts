import { AuthenticatedSocket } from '@app/types/AuthenticatedSocket';
import { WsException } from '@nestjs/websockets';
import { Player } from '@shared/classes/Player';
import { Question } from '@shared/classes/Question';
import { CloseNumberQuestion } from '@shared/classes/questions/CloseNumberQuestion';
import { QcmQuestion } from '@shared/classes/questions/QcmQuestion';
import { QcmValidateQuestion } from '@shared/classes/questions/QcmValidateQuestion';
import { TextQuestionValidationQuestion } from '@shared/classes/questions/TextQuestionValidationQuestion';
import { GAME_STATES } from '@shared/consts/GameStates';
import { LOBBY_STATES } from '@shared/consts/LobbyStates';
import { TYPE_QUESTIONS } from '@shared/consts/TypeQuestions';
import { ServerEvents } from '@shared/enums/ServerEvents';
import { ServerPayloads } from '@shared/types/ServerPayloads';

import { Lobby } from '../lobby/lobby';

export class Instance {
  private stateGame: string = '';
  private roundNumber: number = 1;
  private questions: Question[] = [];
  private questionIndex: number = 0;

  constructor(private readonly lobby: Lobby) {}

  public triggerStart(client: AuthenticatedSocket) {
    if (client.id !== this.lobby.owner.id) {
      throw new WsException('Only the owner can start the game.');
    }

    if (this.lobby.players.length < 1) {
      throw new WsException('Not enough players to start the game.');
    }

    this.stateGame = GAME_STATES.QCM_QUESTION;
    this.lobby.stateLobby = LOBBY_STATES.GAME_STARTED;

    this.initQuestions();

    this.lobby.dispatchLobbyState();
    this.dispatchGameState();
  }

  private initQuestions() {
    this.questions = [
      new QcmQuestion(
        "Quelle est l'application préférée de Manon ?",
        ['Tiktok', 'Uber Eats', 'Bonjour RATP', 'Marmiton'],
        2,
      ),
      new CloseNumberQuestion(
        'À votre avis, ça correspond à combien de départs en vacances avec Manon ?',
        267,
        0,
      ),
      new QcmQuestion(
        'Quelle est la phrase préférée de Manon ?',
        [
          'Tu sais où sont mes clés ?',
          'On mange quoi ce soir ?',
          'Je suis fatiguée',
          "Est-ce que tu m'aimes ?",
        ],
        3,
      ),
      new QcmQuestion(
        'Si Manon devait donner une conférence TED Talk, ça serait sur quoi ?',
        [
          'Comment inventer une nouvelle expression chaque jour',
          'Comment convaincre ton chat de t’aimer',
          'Les secrets pour se perdre même avec Google Maps',
        ],
        0,
      ),
      new QcmQuestion(
        'Manon vient du provençal Manoun, qui veut dire “petite fille”. Question : quelle est la taille exacte de Manon ?',
        ['1m49', '1m57', '1m54', 'Je ne sais pas mais elle a un grand coeur'],
        2,
        3,
      ),
      new QcmValidateQuestion(
        'Le roi David a combattu Goliath. Si son Goliath, c’est un pot de cornichon. Combien de temps met-il à l’ouvrir ?',
        [
          'Moins de 10 secondes',
          'Entre 10 et 20 secondes',
          'Plus de 20 secondes',
          'Il n’arrive pas à l’ouvrir ce faible',
        ],
      ),
      new CloseNumberQuestion(
        'Un des piliers d’amours de David sont les cadeaux. En quelle année David vous-a-t-il payé une tournée ?',
        2025,
        0,
        2025,
      ),
      new QcmQuestion(
        'Si David devait être une carte dans un jeu de société, ce serait laquelle ?',
        [
          'La carte passe-tour pour éviter d’aller aux soirées car c’est trop loin',
          'La carte “Chance” du Monopoly : mais version “Pas de chance”',
          'La carte “Excuse”. Sa phrase préférée : “Désolé, pas ce soir”',
        ],
        0,
      ),
      new QcmQuestion(
        'Comme vous savez, David a participé au tournage de mission impossible. Quel serait le nom exact du film ?',
        [
          'Mission Impossible : Survivre à une soirée sans sortir une blague douteuse',
          'Mission Impossible : Gagner une partie sans tricher',
          'Mission Impossible : Ne pas regarder Dealabs pendant 2h',
        ],
        2,
      ),
      new QcmQuestion(
        'Si David devait exposer une seule chose sur son frigo, ça serait quoi ?',
        [
          'Une citation inspirante genre “Carpe Diem”, qu’il ne suit jamais',
          'Les scores des différents jeux de société qu’il a gagnés',
          'Un ticket de caisse pour se rappeler qu’il a “fait une bonne affaire”',
        ],
        1,
      ),
      new TextQuestionValidationQuestion(
        '“Herman’s Hermits” était un groupe de rock. Question : est-ce que quelqu’un dans la famille Herman sait jouer autre chose que la flûte au collège ? Si oui, quoi ?',
      ),
      new CloseNumberQuestion(
        'Combien de jeux de mots il y a sur cette photo ?',
        7,
        0,
      ),
      new QcmQuestion(
        'Si il existait un héros SupHerman, ça serait quoi son pouvoir ?',
        [
          'Invisibilité quand il doit aider',
          'Téléportation vers le canapé',
          'Le clonage d’objet : Bière et vin en priorité',
        ],
        2,
      ),
      new QcmQuestion(
        'Si David et Manon étaient des personnages de pop-culture, ça serait qui ?',
        [
          'Donkey Kong et Bob Razowski',
          'Gandalf et Pikachu',
          'Le Joker et un Minion',
        ],
        0,
      ),
      new QcmQuestion(
        'Est-ce que le questionnaire vous a plu ?',
        ["Oui, c'était super !", "Bof, j'ai vu mieux.", "Non, c'était nul."],
        0,
        2,
      ),
    ];
  }

  private getCurrentQuestion(): Question {
    return this.questions[this.questionIndex];
  }

  private findPlayerOnUserId(clientId: string): Player {
    let player = this.lobby.players.find(
      (player) => player.clientId == clientId,
    );

    if (player == undefined) {
      throw new WsException('Player not found in lobby');
    }

    return player;
  }

  public renamePlayer(client: AuthenticatedSocket, newName: string): void {
    let player = this.findPlayerOnUserId(client.id);

    player.userName = newName;
    player.isRenamed = true;

    this.lobby.dispatchLobbyState();
  }

  public answerQcm(client: AuthenticatedSocket, answerIndex: number): void {
    let player = this.findPlayerOnUserId(client.id);

    player.hasAnswered = true;
    player.answer = answerIndex;

    this.dispatchGameState();
  }

  public answerCloseNumber(client: AuthenticatedSocket, answer: number): void {
    let player = this.findPlayerOnUserId(client.id);

    player.hasAnswered = true;
    player.answer = answer;

    this.dispatchGameState();
  }

  public answerText(client: AuthenticatedSocket, answer: string): void {
    let player = this.findPlayerOnUserId(client.id);

    player.hasAnswered = true;
    player.answer = answer;

    this.dispatchGameState();
  }

  public ownerValidateQcm(answer: number): void {
    let question = this.getCurrentQuestion() as QcmValidateQuestion;

    question.valideAnswerIndex = answer;

    this.validateScoreQcmValidation();

    this.stateGame = GAME_STATES.QCM_QUESTION_VALIDATE_SHOW_ANSWER;

    this.dispatchGameState();
  }

  public ownerValidateText(correctPlayers: string[]): void {
    let question = this.getCurrentQuestion() as QcmValidateQuestion;

    correctPlayers.forEach((correctPlayerId) => {
      let player = this.findPlayerOnUserId(correctPlayerId);
      player.score += 1000;
      player.scoreThisRound += 1000;
    });

    this.stateGame = GAME_STATES.TEXT_QUESTION_VALIDATION_SHOW_ANSWER;

    this.dispatchGameState();
  }

  public nextEvent(): void {
    if (this.stateGame == GAME_STATES.QCM_QUESTION) {
      this.stateGame = GAME_STATES.QCM_QUESTION_SHOW_ANSWER;

      this.validateScoreQcm();
      this.dispatchGameState();
      return;
    }

    if (this.stateGame == GAME_STATES.CLOSE_NUMBER_QUESTION) {
      this.stateGame = GAME_STATES.CLOSE_NUMBER_QUESTION_SHOW_ANSWER;
      this.validateScoreCloseNumber();
      this.dispatchGameState();
      return;
    }

    if (this.stateGame == GAME_STATES.QCM_QUESTION_VALIDATE) {
      this.stateGame = GAME_STATES.QCM_QUESTION_VALIDATE_OWNER;
      this.dispatchGameState();
      return;
    }

    if (this.stateGame == GAME_STATES.TEXT_QUESTION_VALIDATION) {
      this.stateGame = GAME_STATES.TEXT_QUESTION_VALIDATION_VALIDATION;
      this.dispatchGameState();
      return;
    }

    this.questionIndex++;
    this.roundNumber++;

    const nextQuestion = this.getCurrentQuestion();

    if (nextQuestion == undefined) {
      this.stateGame = GAME_STATES.GAME_FINISHED;
      this.resetPlayerAnswers();
      this.dispatchGameState();
      return;
    }

    switch (nextQuestion.typeQuestion) {
      case TYPE_QUESTIONS.QCM:
        this.stateGame = GAME_STATES.QCM_QUESTION;
        break;
      case TYPE_QUESTIONS.QCM_VALIDATE:
        this.stateGame = GAME_STATES.QCM_QUESTION_VALIDATE;
        break;
      case TYPE_QUESTIONS.CLOSE_NUMBER:
        this.stateGame = GAME_STATES.CLOSE_NUMBER_QUESTION;
        break;
      case TYPE_QUESTIONS.TEXT_QUESTION_VALIDATION:
        this.stateGame = GAME_STATES.TEXT_QUESTION_VALIDATION;
        break;
      default:
        throw new WsException('Unknown question type');
    }

    this.resetPlayerAnswers();

    this.dispatchGameState();
  }

  private validateScoreQcm(): void {
    const currentQuestion = this.getCurrentQuestion() as QcmQuestion;
    const indexGoodAnswer = currentQuestion.valideAnswerIndex;
    const indexWrongAnswer = currentQuestion.negativeAnswerIndex;

    this.lobby.players.forEach((player) => {
      if (player.answer != null) {
        if (player.answer === indexGoodAnswer) {
          player.scoreThisRound = 1000;
          player.score += 1000;
        }

        if (player.answer === indexWrongAnswer) {
          player.scoreThisRound = -500;
          player.score -= 500;
        }
      }
    });
  }

  private validateScoreQcmValidation(): void {
    const currentQuestion = this.getCurrentQuestion() as QcmValidateQuestion;
    const indexGoodAnswer = currentQuestion.valideAnswerIndex;

    this.lobby.players.forEach((player) => {
      if (player.answer != null) {
        if (player.answer === indexGoodAnswer) {
          player.scoreThisRound = 1000;
          player.score += 1000;
        }
      }
    });
  }

  private validateScoreCloseNumber(): void {
    const currentQuestion = this.getCurrentQuestion() as CloseNumberQuestion;
    const correctAnswer = currentQuestion.correctAnswer;

    // Récupère les joueurs ayant répondu
    const playersWithAnswer = this.lobby.players
      .filter((player) => player.answer !== null)
      .map((player) => ({
        player,
        diff: Math.abs((player.answer as number) - correctAnswer),
      }));

    // Trie par écart croissant
    playersWithAnswer.sort((a, b) => a.diff - b.diff);

    let score = 1000;
    let previousDiff: number | null = null;
    let previousScore = score;
    let rank = 0;

    for (let i = 0; i < playersWithAnswer.length; i++) {
      const { player, diff } = playersWithAnswer[i];

      // Si même écart que le précédent, même score
      if (previousDiff !== null && diff === previousDiff) {
        player.scoreThisRound = previousScore;
        player.score += previousScore;
      } else {
        player.scoreThisRound = score;
        player.score += score;
        previousScore = score;
      }

      previousDiff = diff;
      rank++;
      score = Math.max(0, 1000 - rank * 50); // Ne descend pas en dessous de 0
    }
  }

  private resetPlayerAnswers(): void {
    this.lobby.players.forEach((player) => {
      player.hasAnswered = false;
      player.answer = null;
      player.scoreThisRound = 0;
    });
  }

  public dispatchGameState(): void {
    this.lobby.updatedAt = new Date();

    const payload: ServerPayloads[ServerEvents.GameState] = {
      lobbyId: this.lobby.id,
      stateGame: this.stateGame,
      roundNumber: this.roundNumber,
      players: this.lobby.players,
      indexQuestion: this.questionIndex,
      question: this.getCurrentQuestion(),
    };

    this.lobby.dispatchToLobby(ServerEvents.GameState, payload);
  }
}
