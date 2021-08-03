import { Cell } from '../models/cell.model'
import { IsValueHintedPipe } from './is-value-hinted.pipe'

describe('IsValueHintedPipe', () => {
  const pipe = new IsValueHintedPipe()
  const hintedCoordinates = [new Cell({ x: 0, y: 0 })]

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('pipe transform should check if value in hinted', () => {
    expect(pipe.transform(hintedCoordinates, 0, 0)).toBeTrue
    expect(pipe.transform(hintedCoordinates, 1, 1)).toBeFalse
  })

  it('pipe transform should handle for null hints array', () => {
    expect(pipe.transform(null, 1, 1)).toBeFalse
  })
})
