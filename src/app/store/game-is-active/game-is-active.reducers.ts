import { createReducer, on } from '@ngrx/store'
import { gameFormSetGameIsActive } from '../../components/game-form/game-form.actions'
import { gamePadToggleGameIsActive } from '../../components/game-pad/game-pad.actions'
import { difficultyEffectsSetGameIsActive } from '../difficulty/difficulty.actions'

export const gameIsActiveReducer = createReducer(
  true,
  on(difficultyEffectsSetGameIsActive, gameFormSetGameIsActive, (_, { gameIsActive }) => gameIsActive),
  on(gamePadToggleGameIsActive, (gameIsActiveState) => !gameIsActiveState),
)
