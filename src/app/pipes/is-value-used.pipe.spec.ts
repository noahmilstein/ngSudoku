import { TestBed } from '@angular/core/testing'
import {
  mockDisplayBoard,
  mockLockedCoordinates
} from '../mock-data/mock-board'
import { Cell } from '../models/cell.model'
import { DataService } from '../services/data.service'
import { IsValueUsedPipe } from './is-value-used.pipe'

describe('IsValueUsedPipe', () => {
  let pipe: IsValueUsedPipe
  const activeCellCoordinates = new Cell({ x: 0, y: 0 })

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DataService] })
    pipe = new IsValueUsedPipe(TestBed.inject(DataService))
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('pipe transform should check if value in used for SAME CELL', () => {
    expect(pipe.transform(true, activeCellCoordinates, 0, 0, mockDisplayBoard))
      .toBeTrue
  })

  it('pipe transform should check if value in used for RELATED CELL', () => {
    expect(pipe.transform(true, activeCellCoordinates, 0, 1, mockDisplayBoard))
      .toBeTrue
  })

  it('pipe transform should check if value in used for UNRELATED CELL', () => {
    expect(pipe.transform(true, activeCellCoordinates, 8, 8, mockDisplayBoard))
      .toBeFalse
  })

  it('pipe transform should check if value in used against LOCKED CELL', () => {
    const firstLockedCell = mockLockedCoordinates[0]
    const lockedActiveCell = new Cell({
      x: firstLockedCell[0],
      y: firstLockedCell[1]
    })
    expect(pipe.transform(true, lockedActiveCell, 1, 1, mockDisplayBoard))
      .toBeFalse
  })

  it('pipe transform should handle for null cell and null board', () => {
    expect(pipe.transform(true, null, 0, 0, null)).toBeFalse
  })
})
