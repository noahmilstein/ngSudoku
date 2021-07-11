import { createAction, props } from '@ngrx/store'
import { Board } from 'src/app/models/game.model'

export const difficultyEffectsSetSolvedBoard = createAction(
  '[Difficulty Effects] Set Solved Board',
  props<{ solvedBoard: Board}>()
)

export const difficultyEffectsSetDisplayBoard = createAction(
  '[Difficulty Effects] Set Display Board',
  props<{ displayBoard: Board}>()
)
