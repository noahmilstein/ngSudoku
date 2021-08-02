import { createSelector } from '@ngrx/store'
import { selectBoardHistory } from '../../store/board-history/board-history.selectors'
import { selectHintsUsed } from '../../store/hints/hints.selectors'

export const selectRunIsValueUsedCheckDependency = createSelector(
  selectBoardHistory,
  selectHintsUsed,
  (_): boolean => {
    return true
  }
)
