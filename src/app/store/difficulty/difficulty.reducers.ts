import { createReducer, on } from '@ngrx/store'
import { gameFormSetDifficulty } from 'src/app/components/game-form/game-form.actions'
import { Difficulty } from '../../models/difficulty.model'

export const difficultyReducer = createReducer(
  Difficulty.Easy,
  on(gameFormSetDifficulty, (_, { difficulty }) => difficulty)
)
