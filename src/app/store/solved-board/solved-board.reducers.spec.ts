import { mockSolvedBoard } from '../../mock-data/mock-board'
import { difficultyEffectsSetSolvedBoard } from '../difficulty/difficulty.actions'
import { solvedBoardReducer } from './solved-board.reducers'

describe('solvedBoardReducer', () => {
  it('should set solvedBoard in store', () => {
    const payload = { solvedBoard: mockSolvedBoard }
    const action = difficultyEffectsSetSolvedBoard(payload)

    expect(solvedBoardReducer([], action)).toEqual(mockSolvedBoard)
  })
})
