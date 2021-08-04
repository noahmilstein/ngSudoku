import { createSelector } from '@ngrx/store'
import { selectGameIsActive } from '../../store/game-is-active/game-is-active.selectors'
import { selectLockBoard } from '../../store/lock-board/lock-board.selectors'
import { selectBoardHistory } from '../../store/board-history/board-history.selectors'
import { selectHintsUsed } from '../../store/hints/hints.selectors'

export const selectRunIsValueUsedCheckDependency = createSelector(
  selectBoardHistory,
  selectHintsUsed,
  (_): boolean => {
    return true
  }
)

export const selectDisableCell = createSelector(
  selectGameIsActive,
  selectLockBoard,
  (gameIsActive, lockBoard): boolean => {
    return !gameIsActive || lockBoard
  }
)
