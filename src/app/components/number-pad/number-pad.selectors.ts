import { createSelector } from '@ngrx/store'
import { Cell } from '../../models/cell.model'
import { Board } from '../../models/game.model'
import { selectActiveCell } from '../../store/active-cell/active-cell.selectors'
import { selectDisplayBoard } from '../../store/display-board/display-board.selectors'
import { selectGameIsActive } from '../../store/game-is-active/game-is-active.selectors'
import { selectLockedCoordinates } from '../../store/locked-coordinates/display-board.selectors'

export class NumberPadClickDependency {
  gameIsActive: boolean
  lockedCoordinates: number[][]
  cell: Cell
  displayBoard: Board
}

export const selectNumberPadClickDependency = createSelector(
  selectGameIsActive,
  selectLockedCoordinates,
  selectActiveCell,
  selectDisplayBoard,
  (
    gameIsActive,
    lockedCoordinates,
    cell,
    displayBoard
  ): NumberPadClickDependency => {
    return { gameIsActive, lockedCoordinates, cell, displayBoard }
  }
)
