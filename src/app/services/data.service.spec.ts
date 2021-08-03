import { TestBed } from '@angular/core/testing'
import {
  mockDisplayBoard,
  mockLockedCoordinates
} from '../mock-data/mock-board'
import { Cell } from '../models/cell.model'
import { DataService } from './data.service'

describe('GameService', () => {
  let service: DataService
  const activeCell = new Cell({ x: 0, y: 0 })

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DataService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('coordinates() should return a Coordinate', () => {
    expect(service.coordinates([0, 0])).toEqual({ x: 0, y: 0 })
  })

  it('isSharedSubgrid() should check if shared sub grip', () => {
    expect(service.isSharedSubgrid(0, 0, 1, 1)).toBeTrue
    expect(service.isSharedSubgrid(0, 0, 8, 8)).toBeFalse
  })

  it('isCellRelated() should check if cells are related', () => {
    expect(service.isCellRelated(activeCell, 1, 1)).toBeTrue
    expect(service.isCellRelated(activeCell, activeCell.x, activeCell.y))
      .toBeFalse
    expect(service.isCellRelated(activeCell, 8, 8)).toBeFalse
    expect(service.isCellRelated(null, 0, 0)).toBeFalse
  })

  it('getActiveCoordinates() should return all active coordinates of board', () => {
    expect(service.getActiveCoordinates(mockDisplayBoard)).toEqual(
      mockLockedCoordinates
    )
  })

  it('isCellValid() should check if cell is valid', () => {
    const checkValue = mockDisplayBoard[0][0]

    // TRUE if is RELATED CELL
    const relatedCellTuple = [activeCell.x + 1, activeCell.y + 1]
    expect(service.isCellValid(mockDisplayBoard, checkValue, relatedCellTuple))
      .toBeTrue

    // FALSE if is SAME CELL
    const activeCellTuple = [activeCell.x, activeCell.y]
    expect(service.isCellValid(mockDisplayBoard, checkValue, activeCellTuple))
      .toBeFalse

    // FALSE if is ALREADY USED CELL
    const usedCellTuple = [activeCell.x, activeCell.y + 1]
    const usedCheckValue = mockDisplayBoard[activeCell.x][activeCell.y + 1]
    expect(service.isCellValid(mockDisplayBoard, usedCheckValue, usedCellTuple))
      .toBeFalse
  })
})
