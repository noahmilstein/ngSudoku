import { createSelector } from '@ngrx/store'
import { selectGameIsActive } from '@store/game-is-active/game-is-active.selectors'
import { selectInitialBoard } from '@store/initial-board/initial-board.selectors'

export const selectGameFormRestartGameDependency = createSelector(
  selectGameIsActive,
  selectInitialBoard,
  (gameIsActive, initialBoard) => {
    return { gameIsActive, initialBoard }
  }
)
