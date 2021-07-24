import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { filter, first, withLatestFrom } from 'rxjs/operators'
import { selectActiveCell } from '../../store/active-cell/active-cell.selectors'
import { selectDisplayBoard } from '../../store/display-board/display-board.selectors'
import { selectInitialBoard } from '../../store/initial-board/initial-board.selectors'
import { selectSolvedBoard } from '../../store/solved-board/solved-board.selectors'
import { AutoUnsubscribe } from '../../decorators/auto-unsubscribe'
import { Board } from '../../models/game.model'
import { DataService } from '../../services/data.service'
import { AppStore } from '../../store/app-store.model'
import { selectGameIsActive } from '../../store/game-is-active/game-is-active.selectors'
import { sudokuBoardSetActiveCell } from './sudoku-board.actions'
import { selectLockedCoordinates } from '../../store/locked-coordinates/display-board.selectors'
import { selectLockBoard } from '../../store/lock-board/lock-board.selectors'
import { selectHintsUsed } from '../../store/hints/hints.selectors'
import { selectRunIsValueUsedCheckDependency } from './sudoku-board.selectors'
// tslint:disable: deprecation (https://github.com/ReactiveX/rxjs/issues/4159#issuecomment-466630791)

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss']
})
@AutoUnsubscribe()
export class SudokuBoardComponent implements OnInit, OnDestroy {
  solvedBoard$: Observable<Board> = this.store.select(selectSolvedBoard)
  displayBoard$: Observable<Board> = this.store.select(selectDisplayBoard)
  initialBoardState$: Observable<Board> = this.store.select(selectInitialBoard)
  lockedCoordinates$: Observable<number[][]> = this.store.select(selectLockedCoordinates)
  gameIsActive$ = this.store.select(selectGameIsActive)
  activeCell$ = this.store.select(selectActiveCell)
  runIsValueUsedCheck$ = this.store.select(selectRunIsValueUsedCheckDependency)
  hintedCoordinates$ = this.store.select(selectHintsUsed)

  // WORKING HERE :: convert to ngrx
  restartGame$ = this.dataService.restartGame$.pipe(filter(Boolean))

  restartGameSubscription: Subscription

  constructor(
    private dataService: DataService,
    private store: Store<AppStore>
  ) {}

  ngOnInit(): void {
    // TODO :: decompose this logic into a cleaner format
    // WORKING HERE
    // this.restartGameSubscription = this.restartGame$.subscribe(_ => this.restartGame())
  }

  ngOnDestroy(): void {}

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

  // restartGame(): void {
  //   this.displayBoard = JSON.parse(JSON.stringify(this.initialBoardState))
  //   this.initBoardState()
  // }
}
