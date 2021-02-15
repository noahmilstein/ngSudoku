import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { filter, first } from 'rxjs/operators'
import { CellHistory } from 'src/app/models/cell-history.model'
import { Difficulty } from 'src/app/models/difficulty.model'
import { Board } from 'src/app/models/game.model'
import { DataService } from 'src/app/services/data.service'
import { SudokuBuilderService } from 'src/app/services/sudoku-builder.service'
// tslint:disable: deprecation (https://github.com/ReactiveX/rxjs/issues/4159#issuecomment-466630791)

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss']
})
export class SudokuBoardComponent implements OnInit {
  solvedBoard: Board // board with game solution
  displayBoard: Board // clone of solvedBoard with values hidden to display to user
  initialBoardState: Board

  boardHistory: CellHistory[] = []

  activeCellSource = new BehaviorSubject<number[]>([])
  activeCell$ = this.activeCellSource.asObservable()

  runBoardCheckSource = new BehaviorSubject<number[]>([])
  runBoardCheck$ = this.runBoardCheckSource.asObservable()

  // WORKING HERE :: should this be observable?
  // isBoardValidSource = new BehaviorSubject<boolean>(true)
  // isBoardValid$ = this.isBoardValidSource.asObservable()
  isBoardValid = true

  activeCellFilter = (coordinates: number[]) => {
    const { x, y } = this.data.coordinates(coordinates)
    return coordinates.length > 0 && this.initialBoardState[x][y] === 0
  }

  constructor(private sudoku: SudokuBuilderService, private data: DataService) {}

  ngOnInit(): void {
    this.data.generateNewGame$.subscribe(diff => {
      if (diff) {
        this.generateNewGame(diff)
      }
    })
    this.data.restartGame$.subscribe(restart => {
      if (restart) {
        this.restartGame()
      }
    })

    this.data.keyPadClick$.subscribe(_ => {
      this.activeCell$.pipe(first()).subscribe(activeCell => {
        const { x, y } = this.data.coordinates(activeCell)
        this.runBoardCheckSource.next([x, y])
        const checkValue = this.displayBoard[x][y]
        this.isBoardValid = this.data.isBoardValid(this.displayBoard, checkValue, activeCell)
        // WORKING HERE :: if board is NOT valid then create a warning
        // prompting the user to fix their selected value BEFORE moving to the next cell
      })
    })

    this.data.keyPadClick$.pipe(filter(num => num !== 0)).subscribe(key => {
      this.activeCell$.pipe(first(), filter(this.activeCellFilter)).subscribe(activeCell => {
        // attempt to set active cell value with incoming key value
        const { x, y } = this.data.coordinates(activeCell)
        const beforeValue = this.displayBoard[x][y]
        this.displayBoard[x][y] = key

        if (key !== beforeValue) {
          const cellHistory = new CellHistory({
            coordinate: [x, y],
            before: beforeValue,
            after: key
          })
          this.boardHistory.push(cellHistory)
        }
      })
    })
  }

  initActiveCell(): void {
    this.activeCellSource.next([])
  }
  initBoardCheck(): void {
    this.runBoardCheckSource.next([])
  }

  initBoardState(): void {
    this.initActiveCell()
    this.initBoardCheck()
  }

  activateCell(rowIndex: number, columnIndex: number): void {
    if (this.isBoardValid) {
      this.activeCellSource.next([rowIndex, columnIndex])
    }
  }

  generateNewGame(difficulty: Difficulty): void {
    console.log('in new game block')
    const currentGame = this.sudoku.generateNewGame(difficulty)
    this.solvedBoard = currentGame.solvedBoard
    this.displayBoard = currentGame.displayBoard
    this.initialBoardState = JSON.parse(JSON.stringify(currentGame.displayBoard))
    this.initBoardState()
  }

  restartGame(): void {
    console.log('restart game')
    this.initBoardState()
  }
}
