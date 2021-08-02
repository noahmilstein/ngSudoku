import { Difficulty } from '../models/difficulty.model'
import { Cell } from '../models/cell.model'
import { AppStore } from '../store/app-store.model'

export const mockAppBaseState: AppStore = {
  difficulty: Difficulty.Easy,
  solvedBoard: [],
  displayBoard: [],
  initialBoard: [],
  boardHistory: [],
  gameIsActive: false,
  gameIsSolved: false,
  activeCell: {} as Cell,
  lockBoard: false,
  lockedCoordinates: [],
  hints: []
}
