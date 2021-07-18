import { createReducer, on } from '@ngrx/store'
import { Board } from '../../models/game.model'
import { difficultyEffectsSetDisplayBoard } from '../difficulty/difficulty.actions'

export const displayBoardReducer = createReducer(
  [] as Board,
  on(difficultyEffectsSetDisplayBoard, (_, { displayBoard }) => displayBoard)
)
