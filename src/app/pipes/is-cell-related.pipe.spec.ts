import { TestBed } from '@angular/core/testing'
import { Cell } from '../models/cell.model'
import { DataService } from '../services/data.service'
import { IsCellRelatedPipe } from './is-cell-related.pipe'

describe('IsCellRelatedPipe', () => {
  let pipe: IsCellRelatedPipe

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [DataService] })
    pipe = new IsCellRelatedPipe(TestBed.inject(DataService))
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })

  it('pipe transform should check if cell is related for SAME COLUMN', () => {
    const activeCellCoordinates = new Cell({ x: 0, y: 0 })
    expect(pipe.transform(activeCellCoordinates, 8, 0)).toBeTrue
  })

  it('pipe transform should check if cell is related for SAME ROW', () => {
    const activeCellCoordinates = new Cell({ x: 0, y: 0 })
    expect(pipe.transform(activeCellCoordinates, 0, 8)).toBeTrue
  })

  it('pipe transform should check if cell is related for SAME SUBGRID', () => {
    const activeCellCoordinates = new Cell({ x: 0, y: 0 })
    expect(pipe.transform(activeCellCoordinates, 1, 1)).toBeTrue
  })

  it('pipe transform should handle unrelated cells', () => {
    const activeCellCoordinates = new Cell({ x: 0, y: 0 })
    expect(pipe.transform(activeCellCoordinates, 8, 8)).toBeFalse
  })

  it('pipe transform should handle for null activeCellCoordinates', () => {
    expect(pipe.transform(null, 1, 1)).toBeFalse
  })
})
