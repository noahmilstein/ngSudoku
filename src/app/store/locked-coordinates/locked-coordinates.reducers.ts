import { createReducer, on } from '@ngrx/store'
import { difficultyEffectsSetLockedCoordinates } from '../difficulty/difficulty.actions'

export const lockedCoordinatesReducer = createReducer(
  {},
  on(difficultyEffectsSetLockedCoordinates, (_, { lockedCoordinates }) => lockedCoordinates)
)
