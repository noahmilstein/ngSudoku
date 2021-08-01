import { createReducer, on } from '@ngrx/store'
import { Board } from '@models/game.model'
import { difficultyEffectsSetSolvedBoard } from '../difficulty/difficulty.actions'

export const solvedBoardReducer = createReducer(
  [] as Board,
  on(difficultyEffectsSetSolvedBoard, (_, { solvedBoard }) => solvedBoard)
)
