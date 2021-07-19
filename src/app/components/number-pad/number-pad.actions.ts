import { createAction, props } from '@ngrx/store'
import { CellHistory } from 'src/app/models/cell-history.model'

export const numberPadClickNumberPad = createAction(
  '[Number Pad] Click Number Pad',
  props<{ digit: number }>()
)

export const numberPadUpdateDisplayBoard = createAction(
  '[Number Pad] Update Display Board',
  props<{ x: number, y: number, digit: number }>()
)

export const numberPadUpdateBoardHistory = createAction(
  '[Number Pad] Update Board History',
  props<{ cellHistory: CellHistory }>()
)
// WORKING HERE :: THIS IS NEXT. You need a solution for the "is value used check" which is currently a pipe
// the solution is to have a "usedValues" array in the store
// which is UPDATED every time the cellHistory changes
// handle this in an effect
