import { createAction, props } from '@ngrx/store'
import { CellHistory } from '../../models/cell-history.model'

export const sudokuBoardSetActiveCell = createAction(
  '[Sudoku Board] Set Active Cell',
  props<{ x: number, y: number }>()
)

export const sudokuBoardUpdateDisplayBoard = createAction(
  '[Sudoku Board] Update Display Board',
  props<{ x: number, y: number, key: number }>()
)

export const sudokuBoardUpdateBoardHistory = createAction(
  '[Sudoku Board] Update Board History',
  props<{ cellHistory: CellHistory }>()
)
