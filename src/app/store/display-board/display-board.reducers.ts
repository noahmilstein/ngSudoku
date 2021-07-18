import { createReducer, on } from '@ngrx/store'
import { sudokuBoardUpdateDisplayBoard } from '../../components/sudoku-board/sudoku-board.actions'
import { Board } from '../../models/game.model'
import { difficultyEffectsSetDisplayBoard } from '../difficulty/difficulty.actions'

export const displayBoardReducer = createReducer(
  [] as Board,
  on(difficultyEffectsSetDisplayBoard, (_, { displayBoard }) => displayBoard),
  on(sudokuBoardUpdateDisplayBoard, (displayBoardState, { x, y, key }) => _onUpdateDisplayBoard(displayBoardState, x, y, key))
)

function _onUpdateDisplayBoard(displayBoardState: Board, x: number, y: number, key: number): Board {
  // WORKING HERE :: rewrite
  const updatedDisplayBoard = [...displayBoardState]
  const targetRow = [...updatedDisplayBoard[x]]
  targetRow.splice(y, 1, key)
  updatedDisplayBoard[x] = targetRow
  return updatedDisplayBoard
}
