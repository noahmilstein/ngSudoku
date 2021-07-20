import { CellHistory } from '../models/cell-history.model'
import { Cell } from '../models/cell.model'
import { Difficulty } from '../models/difficulty.model'
import { Board } from '../models/game.model'

export class AppStore {
  difficulty: Difficulty
  solvedBoard: Board
  displayBoard: Board
  initialBoard: Board
  boardHistory: CellHistory[]
  gameIsActive: boolean
  activeCell: Cell
  lockBoard: boolean
  lockedCoordinates: number[][] // WORKING HERE :: convert to Cell[]
}
