import { Injectable } from '@angular/core'
import { Difficulty } from '../models/difficulty.model'
import { Board, Game } from '../models/game.model'

@Injectable({
  providedIn: 'root'
})
export class SudokuBuilderService {
  size = 9
  digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  generateNewGame(diff: Difficulty): Game {
    const initBoard = this.prepareNewBoard(this.createBlankBoard(this.size))
    const solvedBoard = this.solveBoard(initBoard)
    const displayBoard = this.initializeGame(solvedBoard, diff)
    return new Game({solvedBoard, displayBoard})
  }

  createEmptyRow(size: number): number[] {
    return Array.from(Array(size).keys())
  }

  createBlankBoard(size: number): Board {
    return this.createEmptyRow(size).map(_ => this.createEmptyRow(size).map(__ => 0))
  }

  getRandomNumber(): number {
    return Math.floor((Math.random() * 9))
  }

  shuffleArray(array: number[]): number[] {
    return array.sort((_: number, __: number) => 0.5 - Math.random())
  }

  cloneBoard(multiArr: Board): Board {
    return JSON.parse(JSON.stringify(multiArr))
  }

  prepareNewBoard(emptyBoard: Board): Board {
    const cloneBoard = this.cloneBoard(emptyBoard)
    const firstRow = this.shuffleArray(this.digits)
    const shuffledBoard = cloneBoard.map((row, index) => {
      if (!index) {
        return firstRow
      } else {
        return row
      }
    })
    return shuffledBoard
  }

  initializeGame(solvedBoard: Board, difficulty: Difficulty): Board {
    // hide values of solved board from user
    // difficulty === number of DISPLAYED CELLS
    const displayBoard = this.cloneBoard(solvedBoard)
    const cellsToHide = this.size * this.size - difficulty
    const hiddenCoordinates: [number[]] = [[]]
    hiddenCoordinates.pop()
    while (hiddenCoordinates.length < cellsToHide) {
      const randomX = this.getRandomNumber()
      const randomY = this.getRandomNumber()
      const randomCoordinate = [randomX, randomY]

      if (displayBoard[randomX][randomY] && !hiddenCoordinates.includes(randomCoordinate)) {
        hiddenCoordinates.push(randomCoordinate)
        displayBoard[randomX][randomY] = 0
      }
    }
    return displayBoard
  }

  getEmptyCoordinates(initBoard: Board): number[][] {
    // NOTE :: return an array of COORDINATES/tuples, NOT rows
    // should be all coordinates in rows 2-9 (index 0-8)
    // unless fed in a partially filled / non-default board
    const emptyCoordinates: number[][] = []
    initBoard.forEach((row, rowIndex) => {
      row.forEach((_, columnIndex) => {
        if (initBoard[rowIndex][columnIndex] === 0) {
          emptyCoordinates.push([rowIndex, columnIndex])
        }
      })
    })
    return emptyCoordinates
  }

  isValueUsed(initBoard: Board, column: number, row: number, value: number): boolean {
    return (this.isValueInRow(initBoard, row, value) ||
      this.isValueInColumn(initBoard, column, value) ||
      this.isValueInSubgrid(initBoard, column, row, value))
  }

  isValueInSubgrid(initBoard: Board, column: number, row: number, value: number): boolean {
    let columnCorner = 0
    let rowCorner = 0
    const subGridSize = 3

    // find the left-most column
    while (column >= columnCorner + subGridSize) {
      columnCorner += subGridSize
    }
    // find the upper-most row
    while (row >= rowCorner + subGridSize) {
      rowCorner += subGridSize
    }
    // iterate through each row within the bounds of this subgrid
    for (let i = rowCorner; i < rowCorner + subGridSize; i++) {
      // iterate through each column within the bounds of this subgrid
      for (let j = columnCorner; j < columnCorner + subGridSize; j++) {
        // return true if a match is found within the bounds of this subgrid
        if (initBoard[i][j] === value) {
          return true
        }
      }
    }
    // If no match was found within the bounds of this subgrid, return false
    return false
  }

  isValueInRow(initBoard: Board, row: number, value: number): boolean {
    // if given row contains the target value /
    // return true (already used in row) /
    // else return false (not yet used in row)
    return initBoard[row].includes(value)
  }

  isValueInColumn(initBoard: Board, column: number, value: number): boolean {
    // if given column contains target value /
    // return true (already used in column) /
    // else return false (not yet used in column)
    return this.cloneBoard(initBoard).map(row => row[column]).includes(value)
  }

  solveBoard(initBoard: Board): Board {
    const solvedBoard = this.cloneBoard(initBoard)
    const emptyCoordinates = this.getEmptyCoordinates(solvedBoard) // array of numerical tuples
    for (let i = 0; i < emptyCoordinates.length;) {
      const row = emptyCoordinates[i][0] // first element of tuple is the row/x-coordinate
      const column = emptyCoordinates[i][1] // second element of tuple is the column/y-coordinate
      let value = solvedBoard[row][column] + 1
      // + 1 because this is a hidden value, meaning it must be 0 on the first iteration
      let alreadyUsed = false
      while (!alreadyUsed && value <= this.size) {
        if (!this.isValueUsed(solvedBoard, column, row, value)) {
          // if value is VALID and NOT USED in (row, column, subgrid)
          alreadyUsed = true
          solvedBoard[row][column] = value
          i++
        }
        // else value is invalid/already used in (row, column, subgrid), try next value
        else {
          value++
        }
      }

      if (!alreadyUsed) {
        // if NOT used and beyond the size of the board, then a mistake was made
        // BACKTRACK to previous empty coordinate and try again
        solvedBoard[row][column] = 0 // reset the board value at the latest coordinate
        i--
      }
    }
    return solvedBoard
  }
}
