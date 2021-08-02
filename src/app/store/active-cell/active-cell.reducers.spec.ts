import { sudokuBoardSetActiveCell } from '../../components/sudoku-board/sudoku-board.actions'
import { activeCellReducer } from './active-cell.reducers'

describe('activeCellReducer', () => {
  it('should set active cell in store', () => {
    const payload = { x: 0, y: 0 }
    const action = sudokuBoardSetActiveCell(payload)
    expect(activeCellReducer(null, action)).toEqual(payload)
  })
})
