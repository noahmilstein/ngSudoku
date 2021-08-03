import { TestBed } from '@angular/core/testing'
import { mockDisplayBoard, mockSolvedBoard } from '../mock-data/mock-board'
import { Difficulty } from '../models/difficulty.model'
import { Game } from '../models/game.model'
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

  it('generateNewGame() should return a new Game', () => {
    const newGame = service.generateNewGame(Difficulty.Easy)
    expect(newGame instanceof Game).toBeTrue
  })

  it('createEmptyRow() should return an empty row', () => {
    const emptyRow = service.createEmptyRow(service.size)
    expect(emptyRow instanceof Array).toBeTrue
    expect(emptyRow.length).toEqual(service.size)
  })

  it('createBlankBoard() should return an empty board', () => {
    const emptyBoard = service.createBlankBoard(service.size)
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
    const emptyBoard = service.createBlankBoard(service.size)
    const preparedBoard = service.prepareNewBoard(emptyBoard)
    const emptyRow = service.createEmptyRow(service.size)

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

  it('isValueUsed() should check if value is used', () => {
    // initBoard: Board,
    // column: number,
    // row: number,
    // value: number
    // TRUE if value is used in SAME ROW
    // TRUE if value is used in SAME COLUMN
    // TRUE if value is used in SAME SUBGRID
    // WOKRING HERE
    // service.isValueUsed(mockSolvedBoard,)
  })

  //   isValueUsed(
  //   isValueInSubgrid(
  //   isValueInRow(initBoard: Board, row: number, value: number): boolean {
  //   isValueInColumn(initBoard: Board, column: number, value: number): boolean {
  //   solveBoard(initBoard: Board): Board {
})
