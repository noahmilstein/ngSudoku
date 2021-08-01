import { createAction, props } from '@ngrx/store'

export const sudokuBoardSetActiveCell = createAction(
  '[Sudoku Board] Set Active Cell',
  props<{ x: number; y: number }>()
)
