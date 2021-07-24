import { createAction, props } from '@ngrx/store'
import { Cell } from '../../models/cell.model'

export const gamePadToggleGameIsActive = createAction(
  '[Game Pad] Toggle Game Is Active'
)

export const gamePadUndo = createAction(
  '[Game Pad] Undo'
)

export const gamePadUpdateDisplayBoard = createAction(
  '[Game Pad] Update Display Board',
  props<{ x: number, y: number, digit: number }>()
)

export const gamePadUndoLastBoardHistory = createAction(
  '[Game Pad] Undo Last Board History'
)

export const gamePadUndoClearLastMoveBoardHistory = createAction(
  '[Game Pad] Clear Last Move Board History',
  props<{ activeCell: Cell }>()
)

export const gamePadSetNewHint = createAction(
  '[Game Pad] Set New Hint'
)

export const gamePadAppendLockedCoordinates = createAction(
  '[Game Pad] Append Locked Coordinates',
  props<{ lockedCoordinate: number[] }>()
)

export const gamePadAppendUsedHints = createAction(
  '[Game Pad] Append UsedHints',
  props<{ hint: Cell }>()
)

export const gamePadClear = createAction(
  '[Game Pad] Clear'
)
