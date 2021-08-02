import { gamePadAppendUsedHints } from '../../components/game-pad/game-pad.actions'
import { gameFormResetHints } from '../../components/game-form/game-form.actions'
import { Cell } from '../../models/cell.model'
import { difficultyEffectsResetHints } from '../difficulty/difficulty.actions'
import { hintsReducer } from './hints.reducers'

describe('hintsReducer', () => {
  const state = [new Cell({ x: 0, y: 0 })]
  it('should reset hints in store', () => {
    const gameFormAction = gameFormResetHints()
    const difficultyEffectsAction = difficultyEffectsResetHints()

    expect(hintsReducer(state, gameFormAction)).toEqual([])
    expect(hintsReducer(state, difficultyEffectsAction)).toEqual([])
  })

  it('should add hint to used hints array in store', () => {
    const hint = new Cell({ x: 1, y: 1 })
    const payload = { hint }
    const action = gamePadAppendUsedHints(payload)

    expect(hintsReducer(state, action)).toEqual([...state, hint])
  })
})
