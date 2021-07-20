import { createReducer, on } from '@ngrx/store'
import { numberPadLockBoard } from '../../components/number-pad/number-pad.actions'

export const lockBoardReducer = createReducer(
  false,
  on(numberPadLockBoard, (_, { lockBoard }) => lockBoard)
)
