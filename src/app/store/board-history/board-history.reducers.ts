import { createReducer, on } from '@ngrx/store'
import { gamePadUndoLastBoardHistory } from '../../components/game-pad/game-pad.actions'
import { numberPadUpdateBoardHistory } from '../../components/number-pad/number-pad.actions'
import { CellHistory } from '../../models/cell-history.model'

export const boardHistoryReducer = createReducer(
  [] as CellHistory[],
  on(numberPadUpdateBoardHistory, (boardHistory, { cellHistory }) => [...boardHistory, cellHistory]),
  on(gamePadUndoLastBoardHistory, (boardHistory) => _undoPreviousMove(boardHistory))
)

function _undoPreviousMove(boardHistory: CellHistory[]): CellHistory[] {
  const historyClone = [...boardHistory]
  historyClone.splice(-1, 1)
  return historyClone
}
