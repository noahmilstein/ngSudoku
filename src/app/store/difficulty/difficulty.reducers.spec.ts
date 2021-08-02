import { gameFormSetDifficulty } from '../../components/game-form/game-form.actions'
import { Difficulty } from '../../models/difficulty.model'
import { difficultyReducer } from './difficulty.reducers'

describe('difficultyReducer', () => {
  it('should set difficulty in store', () => {
    const state = Difficulty.Easy
    const action = gameFormSetDifficulty({ difficulty: Difficulty.Medium })
    expect(difficultyReducer(state, action)).toEqual(Difficulty.Medium)
  })
})
