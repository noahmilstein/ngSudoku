import { TestBed } from '@angular/core/testing'
import { mockDisplayBoard, mockSolvedBoard } from '../mock-data/mock-board'
import { Difficulty } from '../models/difficulty.model'
import { Board, Game } from '../models/game.model'
import { SudokuBuilderService } from './sudoku-builder.service'

describe('SudokuService', () => {
  let service: SudokuBuilderService
  let emptyBoard: Board
  let preparedBoard: Board
  let emptyRow: number[]

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SudokuBuilderService)
    emptyBoard = service.createBlankBoard(service.size)
    preparedBoard = service.prepareNewBoard(emptyBoard)
    emptyRow = service.createEmptyRow(service.size)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('generateNewGame() should return a new Game', () => {
    const newGame = service.generateNewGame(Difficulty.Easy)
    expect(newGame instanceof Game).toBeTrue
  })

  it('createEmptyRow() should return an empty row', () => {
    expect(emptyRow instanceof Array).toBeTrue
    expect(emptyRow.length).toEqual(service.size)
  })

  it('createBlankBoard() should return an empty board', () => {
    expect(emptyBoard instanceof Array).toBeTrue
    expect(emptyBoard.length).toEqual(service.size)
    emptyBoard.forEach((row) => {
      expect(row.length).toEqual(service.size)
    })
  })

  it('getRandomNumber() should return a number', () => {
    expect(typeof service.getRandomNumber()).toEqual('number')
  })

  it('shuffleArray() should return a shuffled array', () => {
    const shuffled = service.shuffleArray(service.digits)
    expect(shuffled).not.toEqual(service.digits)
    expect(shuffled.length).toEqual(service.digits.length)
  })

  it('cloneBoard() should return a cloned Board', () => {
    const clone = service.cloneBoard(mockDisplayBoard)
    expect(clone).toEqual(mockDisplayBoard)
  })

  it('prepareNewBoard() should initialize an empty Board with a randomized first row', () => {
    preparedBoard.forEach((row, i) => {
      if (i === 0) {
        expect(row).not.toEqual(emptyRow)
      } else {
        expect(row.every((num) => num === 0)).toBeTrue
      }
    })
  })

  it('initializeGame() should return a displayBoard with hidden values', () => {
    const displayBoard = service.initializeGame(
      mockSolvedBoard,
      Difficulty.Easy
    )
    const revealedCoordinatesCount = [...displayBoard].reduce(
      (accRow, currRow) => {
        const revealedInRowCount = currRow.reduce((accNum, currNum) => {
          return currNum !== 0 ? accNum + 1 : accNum
        }, 0)
        return revealedInRowCount + accRow
      },
      0
    )
    expect(revealedCoordinatesCount).toEqual(Difficulty.Easy)
  })

  it('getEmptyCoordinates() should return all empty coordinates', () => {
    const emptyCoordinates = service.getEmptyCoordinates(mockDisplayBoard)
    const boardSize = service.size * service.size
    const expectedEmptyCoordinateCount = boardSize - Difficulty.Easy
    expect(emptyCoordinates.length).toEqual(expectedEmptyCoordinateCount)
  })

  it('isValueInSubgrid() should check if value is used in subgrid', () => {
    expect(service.isValueInSubgrid(preparedBoard, 0, 0, preparedBoard[0][8]))
      .toBeFalse
    expect(service.isValueInSubgrid(preparedBoard, 0, 0, preparedBoard[0][2]))
      .toBeTrue
  })

  it('isValueInRow() should check if value is used in subgrid', () => {
    expect(service.isValueInRow(preparedBoard, 0, 1)).toBeFalse
    expect(service.isValueInRow(preparedBoard, 1, 1)).toBeTrue
  })

  it('isValueInColumn() should check if value is used in subgrid', () => {
    const value = preparedBoard[0][0]
    expect(service.isValueInColumn(preparedBoard, 0, value)).toBeFalse
    expect(service.isValueInColumn(preparedBoard, 1, value)).toBeTrue
  })

  it('solveBoard() should solve prepared board', () => {
    const mockPreparedBoard = [...preparedBoard]
    mockPreparedBoard[0] = [...mockSolvedBoard[0]]
    expect(service.solveBoard(mockPreparedBoard)).toEqual(mockSolvedBoard)
  })
})
