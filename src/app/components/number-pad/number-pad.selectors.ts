import { createSelector } from '@ngrx/store'
import { Cell } from '../../models/cell.model'
import { Board } from '../../models/game.model'
import { selectActiveCell } from '../../store/active-cell/active-cell.selectors'
import { selectDisplayBoard } from '../../store/display-board/display-board.selectors'
import { selectGameIsActive } from '../../store/game-is-active/game-is-active.selectors'
import { selectLockedCoordinates } from '../../store/locked-coordinates/display-board.selectors'
import { selectSolvedBoard } from '../../store/solved-board/solved-board.selectors'

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

export const selectIsGameSolved = createSelector(
  selectDisplayBoard,
  selectSolvedBoard,
  (displayBoard, solvedBoard): boolean => {
    return displayBoard.every((row, rowIndex) => {
      return row.every((digit, colIndex) => {
        return digit === solvedBoard[rowIndex][colIndex]
      })
    })
  }
)
