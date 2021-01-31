import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { difficulties, Difficulty } from './models/difficulty.model'

type Board = number[][]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngSudoku'
  size = 9
  digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  difficultyLevels = difficulties
  difficultyEnum = Difficulty

  emptyBoard: Board // initial empty board for new game instance
  solvedBoard: Board // board with game solution
  displayBoard: Board // clone of solvedBoard with values hidden to display to user

  boardForm = this.fb.group({
    difficulty: [Difficulty.Easy, Validators.required]
  })

  get difficultyControl(): FormControl {
    return this.boardForm.get('difficulty') as FormControl
  }

  constructor(private fb: FormBuilder) {}

  // TODO
  // create form for user UX/UI
  // write alternate algorithm
  ngOnInit(): void {
    this.prepareNewBoard()
    this.solveBoard()
    this.initializeGame(Difficulty.Easy)
    console.log('solved', this.solvedBoard)
    console.log('display', this.displayBoard)
  }

  prepareNewBoard(): void {
    this.emptyBoard = this.createBlankBoard()
    this.solvedBoard = this.cloneBoard(this.emptyBoard)
    const firstRow = this.shuffleArray(this.digits)
    this.solvedBoard[0] = firstRow // initialize first valid row
  }

  shuffleArray(array: number[]): number[] {
    return array.sort((_: number, __: number) => 0.5 - Math.random())
  }

  cloneBoard(multiArr: Board): Board {
    return JSON.parse(JSON.stringify(multiArr))
  }

  getRandomNumber(): number {
    return Math.floor((Math.random() * 9))
  }

  createEmptyRow(size: number): number[] {
    return Array.from(Array(size).keys())
  }

  createBlankBoard(): Board {
    return this.createEmptyRow(this.size).map(_ => this.createEmptyRow(this.size).map(__ => 0))
  }

  initializeGame(difficulty: Difficulty): void {
    this.displayBoard = this.cloneBoard(this.solvedBoard)
    // hide values of solved board from user
    let count = 0
    const hiddenCoordinates: [number[]] = [[]]
    while (count < difficulty) {
      const randomX = this.getRandomNumber()
      const randomY = this.getRandomNumber()
      const randomCoordinate = [randomX, randomY]
      if (!hiddenCoordinates.includes(randomCoordinate)) {
        hiddenCoordinates.push(randomCoordinate)
        this.displayBoard[randomX][randomY] = 0
        count += 1
      }
    }
  }

  getEmptyCoordinates(): number[][] {
    // NOTE :: return an array of COORDINATES/tuples, NOT rows
    // should be all coordinates in rows 2-9 (index 0-8)
    // unless fed in a partially filled / non-default board
    const emptyCoordinates: number[][] = []
    this.solvedBoard.forEach((row, rowIndex) => {
      row.forEach((_, columnIndex) => {
        if (this.solvedBoard[rowIndex][columnIndex] === 0) {
          emptyCoordinates.push([rowIndex, columnIndex])
        }
      })
    })
    return emptyCoordinates
  }

  isValueUsed(column: number, row: number, value: number): boolean {
    return (this.isValueInRow(row, value) ||
      this.isValueInColumn(column, value) ||
      this.isValueInSubgrid(column, row, value))
  }

  isValueInSubgrid(column: number, row: number, value: number): boolean {
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
        if (this.solvedBoard[i][j] === value) {
          return true
        }
      }
    }
    // If no match was found within the bounds of this subgrid, return false
    return false
  }

  isValueInRow(row: number, value: number): boolean {
    // if given row contains the target value /
    // return true (already used in row) /
    // else return false (not yet used in row)
    return this.solvedBoard[row].includes(value)
  }

  isValueInColumn(column: number, value: number): boolean {
    // if given column contains target value /
    // return true (already used in column) /
    // else return false (not yet used in column)
    return this.solvedBoard.every(row => row[column] === value)
  }

  solveBoard(): void {
    const emptyCoordinates = this.getEmptyCoordinates() // array of numerical tuples
    for (let i = 0; i < emptyCoordinates.length;) {
      const row = emptyCoordinates[i][0] // first element of tuple is the row/x-coordinate
      const column = emptyCoordinates[i][1] // second element of tuple is the column/y-coordinate
      let value = this.solvedBoard[row][column] + 1
      // + 1 because this is a hidden value, meaning it must be 0 on the first iteration
      let alreadyUsed = false
      while (!alreadyUsed && value <= this.size) {
        if (!this.isValueUsed(column, row, value)) {
          // if value is VALID and NOT USED in (row, column, subgrid)
          alreadyUsed = true
          this.solvedBoard[row][column] = value
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
        this.solvedBoard[row][column] = 0 // reset the board value at the latest coordinate
        i--
      }
    }
  }
}
