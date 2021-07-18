import { createReducer, on } from '@ngrx/store'
import { gamePadToggleGameIsActive } from '../../components/game-pad/game-pad.actions'
import { difficultyEffectsSetGameIsActive } from '../difficulty/difficulty.actions'

export const gameIsActiveReducer = createReducer(
  true,
  on(difficultyEffectsSetGameIsActive, (_, { gameIsActive }) => gameIsActive),
  on(gamePadToggleGameIsActive, (gameIsActiveState) => !gameIsActiveState),
)
