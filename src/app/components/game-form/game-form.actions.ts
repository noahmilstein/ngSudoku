import { createAction, props } from '@ngrx/store'
import { Difficulty } from '../../models/difficulty.model'

export const gameFormSetDifficulty = createAction(
  '[Game Form] Set Difficulty',
  props<{ difficulty: Difficulty }>()
)

export const gameFormCreateNewGame = createAction(
  '[Game Form] Create New Game',
  props<{ difficulty: Difficulty }>()
)
