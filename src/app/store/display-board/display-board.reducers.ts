import { createReducer, on } from '@ngrx/store'
import { numberPadUpdateDisplayBoard } from 'src/app/components/number-pad/number-pad.actions'
import { Board } from '../../models/game.model'
import { difficultyEffectsSetDisplayBoard } from '../difficulty/difficulty.actions'

export const displayBoardReducer = createReducer(
  [] as Board,
  on(difficultyEffectsSetDisplayBoard, (_, { displayBoard }) => displayBoard),
  on(numberPadUpdateDisplayBoard, (displayBoardState, { x, y, digit }) => _onUpdateDisplayBoard(displayBoardState, x, y, digit))
)

function _onUpdateDisplayBoard(displayBoardState: Board, x: number, y: number, digit: number): Board {
  // WORKING HERE :: rewrite
  const updatedDisplayBoard = [...displayBoardState]
  const targetRow = [...updatedDisplayBoard[x]]
  targetRow.splice(y, 1, digit)
  updatedDisplayBoard[x] = targetRow
  return updatedDisplayBoard
}
