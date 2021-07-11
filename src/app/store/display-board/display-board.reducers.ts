import { createReducer, on } from '@ngrx/store'
import { difficultyEffectsSetDisplayBoard } from '../difficulty/difficulty.actions'

export const displayBoardReducer = createReducer(
  {},
  on(difficultyEffectsSetDisplayBoard, (_, { displayBoard }) => displayBoard)
)
