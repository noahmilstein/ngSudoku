import { createReducer, on } from '@ngrx/store'
import { gameFormSetGameIsSolved } from '../../components/game-form/game-form.actions'
import { difficultyEffectsSetGameIsSolved } from '../difficulty/difficulty.actions'

export const gameIsSolvedReducer = createReducer(
  false,
  on(gameFormSetGameIsSolved, difficultyEffectsSetGameIsSolved, (_, { gameIsSolved }) => gameIsSolved)
)
