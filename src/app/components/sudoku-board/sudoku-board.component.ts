import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { BehaviorSubject, Observable, Subscription } from 'rxjs'
import { filter, startWith } from 'rxjs/operators'
import { selectActiveCell } from 'src/app/store/active-cell/active-cell.selectors'
import { selectDifficulty } from 'src/app/store/difficulty/difficulty.selectors'
import { selectDisplayBoard } from 'src/app/store/display-board/display-board.selectors'
import { selectInitialBoard } from 'src/app/store/initial-board/initial-board.selectors'
import { selectSolvedBoard } from 'src/app/store/solved-board/solved-board.selectors'
import { AutoUnsubscribe } from '../../decorators/auto-unsubscribe'
import { CellHistory } from '../../models/cell-history.model'
import { Difficulty } from '../../models/difficulty.model'
import { Board } from '../../models/game.model'
import { DataService } from '../../services/data.service'
import { SudokuBuilderService } from '../../services/sudoku-builder.service'
import { AppStore } from '../../store/app-store.model'
import { selectGameIsActive } from '../../store/game-is-active/game-is-active.selectors'
import { sudokuBoardSetActiveCell } from './sudoku-board.actions'
// tslint:disable: deprecation (https://github.com/ReactiveX/rxjs/issues/4159#issuecomment-466630791)

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss']
})
@AutoUnsubscribe()
export class SudokuBoardComponent implements OnInit, OnDestroy {
  maxHints = 3

  solvedBoard$: Observable<Board> = this.store.select(selectSolvedBoard)
  displayBoard$: Observable<Board> = this.store.select(selectDisplayBoard)
  initialBoardState$: Observable<Board> = this.store.select(selectInitialBoard)

  boardHistory: CellHistory[] = []
  lockedCoordinates: number[][] = []
  hintedCoordinates$ = new BehaviorSubject<number[][]>([])

  restartGame$ = this.dataService.restartGame$.pipe(filter(Boolean))
  generateNewGame$ = this.dataService.generateNewGame$.pipe(filter(diff => diff > 0))
  undo$ = this.dataService.undo$
  gameIsActive$ = this.store.select(selectGameIsActive)

  keyPadClick$ = this.dataService.keyPadClick$
  activeCell$ = this.store.select(selectActiveCell)

  isValueUsedSource = new BehaviorSubject<number>(0)
  isValueUsed$ = this.isValueUsedSource.asObservable()

  generateNewGameSubscription: Subscription
  restartGameSubscription: Subscription
  activeCellSubscription: Subscription
  lockedCoordinatesSubscription: Subscription
  undoSubscription: Subscription
  keyPadClickSubscription: Subscription
  hintsSubscription: Subscription

  difficultySubscription: Subscription

  // activeCellFilter = (coordinates: number[]) => {
  //   const { x, y } = this.dataService.coordinates(coordinates)
  //   return coordinates.length > 0 && this.initialBoardState[x][y] === 0
  // }

  constructor(private sudoku: SudokuBuilderService, private dataService: DataService, private store: Store<AppStore>) {}

  ngOnInit(): void {
    // TODO :: decompose this logic into a cleaner format
    // WORKING HERE
    // this.restartGameSubscription = this.restartGame$.subscribe(_ => this.restartGame())
    this.lockedCoordinatesSubscription = this.dataService.lockedCoordinates$
      .subscribe(lockedCoordinates => this.lockedCoordinates = lockedCoordinates)
    // this.undoSubscription = this.undo$.subscribe(undo => {
    //   if (undo && this.boardHistory.length > 0) {
    //     const { coordinate, before } = this.boardHistory[this.boardHistory.length - 1]
    //     const { x, y } = this.dataService.coordinates(coordinate)
    //     this.displayBoard[x][y] = before
    //     this.boardHistory.splice(-1, 1)
    //     this.isValueUsedSource.next(this.isValueUsedSource.getValue() + 1)

    //     // check valid cells to update invalid selection display
    //     const { x: activeX, y: activeY } = this.dataService.coordinates(this.activeCell)
    //     this.activateCell(activeX, activeY)
    //   }
    // })
    // this.keyPadClickSubscription = this.keyPadClick$.subscribe(key => {
    //   if (this.activeCell.length > 0 && !this.isCellLocked()) {
    //     const { x, y } = this.dataService.coordinates(this.activeCell)
    //     const prevValue = this.displayBoard[x][y]
    //     this.displayBoard[x][y] = key
    //     const history = new CellHistory({
    //       coordinate: [x, y],
    //       before: prevValue,
    //       after: key
    //     })
    //     this.boardHistory.push(history)
    //   }
    //   this.isValueUsedSource.next(this.isValueUsedSource.getValue() + 1)
    // })
    // this.hintsSubscription = this.dataService.hints$.pipe(filter(num => num > 0)).subscribe(hint => {
    //   if (hint <= this.maxHints) {
    //     const emptyCoordinates = this.sudoku.getEmptyCoordinates(this.displayBoard)
    //     const randomElement = emptyCoordinates[Math.floor(Math.random() * emptyCoordinates.length)]
    //     const { x, y } = this.dataService.coordinates(randomElement)
    //     const hintValue = this.solvedBoard[x][y]
    //     this.displayBoard[x][y] = hintValue
    //     const oldHints = this.hintedCoordinates$.getValue()
    //     const newHint = [x, y]
    //     this.lockedCoordinates.push(newHint)
    //     this.hintedCoordinates$.next([...oldHints, newHint])
    //     this.isValueUsedSource.next(this.isValueUsedSource.getValue() + 1)
    //   }
    // })
  }

  ngOnDestroy(): void {}

  // isCellLocked(): boolean {
  //   return this.lockedCoordinates.some(coord => {
  //     return coord.toString() === this.activeCell.toString()
  //   })
  // }

  // initBoardState(): void {
  //   // WORKING HERE
  //   this.boardHistory = []
  //   this.dataService.setLockedCoordinates(this.displayBoard)
  //   this.dataService.initActiveCell()
  //   this.hintedCoordinates$.next([]) // WORKING HERE :: left off at this point
  //   this.isValueUsedSource.next(0)
  // }

  activateCell(x: number, y: number): void {
    this.store.dispatch(sudokuBoardSetActiveCell({ x, y }))
  }

  // generateNewGame(difficulty: Difficulty): void {
  //   // WORKING HERE
  //   const currentGame = this.sudoku.generateNewGame(difficulty)
  //   this.solvedBoard = currentGame.solvedBoard
  //   this.displayBoard = currentGame.displayBoard
  //   this.initialBoardState = JSON.parse(JSON.stringify(currentGame.displayBoard))
  //   this.initBoardState()
  // }

  // restartGame(): void {
  //   this.displayBoard = JSON.parse(JSON.stringify(this.initialBoardState))
  //   this.initBoardState()
  // }
}
