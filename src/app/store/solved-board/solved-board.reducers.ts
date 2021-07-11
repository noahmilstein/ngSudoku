import { createReducer, on } from '@ngrx/store'
import { difficultyEffectsSetSolvedBoard } from '../difficulty/difficulty.actions'

export const solvedBoardReducer = createReducer(
  {},
  on(difficultyEffectsSetSolvedBoard, (_, { solvedBoard }) => solvedBoard)
)
