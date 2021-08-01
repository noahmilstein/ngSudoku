import { createReducer, on } from '@ngrx/store'
import { Board } from '@models/game.model'
import { difficultyEffectsSetInitialBoard } from '../difficulty/difficulty.actions'

export const initialBoardReducer = createReducer(
  [] as Board,
  on(difficultyEffectsSetInitialBoard, (_, { initialBoard }) => initialBoard)
)
