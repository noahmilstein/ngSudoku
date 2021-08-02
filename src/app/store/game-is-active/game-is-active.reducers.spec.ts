import { gamePadToggleGameIsActive } from '../../components/game-pad/game-pad.actions'
import { gameFormSetGameIsActive } from '../../components/game-form/game-form.actions'
import { difficultyEffectsSetGameIsActive } from '../difficulty/difficulty.actions'
import { gameIsActiveReducer } from './game-is-active.reducers'

describe('gameIsActiveReducer', () => {
  it('should update gameIsActive in store', () => {
    const payload = { gameIsActive: true }
    const difficultyEffectAction = difficultyEffectsSetGameIsActive(payload)
    const gameFormAction = gameFormSetGameIsActive(payload)
    expect(gameIsActiveReducer(false, difficultyEffectAction)).toEqual(true)
    expect(gameIsActiveReducer(false, gameFormAction)).toEqual(true)
  })

  it('should toggle gameIsActive in store', () => {
    const action = gamePadToggleGameIsActive()
    expect(gameIsActiveReducer(true, action)).toEqual(false)
  })
})
