import { Cell } from '../models/cell.model'
import { Difficulty } from '../models/difficulty.model'
import { Board } from '../models/game.model'

export class AppStore {
  difficulty: Difficulty
  solvedBoard: Board
  displayBoard: Board
  initialBoard: Board
  gameIsActive: boolean
  activeCell: Cell
  lockedCoordinates: number[][] // WORKING HERE :: convert to Cell[]
}
