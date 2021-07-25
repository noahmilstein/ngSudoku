import { createAction, props } from '@ngrx/store'
import { CellHistory } from '../../models/cell-history.model'
import { Board } from '../../models/game.model'

export const difficultyEffectsSetSolvedBoard = createAction(
  '[Difficulty Effects] Set Solved Board',
  props<{ solvedBoard: Board }>()
)

export const difficultyEffectsSetDisplayBoard = createAction(
  '[Difficulty Effects] Set Display Board',
  props<{ displayBoard: Board }>()
)

export const difficultyEffectsSetInitialBoard = createAction(
  '[Difficulty Effects] Set Initial Board',
  props<{ initialBoard: Board }>()
)

export const difficultyEffectsSetBoardHistory = createAction(
  '[Difficulty Effects] Set Board History',
  props<{ boardHistory: CellHistory[] }>()
)

export const difficultyEffectsSetLockedCoordinates = createAction(
  '[Difficulty Effects] Set Locked Coordinates',
  props<{ lockedCoordinates: number[][] }>()
)

export const difficultyEffectsSetGameIsActive = createAction(
  '[Difficulty Effects] Set Game Is Active',
  props<{ gameIsActive: boolean }>()
)

export const difficultyEffectsResetHints = createAction(
  '[Difficulty Effects] Reset Hints'
)

export const difficultyEffectsSetGameIsSolved = createAction(
  '[Difficulty Effects] Set Game Is Solved',
  props<{ gameIsSolved: boolean }>()
)

