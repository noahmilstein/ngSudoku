import { createReducer, on } from '@ngrx/store'
import { gamePadAppendLockedCoordinates } from '../../components/game-pad/game-pad.actions'
import { difficultyEffectsSetLockedCoordinates } from '../difficulty/difficulty.actions'

export const lockedCoordinatesReducer = createReducer(
  [] as number[][],
  on(difficultyEffectsSetLockedCoordinates, (_, { lockedCoordinates }) => lockedCoordinates),
  on(gamePadAppendLockedCoordinates, (lockedCoordinatesState, { lockedCoordinate }) => [...lockedCoordinatesState, lockedCoordinate])
)
