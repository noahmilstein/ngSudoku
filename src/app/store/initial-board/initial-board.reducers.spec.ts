import { mockDisplayBoard } from '../../mock-data/mock-board'
import { difficultyEffectsSetInitialBoard } from '../difficulty/difficulty.actions'
import { initialBoardReducer } from './initial-board.reducers'

describe('initialBoardReducer', () => {
  it('should set initialBoard in store', () => {
    const payload = { initialBoard: mockDisplayBoard }
    const action = difficultyEffectsSetInitialBoard(payload)

    expect(initialBoardReducer([], action)).toEqual(mockDisplayBoard)
  })
})
