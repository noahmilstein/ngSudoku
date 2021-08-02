import { gamePadUnlockBoard } from '../../components/game-pad/game-pad.actions'
import { numberPadLockBoard } from '../../components/number-pad/number-pad.actions'
import { difficultyEffectsSetLockBoard } from '../difficulty/difficulty.actions'
import { lockBoardReducer } from './lock-board.reducers'

describe('lockBoardReducer', () => {
  it('should set lockBoard in store', () => {
    const payload = { lockBoard: true }
    const numberPadAction = numberPadLockBoard(payload)
    const difficultyEffectsAction = difficultyEffectsSetLockBoard(payload)

    expect(lockBoardReducer(false, numberPadAction)).toEqual(true)
    expect(lockBoardReducer(false, difficultyEffectsAction)).toEqual(true)
  })
  it('should reset lockBoard to base false state in store', () => {
    const action = gamePadUnlockBoard()

    expect(lockBoardReducer(true, action)).toEqual(false)
  })
})
