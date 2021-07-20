import { createSelector } from '@ngrx/store'
import { selectBoardHistory } from '../../store/board-history/board-history.selectors'
import { selectGameIsActive } from '../../store/game-is-active/game-is-active.selectors'

export const selectNumberPadUndoDependency = createSelector(
  selectGameIsActive,
  selectBoardHistory,
  (gameIsActive, boardHistory) => {
    return { gameIsActive, boardHistory }
  }
)
