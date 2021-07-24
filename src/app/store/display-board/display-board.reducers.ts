import { createReducer, on } from '@ngrx/store'
import { gameFormResetDisplayBoard } from '../../components/game-form/game-form.actions'
import { gamePadUpdateDisplayBoard } from '../../components/game-pad/game-pad.actions'
import { numberPadUpdateDisplayBoard } from '../../components/number-pad/number-pad.actions'
import { Board } from '../../models/game.model'
import { difficultyEffectsSetDisplayBoard } from '../difficulty/difficulty.actions'

export const displayBoardReducer = createReducer(
  [] as Board,
  on(difficultyEffectsSetDisplayBoard, gameFormResetDisplayBoard, (_, { displayBoard }) => displayBoard),
  on(
    numberPadUpdateDisplayBoard,
    gamePadUpdateDisplayBoard,
    (displayBoardState, { x, y, digit }) =>
      _onUpdateDisplayBoard(displayBoardState, x, y, digit)
    )
)

function _onUpdateDisplayBoard(displayBoardState: Board, x: number, y: number, digit: number): Board {
  // WORKING HERE :: rewrite
  const updatedDisplayBoard = [...displayBoardState]
  const targetRow = [...updatedDisplayBoard[x]]
  targetRow.splice(y, 1, digit)
  updatedDisplayBoard[x] = targetRow
  return updatedDisplayBoard
}
