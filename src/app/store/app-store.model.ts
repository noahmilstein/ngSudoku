import { Difficulty } from '../models/difficulty.model'
import { Board, Game } from '../models/game.model'

export class AppStore {
  difficulty: Difficulty
  currentGame: Game
  solvedBoard: Board
  displayBoard: Board
}
