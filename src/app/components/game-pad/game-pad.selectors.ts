import { createSelector } from '@ngrx/store'
import { selectDisplayBoard } from '../../store/display-board/display-board.selectors'
import { selectHintsUsed } from '../../store/hints/hints.selectors'
import { selectSolvedBoard } from '../../store/solved-board/solved-board.selectors'
import { selectBoardHistory } from '../../store/board-history/board-history.selectors'
import { selectGameIsActive } from '../../store/game-is-active/game-is-active.selectors'

export const selectNumberPadUndoDependency = createSelector(
  selectGameIsActive,
  selectBoardHistory,
  (gameIsActive, boardHistory) => {
    return { gameIsActive, boardHistory }
  }
)

export const selectNumberPadHintDependency = createSelector(
  selectHintsUsed,
  selectDisplayBoard,
  selectSolvedBoard,
  (hintsUsed, displayBoard, solvedBoard) => {
    return { hintsUsed, displayBoard, solvedBoard }
  }
)
