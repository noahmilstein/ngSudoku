import { createReducer, on } from '@ngrx/store'
import { sudokuBoardSetActiveCell } from '../../components/sudoku-board/sudoku-board.actions'

export const activeCellReducer = createReducer(
  null,
  on(sudokuBoardSetActiveCell, (_, { x, y }) => ({ x, y }))
)
