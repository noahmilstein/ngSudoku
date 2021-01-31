import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { ReplaySubject, Subject } from 'rxjs'
import { CellHistory } from './models/cell-history.model'
import { difficulties, Difficulty } from './models/difficulty.model'
// tslint:disable: deprecation (https://github.com/ReactiveX/rxjs/issues/4159#issuecomment-466630791)

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

  emptyBoard: Board = this.createBlankBoard() // initial empty board for new game instance
  solvedBoard: Board // board with game solution
  displayBoard: Board // clone of solvedBoard with values hidden to display to user

  boardHistory: CellHistory[]
  // number of move
  // coordinate of move
  // before value
  // after value

  activeCell$: Subject<[number, number]>

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
    this.generateNewGame(Difficulty.Easy)
    // TODO :: set to class attribute Subscription objects and create @AutoUnsubscribe() decorator
    this.difficultyControl.valueChanges.subscribe({
      next: (diff: Difficulty) => {
        console.log(diff)
        this.generateNewGame(diff)
      },
      error: err => console.log(err)
    })

    this.activeCell$.subscribe({
      next: (cellCoordinates) => {
        console.log(cellCoordinates)
      }
    })
  }

  generateNewGame(diff: Difficulty): void {
    this.activeCell$ = new ReplaySubject<[number, number]>()
    const initBoard = this.prepareNewBoard(this.emptyBoard)
    this.solvedBoard = this.solveBoard(initBoard)
    this.displayBoard = this.initializeGame(this.solvedBoard, diff)
    console.log('solved', this.solvedBoard)
    console.log('display', this.displayBoard)
  }

  resetGame(): void {
    // develop AFTER creating game history for undo/erase
    // clear history back to first state of history/move array
    console.log('handle reset game here')
  }

  prepareNewBoard(emptyBoard: Board): Board {
    const cloneBoard = this.cloneBoard(emptyBoard)
    const firstRow = this.shuffleArray(this.digits)
    cloneBoard.map((row, index) => {
      if (!index) {
        return firstRow
      } else {
        return row
      }
    })
    return cloneBoard
  }

  activateCell(rowIndex: number, columnIndex: number): void {
    this.activeCell$.next([rowIndex, columnIndex])
    // WORKING HERE
    // handle cell click
    // BE CERTAIN to handle all clicking outside of cell
    // create a number pad for the user to click on
    // listen to keyboard actions to fill active cell with clicked numerical key is/when pressed
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
    return initBoard.every(row => row[column] === value)
  }

  solveBoard(initBoard: Board): Board {
    const emptyCoordinates = this.getEmptyCoordinates(initBoard) // array of numerical tuples
    for (let i = 0; i < emptyCoordinates.length;) {
      const row = emptyCoordinates[i][0] // first element of tuple is the row/x-coordinate
      const column = emptyCoordinates[i][1] // second element of tuple is the column/y-coordinate
      let value = initBoard[row][column] + 1
      // + 1 because this is a hidden value, meaning it must be 0 on the first iteration
      let alreadyUsed = false
      while (!alreadyUsed && value <= this.size) {
        if (!this.isValueUsed(initBoard, column, row, value)) {
          // if value is VALID and NOT USED in (row, column, subgrid)
          alreadyUsed = true
          initBoard[row][column] = value
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
        initBoard[row][column] = 0 // reset the board value at the latest coordinate
        i--
      }
    }
    return initBoard
  }
}
