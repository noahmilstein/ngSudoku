import { gameFormSetGameIsSolved } from '../../components/game-form/game-form.actions'
import { difficultyEffectsSetGameIsSolved } from '../difficulty/difficulty.actions'
import { gameIsSolvedReducer } from './game-is-solved.reducers'

describe('gameIsSolvedReducer', () => {
  it('should set gameIsSolved in store', () => {
    const payload = { gameIsSolved: true }
    const gameFormAction = gameFormSetGameIsSolved(payload)
    const difficultyEffectsAction = difficultyEffectsSetGameIsSolved(payload)

    expect(gameIsSolvedReducer(false, gameFormAction)).toEqual(true)
    expect(gameIsSolvedReducer(false, difficultyEffectsAction)).toEqual(true)
  })
})
