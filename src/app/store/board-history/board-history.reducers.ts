import { createReducer, on } from '@ngrx/store'
import { numberPadUpdateBoardHistory } from '../../components/number-pad/number-pad.actions'
import { CellHistory } from '../../models/cell-history.model'

export const boardHistoryReducer = createReducer(
  [] as CellHistory[],
  on(numberPadUpdateBoardHistory, (boardHistory, { cellHistory }) => [...boardHistory, cellHistory]),
)
