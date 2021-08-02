import { createReducer, on } from '@ngrx/store'
import { Cell } from '../../models/cell.model'
import { sudokuBoardSetActiveCell } from '../../components/sudoku-board/sudoku-board.actions'

export const activeCellReducer = createReducer(
  null as Cell,
  on(sudokuBoardSetActiveCell, (_, { x, y }) => new Cell({ x, y }))
)
