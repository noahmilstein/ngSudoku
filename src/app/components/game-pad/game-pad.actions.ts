import { createAction, props } from '@ngrx/store'

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
