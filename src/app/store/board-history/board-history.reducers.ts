import { createReducer, on } from '@ngrx/store'
import { Cell } from '../../models/cell.model'
import { gamePadUndoClearLastMoveBoardHistory, gamePadUndoLastBoardHistory } from '../../components/game-pad/game-pad.actions'
import { numberPadUpdateBoardHistory } from '../../components/number-pad/number-pad.actions'
import { CellHistory } from '../../models/cell-history.model'
import { gameFormResetBoardHistory } from '../../components/game-form/game-form.actions'

export const boardHistoryReducer = createReducer(
  [] as CellHistory[],
  on(numberPadUpdateBoardHistory, (boardHistory, { cellHistory }) => [...boardHistory, cellHistory]),
  on(gamePadUndoLastBoardHistory, (boardHistory) => _undoPreviousMove(boardHistory)),
  on(gamePadUndoClearLastMoveBoardHistory, (boardHistory, { activeCell }) => _clearPreviousMove(boardHistory, activeCell)),
  on(gameFormResetBoardHistory, (_) => [])
)

function _undoPreviousMove(boardHistory: CellHistory[]): CellHistory[] {
  const historyClone = [...boardHistory]
  historyClone.splice(-1, 1)
  return historyClone
}

function _clearPreviousMove(boardHistory: CellHistory[], activeCell: Cell): CellHistory[] {
  const hasPriorMove = boardHistory[boardHistory.length - 1]?.after
  const clearMove = new CellHistory({
    coordinate: [activeCell.x, activeCell.y],
    before: boardHistory[boardHistory.length - 1]?.after,
    after: 0
  })
  return hasPriorMove ? [...boardHistory, clearMove] : boardHistory
}
