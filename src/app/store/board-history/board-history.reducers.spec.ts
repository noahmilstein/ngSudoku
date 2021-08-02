import { gameFormResetBoardHistory } from '../../components/game-form/game-form.actions'
import { Cell } from '../../models/cell.model'
import {
  gamePadClearLastMoveBoardHistory,
  gamePadUndoLastBoardHistory
} from '../../components/game-pad/game-pad.actions'
import { numberPadUpdateBoardHistory } from '../../components/number-pad/number-pad.actions'
import { CellHistory } from '../../models/cell-history.model'
import { boardHistoryReducer } from './board-history.reducers'

describe('boardHistoryReducer', () => {
  const history = new CellHistory({
    coordinate: [0, 0],
    before: 1,
    after: 2
  })
  const state = [history]

  it('should update board history in store', () => {
    const payload = new CellHistory({
      coordinate: [0, 0],
      before: 1,
      after: 2
    })
    const action = numberPadUpdateBoardHistory({ cellHistory: payload })
    expect(boardHistoryReducer(state, action)).toEqual([...state, payload])
  })

  it('should undo last board history in store', () => {
    const action = gamePadUndoLastBoardHistory()
    expect(boardHistoryReducer(state, action)).toEqual([])
  })

  it('should create a CLEARED cell history instance of the prior move', () => {
    const activeCell = new Cell({ x: 0, y: 0 })
    const clearMove = new CellHistory({
      ...history,
      before: history.after,
      after: 0
    })
    const expected = [...state, clearMove]
    const action = gamePadClearLastMoveBoardHistory({ activeCell })
    expect(boardHistoryReducer(state, action)).toEqual(expected)
  })

  it('should reset board history to original state in store', () => {
    const action = gameFormResetBoardHistory()
    expect(boardHistoryReducer(state, action)).toEqual([])
  })
})
