import { Cell } from '../models/cell.model'
import { IsCellActivePipe } from './is-cell-active.pipe'

describe('IsCellActivePipe', () => {
  const pipe = new IsCellActivePipe()

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('pipe transform should check if cell is active', () => {
    const activeCellCoordinates = new Cell({ x: 0, y: 0 })
    expect(pipe.transform(activeCellCoordinates, 0, 0)).toBeTrue

    const inactiveCellCoordinates = new Cell({ x: 1, y: 0 })
    expect(pipe.transform(inactiveCellCoordinates, 0, 0)).toBeFalse
  })

  it('pipe transform should handle for null coordinates', () => {
    expect(pipe.transform(null, 0, 0)).toBeFalse
  })
})
