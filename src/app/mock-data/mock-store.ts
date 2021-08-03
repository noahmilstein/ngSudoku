import { Difficulty } from '../models/difficulty.model'
import { Cell } from '../models/cell.model'
import { AppStore } from '../store/app-store.model'
import {
  mockDisplayBoard,
  mockLockedCoordinates,
  mockSolvedBoard
} from './mock-board'

export const mockStoreBaseState: AppStore = {
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

export const mockStoreNewGameState: AppStore = {
  difficulty: Difficulty.Easy,
  solvedBoard: mockSolvedBoard,
  displayBoard: mockDisplayBoard,
  initialBoard: mockDisplayBoard,
  boardHistory: [],
  gameIsActive: true,
  gameIsSolved: false,
  activeCell: {} as Cell,
  lockBoard: false,
  lockedCoordinates: mockLockedCoordinates,
  hints: []
}
