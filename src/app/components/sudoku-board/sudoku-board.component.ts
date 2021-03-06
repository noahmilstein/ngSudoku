import { Component, OnInit, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { AutoUnsubscribe } from 'src/app/decorators/auto-unsubscribe'
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
@AutoUnsubscribe()
export class SudokuBoardComponent implements OnInit, OnDestroy {
  maxHints = 3
  solvedBoard: Board // board with game solution
  displayBoard: Board // clone of solvedBoard with values hidden to display to user
  initialBoardState: Board
  boardHistory: CellHistory[] = []
  lockedCoordinates: number[][] = []
  hintedCoordinates$ = new BehaviorSubject<number[][]>([])

  restartGame$ = this.dataService.restartGame$.pipe(filter(Boolean))
  generateNewGame$ = this.dataService.generateNewGame$.pipe(filter(diff => diff > 0))
  undo$ = this.dataService.undo$
  gameIsActive$ = this.dataService.gameIsActive$
  keyPadClick$ = this.dataService.keyPadClick$
  activeCell$ = this.dataService.activeCell$
  activeCell: number[]

  isValueUsedSource = new BehaviorSubject<number>(0)
  isValueUsed$ = this.isValueUsedSource.asObservable()

  generateNewGameSubscription: Subscription
  restartGameSubscription: Subscription
  activeCellSubscription: Subscription
  lockedCoordinatesSubscription: Subscription
  undoSubscription: Subscription
  keyPadClickSubscription: Subscription
  hintsSubscription: Subscription

  activeCellFilter = (coordinates: number[]) => {
    const { x, y } = this.dataService.coordinates(coordinates)
    return coordinates.length > 0 && this.initialBoardState[x][y] === 0
  }

  constructor(private sudoku: SudokuBuilderService, private dataService: DataService) {}

  ngOnInit(): void {
    // TODO :: decompose this logic into a cleaner format
    this.generateNewGameSubscription = this.generateNewGame$.subscribe(diff => this.generateNewGame(diff))
    this.restartGameSubscription = this.restartGame$.subscribe(_ => this.restartGame())
    this.activeCellSubscription = this.activeCell$.subscribe(activeCell => this.activeCell = activeCell)
    this.lockedCoordinatesSubscription = this.dataService.lockedCoordinates$
      .subscribe(lockedCoordinates => this.lockedCoordinates = lockedCoordinates)
    this.undoSubscription = this.undo$.subscribe(undo => {
      if (undo && this.boardHistory.length > 0) {
        const { coordinate, before } = this.boardHistory[this.boardHistory.length - 1]
        const { x, y } = this.dataService.coordinates(coordinate)
        this.displayBoard[x][y] = before
        this.boardHistory.splice(-1, 1)
        this.isValueUsedSource.next(this.isValueUsedSource.getValue() + 1)

        // check valid cells to update invalid selection display
        const { x: activeX, y: activeY } = this.dataService.coordinates(this.activeCell)
        this.activateCell(activeX, activeY)
      }
    })
    this.keyPadClickSubscription = this.keyPadClick$.subscribe(key => {
      if (this.activeCell.length > 0 && !this.isCellLocked()) {
        const { x, y } = this.dataService.coordinates(this.activeCell)
        const prevValue = this.displayBoard[x][y]
        this.displayBoard[x][y] = key
        const history = new CellHistory({
          coordinate: [x, y],
          before: prevValue,
          after: key
        })
        this.boardHistory.push(history)
      }
      this.isValueUsedSource.next(this.isValueUsedSource.getValue() + 1)
    })
    this.hintsSubscription = this.dataService.hints$.pipe(filter(num => num > 0)).subscribe(hint => {
      if (hint <= this.maxHints) {
        const emptyCoordinates = this.sudoku.getEmptyCoordinates(this.displayBoard)
        const randomElement = emptyCoordinates[Math.floor(Math.random() * emptyCoordinates.length)]
        const { x, y } = this.dataService.coordinates(randomElement)
        const hintValue = this.solvedBoard[x][y]
        this.displayBoard[x][y] = hintValue
        const oldHints = this.hintedCoordinates$.getValue()
        const newHint = [x, y]
        this.lockedCoordinates.push(newHint)
        this.hintedCoordinates$.next([...oldHints, newHint])
        this.isValueUsedSource.next(this.isValueUsedSource.getValue() + 1)
      }
    })
  }

  ngOnDestroy(): void {}

  isCellLocked(): boolean {
    return this.lockedCoordinates.some(coord => {
      return coord.toString() === this.activeCell.toString()
    })
  }

  initBoardState(): void {
    this.boardHistory = []
    this.dataService.setLockedCoordinates(this.displayBoard)
    this.dataService.initActiveCell()
    this.hintedCoordinates$.next([])
    this.isValueUsedSource.next(0)
  }

  activateCell(x: number, y: number): void {
    this.dataService.setActiveCell(x, y, this.displayBoard)
  }

  generateNewGame(difficulty: Difficulty): void {
    const currentGame = this.sudoku.generateNewGame(difficulty)
    this.solvedBoard = currentGame.solvedBoard
    this.displayBoard = currentGame.displayBoard
    this.initialBoardState = JSON.parse(JSON.stringify(currentGame.displayBoard))
    this.initBoardState()
  }

  restartGame(): void {
    this.displayBoard = JSON.parse(JSON.stringify(this.initialBoardState))
    this.initBoardState()
  }
}
