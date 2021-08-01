import { TestBed } from '@angular/core/testing'
import { SudokuBuilderService } from './sudoku-builder.service'

describe('SudokuService', () => {
  let service: SudokuBuilderService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SudokuBuilderService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
