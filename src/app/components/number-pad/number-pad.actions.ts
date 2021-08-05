import { createAction, props } from '@ngrx/store'
import { CellHistory } from '../../models/cell-history.model'

export const numberPadClickNumberPad = createAction(
  '[Number Pad] Click Number Pad',
  props<{ digit: number }>()
)

export const numberPadUpdateDisplayBoard = createAction(
  '[Number Pad] Update Display Board',
  props<{ x: number; y: number; digit: number }>()
)

export const numberPadUpdateBoardHistory = createAction(
  '[Number Pad] Update Board History',
  props<{ cellHistory: CellHistory }>()
)

export const numberPadLockBoard = createAction(
  '[Number Pad] Lock Board',
  props<{ lockBoard: boolean }>()
)

export const numberPadGameIsSolved = createAction(
  '[Number Pad] Game Is Solved',
  props<{ gameIsSolved: boolean }>()
)
