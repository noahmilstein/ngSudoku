import { gamePadAppendLockedCoordinates } from '../../components/game-pad/game-pad.actions'
import { gameFormResetLockedCoordinates } from '../../components/game-form/game-form.actions'
import { difficultyEffectsSetLockedCoordinates } from '../difficulty/difficulty.actions'
import { lockedCoordinatesReducer } from './locked-coordinates.reducers'

describe('lockedCoordinatesReducer', () => {
  const lockedCoordinates = [
    [0, 0],
    [1, 1]
  ]
  it('should set lockedCoordinates in store', () => {
    const payload = { lockedCoordinates }
    const numberPadAction = difficultyEffectsSetLockedCoordinates(payload)
    const difficultyEffectsAction = gameFormResetLockedCoordinates(payload)

    expect(lockedCoordinatesReducer([], numberPadAction)).toEqual(
      lockedCoordinates
    )
    expect(lockedCoordinatesReducer([], difficultyEffectsAction)).toEqual(
      lockedCoordinates
    )
  })

  it('should append to lockedCoordinates array in store', () => {
    const lockedCoordinate = [2, 2]
    const payload = { lockedCoordinate }
    const action = gamePadAppendLockedCoordinates(payload)

    expect(lockedCoordinatesReducer(lockedCoordinates, action)).toEqual([
      ...lockedCoordinates,
      lockedCoordinate
    ])
  })
})
