import { Component, OnInit } from '@angular/core'

type Board = number[][]

enum Difficulty {
  Easy = 38,
  Medium = 30,
  Hard = 25,
  Expert = 23
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngSudoku'
  size = 9
  digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  emptyBoard: Board = this.createBlankBoard() // initial board for new game instance
  solvedBoard: Board = this.cloneBoard(this.emptyBoard) // board with game solution
  displayBoard: Board // clone of solvedBoard with hidden values to display to user

  constructor() {}

  ngOnInit(): void {
    const firstRow = this.shuffleArray(this.digits)
    this.solvedBoard[0] = firstRow

    const emptypositions = this.saveEmptyPositions(this.solvedBoard)
    this.solvePuzzle(this.solvedBoard, emptypositions)

    this.displayBoard = this.cloneBoard(this.solvedBoard)
    this.initializeGame(this.displayBoard, Difficulty.Easy)
    console.log('solved', this.solvedBoard)
    console.log('display', this.displayBoard)
  }

  shuffleArray(array: number[]): number[] {
    const randomizeFilter = (_: number, __: number) => 0.5 - Math.random()
    return array.sort(randomizeFilter)
}

  getRandomNumber(): number {
    return Math.floor((Math.random() * 9))
  }

  createEmptyRow(size: number): number[] {
    return Array.from(Array(size).keys())
  }

  createBlankBoard(): Board {
    const blankBoard = this.createEmptyRow(this.size).map(_ => this.createEmptyRow(this.size).map(__ => 0))
    return blankBoard
  }

  initializeGame(board: Board, difficulty: Difficulty): void {
    let count = 0
    const hiddenCoordinates: [number[]] = [[]]
    while (count < difficulty) {
      const randomX = this.getRandomNumber()
      const randomY = this.getRandomNumber()
      const randomCoordinate = [randomX, randomY]
      if (!hiddenCoordinates.includes(randomCoordinate)) {
        hiddenCoordinates.push(randomCoordinate)
        board[randomX][randomY] = 0
        count += 1
      }
    }
    this.displayBoard = board
  }

  cloneBoard(multiArr: Board): Board {
    return JSON.parse(JSON.stringify(multiArr))
  }

  saveEmptyPositions(board: Board): Board {
    // should be all coordinates in rows 2-9 (index 0-8)
    // unless fed in a partially filled / non-default board
    const emptyPositions: Board = []
    board.forEach((row: number[], rowIndex: number) => {
      row.forEach((_: number, columnIndex: number) => {
        if (board[rowIndex][columnIndex] === 0) {
          emptyPositions.push([rowIndex, columnIndex])
        }
      })
    })
    return emptyPositions
  }

  isValueInRow(board: Board, row: number, value: number): boolean {
    // if given row contains the target value return true, else return false
    return board[row].includes(value)
  }

  isValueInColumn(board: Board, column: number, value: number): boolean {
    // if given column contains target value return true, else return false
    return board.every(row => {
      return row[column] === value
    })
  }

  isValueInSubgrid(board: Board, column: number, row: number, value: number): boolean {
    // Initial grid coordinates: (0, 0), dimension: 3 units
    let columnCorner = 0
    let rowCorner = 0
    const squareSize = 3

    // Find the left-most column
    while (column >= columnCorner + squareSize) {
      columnCorner += squareSize
    }

    // Find the upper-most row
    while (row >= rowCorner + squareSize) {
      rowCorner += squareSize
    }

    // Iterate through each row
    for (let i = rowCorner; i < rowCorner + squareSize; i++) {
      // Iterate through each column
      for (let j = columnCorner; j < columnCorner + squareSize; j++) {
        // Return true if a match is found
        if (board[i][j] === value) {
          return true
        }
      }
    }
    // If no match was found, return false
    return false
  }

  isValueUsed(board: Board, column: number, row: number, value: number): boolean {
    return (this.isValueInRow(board, row, value) ||
      this.isValueInColumn(board, column, value) ||
      this.isValueInSubgrid(board, column, row, value))
  }

  solvePuzzle(board: Board, emptyPositions: Board): void {
    // Variables to track our position in the solver
    let i: number
    let row: number
    let column: number
    let value: number
    let found: boolean
    for (i = 0; i < emptyPositions.length;) {
      row = emptyPositions[i][0]
      column = emptyPositions[i][1]
      // Try the next value
      value = board[row][column] + 1
      // Was a valid number found?
      found = false
      // Keep trying new values until either the board limit
      // was reached or a valid value was found
      while (!found && value <= this.size) {
        // If a valid value is found, mark found true,
        // set the position to the value, and move to the
        // next position
        if (!this.isValueUsed(board, column, row, value)) {
          found = true
          board[row][column] = value
          i++
        }
        // Otherwise, try the next value
        else {
          value++
        }
      }
      // If no valid value was found and the limit was
      // reached, move back to the previous position
      if (!found) {
        board[row][column] = 0
        i--
      }
    }

    // return the solution
    this.solvedBoard = board
  }
}
