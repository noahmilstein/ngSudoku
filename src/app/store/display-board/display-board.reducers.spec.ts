import { difficultyEffectsSetDisplayBoard } from '../difficulty/difficulty.actions'
import { displayBoardReducer } from './display-board.reducers'
import { mockDisplayBoard } from '../../mock-data/mock-board'
import { numberPadUpdateDisplayBoard } from '../../components/number-pad/number-pad.actions'
import { gamePadUpdateDisplayBoard } from '../../components/game-pad/game-pad.actions'

describe('displayBoardReducer', () => {
  it('should set display board in store', () => {
    const payload = { displayBoard: mockDisplayBoard }
    const difficultyEffectAction = difficultyEffectsSetDisplayBoard(payload)
    const gameFormResetAction = difficultyEffectsSetDisplayBoard(payload)
    const gameFormRevealAction = difficultyEffectsSetDisplayBoard(payload)

    expect(displayBoardReducer(null, difficultyEffectAction)).toEqual(
      mockDisplayBoard
    )
    expect(displayBoardReducer(null, gameFormResetAction)).toEqual(
      mockDisplayBoard
    )
    expect(displayBoardReducer(null, gameFormRevealAction)).toEqual(
      mockDisplayBoard
    )
  })

  it('should update display board in store', () => {
    const payload = { x: 0, y: 0, digit: 0 }
    const numberPadUpdateAction = numberPadUpdateDisplayBoard(payload)
    const gamePadUpdateAction = gamePadUpdateDisplayBoard(payload)
    const expected = [...mockDisplayBoard]
    expected[payload.x][payload.y] = payload.digit

    expect(
      displayBoardReducer(mockDisplayBoard, numberPadUpdateAction)
    ).toEqual(expected)
    expect(displayBoardReducer(mockDisplayBoard, gamePadUpdateAction)).toEqual(
      expected
    )
  })
})
