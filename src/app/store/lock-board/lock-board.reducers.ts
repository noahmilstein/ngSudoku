import { createReducer, on } from '@ngrx/store'
import { gamePadUnlockBoard } from '../../components/game-pad/game-pad.actions'
import { numberPadLockBoard } from '../../components/number-pad/number-pad.actions'

export const lockBoardReducer = createReducer(
  false,
  on(numberPadLockBoard, (_, { lockBoard }) => lockBoard),
  on(gamePadUnlockBoard, (_) => false)
)
