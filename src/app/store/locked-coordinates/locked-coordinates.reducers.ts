import { createReducer, on } from '@ngrx/store'
import { gameFormResetLockedCoordinates } from '@components/game-form/game-form.actions'
import { gamePadAppendLockedCoordinates } from '@components/game-pad/game-pad.actions'
import { difficultyEffectsSetLockedCoordinates } from '../difficulty/difficulty.actions'

export const lockedCoordinatesReducer = createReducer(
  [] as number[][],
  on(
    difficultyEffectsSetLockedCoordinates,
    gameFormResetLockedCoordinates,
    (_, { lockedCoordinates }) => lockedCoordinates
  ),
  on(
    gamePadAppendLockedCoordinates,
    (lockedCoordinatesState, { lockedCoordinate }) => [
      ...lockedCoordinatesState,
      lockedCoordinate
    ]
  )
)
