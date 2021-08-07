import { createSelector } from '@ngrx/store'
import { selectGameIsSolved } from '../../store/game-is-solved/game-is-solved.selectors'
import { selectDifficulty } from '../../store/difficulty/difficulty.selectors'
import { selectGameIsActive } from '../../store/game-is-active/game-is-active.selectors'
import { selectInitialBoard } from '../../store/initial-board/initial-board.selectors'

export const selectGameFormRestartGameDependency = createSelector(
  selectGameIsActive,
  selectInitialBoard,
  (gameIsActive, initialBoard) => {
    return { gameIsActive, initialBoard }
  }
)

export const selectDifficultyFormChangeDependency = createSelector(
  selectGameIsSolved,
  selectDifficulty,
  (gameIsSolved, difficulty) => {
    return { gameIsSolved, diffState: difficulty }
  }
)
