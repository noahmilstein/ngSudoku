import { Component, OnInit } from '@angular/core'
import { BehaviorSubject, combineLatest, forkJoin, Subject, zip } from 'rxjs'
import { filter, first, map } from 'rxjs/operators'
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
  // lockedCoordinates: number[][]

  boardHistory: CellHistory[] = []

  activeCell$ = this.dataService.activeCell$
  activeCell: number[] = []
  // activeCellValue: number
  // isCellValid$ = this.dataService.isCellValid$

  // runBoardCheckSource = new BehaviorSubject<number[]>([])
  // runBoardCheck$ = this.runBoardCheckSource.asObservable()

  // WORKING HERE :: should this be observable?
  // isBoardValidSource = new BehaviorSubject<boolean>(true)
  // isBoardValid$ = this.isBoardValidSource.asObservable()
  // isBoardValid = true

  // private cellClicked$ = new Subject<{ x: number, y: number }>()

  activeCellFilter = (coordinates: number[]) => {
    const { x, y } = this.dataService.coordinates(coordinates)
    return coordinates.length > 0 && this.initialBoardState[x][y] === 0
  }

  constructor(private sudoku: SudokuBuilderService, private dataService: DataService) {}

  ngOnInit(): void {
    this.activeCell$.subscribe(activeCell => {
      this.activeCell = activeCell
      // const { x, y } = this.dataService.coordinates(activeCell)
      // this.activeCellValue = this.displayBoard[x][y]
    })
    this.dataService.generateNewGame$.subscribe(diff => {
      if (diff) {
        this.generateNewGame(diff)
      }
    })
    this.dataService.restartGame$.subscribe(restart => {
      if (restart) {
        this.restartGame()
      }
    })
    this.dataService.keyPadClick$.subscribe(key => {
      if (this.activeCell.length > 0) {
        const { x, y } = this.dataService.coordinates(this.activeCell)
        this.displayBoard[x][y] = key
      }
    })
    // WORKING HERE :: high light invalid cells on bad key selection

    // listen to key pad interactions
    // listen to active cell changes

    // // WORKING HERE :: combine this subscriptions to be more DRY
    // this.dataService.keyPadClick$.subscribe(_ => {
    //   this.activeCell$.pipe(first()).subscribe(activeCell => {
    //     const { x, y } = this.dataService.coordinates(activeCell)
    //     this.runBoardCheckSource.next([x, y])
    //     const checkValue = this.displayBoard[x][y]
    //     this.isBoardValid = this.dataService.isBoardValid(this.displayBoard, checkValue, activeCell)
    //     // WORKING HERE :: if board is NOT valid then create a warning
    //     // prompting the user to fix their selected value BEFORE moving to the next cell
    //   })
    // })

    // this.dataService.keyPadClick$.pipe(filter(num => num !== 0)).subscribe(key => {
    //   this.activeCell$.pipe(first(), filter(this.activeCellFilter)).subscribe(activeCell => {
    //     // attempt to set active cell value with incoming key value
    //     const { x, y } = this.dataService.coordinates(activeCell)
    //     const beforeValue = this.displayBoard[x][y]
    //     this.displayBoard[x][y] = key
    //     if (key !== beforeValue) {
    //       const cellHistory = new CellHistory({
    //         coordinate: [x, y],
    //         before: beforeValue,
    //         after: key
    //       })
    //       this.boardHistory.push(cellHistory)
    //     }
    //   })
    // })
  }

  initActiveCell(): void {
    this.dataService.initActiveCell()
  }

  initBoardCheck(): void {
    // this.data.service.runBoardCheckSource.next([])
  }

  initBoardState(): void {
    this.initActiveCell()
    this.initBoardCheck()
    this.dataService.setLockedCoordinates(this.displayBoard)
  }

  activateCell(x: number, y: number): void {
    this.dataService.setActiveCell(x, y, this.displayBoard)
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
