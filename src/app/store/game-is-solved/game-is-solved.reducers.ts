import { createReducer, on } from '@ngrx/store'
import { numberPadGameIsSolved } from '../../components/number-pad/number-pad.actions'
import { gameFormSetGameIsSolved } from '../../components/game-form/game-form.actions'
import { difficultyEffectsSetGameIsSolved } from '../difficulty/difficulty.actions'

export const gameIsSolvedReducer = createReducer(
  false,
  on(
    gameFormSetGameIsSolved,
    difficultyEffectsSetGameIsSolved,
    numberPadGameIsSolved,
    (_, { gameIsSolved }) => gameIsSolved
  )
)
