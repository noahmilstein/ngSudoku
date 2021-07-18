import { createReducer, on } from '@ngrx/store'
import { CellHistory } from '../../models/cell-history.model'
import { sudokuBoardUpdateBoardHistory } from '../../components/sudoku-board/sudoku-board.actions'

export const boardHistoryReducer = createReducer(
  [] as CellHistory[],
  on(sudokuBoardUpdateBoardHistory, (boardHistory, { cellHistory }) => [...boardHistory, cellHistory]),
)
