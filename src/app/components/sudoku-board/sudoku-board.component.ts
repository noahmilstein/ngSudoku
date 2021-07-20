import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs'
import { filter, first, startWith, withLatestFrom } from 'rxjs/operators'
import { selectActiveCell } from '../../store/active-cell/active-cell.selectors'
import { selectDifficulty } from '../../store/difficulty/difficulty.selectors'
import { selectDisplayBoard } from '../../store/display-board/display-board.selectors'
import { selectInitialBoard } from '../../store/initial-board/initial-board.selectors'
import { selectSolvedBoard } from '../../store/solved-board/solved-board.selectors'
import { AutoUnsubscribe } from '../../decorators/auto-unsubscribe'
import { CellHistory } from '../../models/cell-history.model'
import { Difficulty } from '../../models/difficulty.model'
import { Board } from '../../models/game.model'
import { DataService } from '../../services/data.service'
import { SudokuBuilderService } from '../../services/sudoku-builder.service'
import { AppStore } from '../../store/app-store.model'
import { selectGameIsActive } from '../../store/game-is-active/game-is-active.selectors'
import { sudokuBoardSetActiveCell } from './sudoku-board.actions'
import { Cell } from '../../models/cell.model'
import { selectLockedCoordinates } from '../../store/locked-coordinates/display-board.selectors'
import { selectBoardHistory } from '../../store/board-history/board-history.selectors'
import { selectLockBoard } from '../../store/lock-board/lock-board.selectors'
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
  lockedCoordinates$: Observable<number[][]> = this.store.select(selectLockedCoordinates)
  gameIsActive$ = this.store.select(selectGameIsActive)
  activeCell$ = this.store.select(selectActiveCell)
  runIsValueUsedCheck$ = this.store.select(selectBoardHistory)

  // WORKING HERE :: convert to ngrx
  hintedCoordinates$ = new BehaviorSubject<number[][]>([])
  restartGame$ = this.dataService.restartGame$.pipe(filter(Boolean))

  restartGameSubscription: Subscription
  hintsSubscription: Subscription

  constructor(
    private dataService: DataService,
    private store: Store<AppStore>
  ) {}

  ngOnInit(): void {
    // TODO :: decompose this logic into a cleaner format
    // WORKING HERE
    // this.restartGameSubscription = this.restartGame$.subscribe(_ => this.restartGame())
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

  // initBoardState(): void {
  //   // WORKING HERE
  //   this.boardHistory = []
  //   this.dataService.setLockedCoordinates(this.displayBoard)
  //   this.dataService.initActiveCell()
  //   this.hintedCoordinates$.next([]) // WORKING HERE :: left off at this point
  //   this.isValueUsedSource.next(0)
  // }

  activateCell(x: number, y: number): void {
    // WORKING HERE !!! utilize behavior subject
    // clickedCellSource
    // clickedCell$
    // .next
    // clickedCellSource.pipe(withLatestFrom(gameIsActive$))
    // this.store.dispatch(sudokuBoardSetActiveCell({ x, y }))
    // instead of...
    this.gameIsActive$.pipe(
      first(),
      withLatestFrom(this.store.select(selectLockBoard))
    )
    .subscribe(([gameIsActive, lockBoard]) => {
      if (gameIsActive && !lockBoard) {
        this.store.dispatch(sudokuBoardSetActiveCell({ x, y }))
      }
    })
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
