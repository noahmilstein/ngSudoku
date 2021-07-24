import { createAction, props } from '@ngrx/store'
import { Board } from '../../models/game.model'
import { Difficulty } from '../../models/difficulty.model'

export const gameFormSetDifficulty = createAction(
  '[Game Form] Set Difficulty',
  props<{ difficulty: Difficulty }>()
)

export const gameFormCreateNewGame = createAction(
  '[Game Form] Create New Game',
  props<{ difficulty: Difficulty }>()
)

export const gameFormRestartGame = createAction(
  '[Game Form] Restart Game'
)

export const gameFormResetDisplayBoard = createAction(
  '[Game Form] Reset Display Board',
  props<{ displayBoard: Board }>()
)

export const gameFormResetHints = createAction(
  '[Game Form] Reset Hints'
)

export const gameFormResetLockedCoordinates = createAction(
  '[Game Form] Reset Locked Coordinates',
  props<{ lockedCoordinates: number[][] }>()
)

export const gameFormResetBoardHistory = createAction(
  '[Game Form] Reset Board History'
)
