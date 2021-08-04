import { Component, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { selectActiveCell } from '../../store/active-cell/active-cell.selectors'
import { selectDisplayBoard } from '../../store/display-board/display-board.selectors'
import { selectInitialBoard } from '../../store/initial-board/initial-board.selectors'
import { selectSolvedBoard } from '../../store/solved-board/solved-board.selectors'
import { AutoUnsubscribe } from '../../decorators/auto-unsubscribe'
import { Board } from '../../models/game.model'
import { AppStore } from '../../store/app-store.model'
import { selectGameIsActive } from '../../store/game-is-active/game-is-active.selectors'
import { sudokuBoardSetActiveCell } from './sudoku-board.actions'
import { selectLockedCoordinates } from '../../store/locked-coordinates/display-board.selectors'
import { selectHintsUsed } from '../../store/hints/hints.selectors'
import {
  selectDisableCell,
  selectRunIsValueUsedCheckDependency
} from './sudoku-board.selectors'

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss']
})
@AutoUnsubscribe()
export class SudokuBoardComponent implements OnDestroy {
  solvedBoard$: Observable<Board> = this.store.select(selectSolvedBoard)
  displayBoard$: Observable<Board> = this.store.select(selectDisplayBoard)
  initialBoardState$: Observable<Board> = this.store.select(selectInitialBoard)
  lockedCoordinates$: Observable<number[][]> = this.store.select(
    selectLockedCoordinates
  )
  gameIsActive$ = this.store.select(selectGameIsActive)
  disableCell$ = this.store.select(selectDisableCell)
  activeCell$ = this.store.select(selectActiveCell)
  runIsValueUsedCheck$ = this.store.select(selectRunIsValueUsedCheckDependency)
  hintedCoordinates$ = this.store.select(selectHintsUsed)

  constructor(private store: Store<AppStore>) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {}

  activateCell(x: number, y: number): void {
    this.store.dispatch(sudokuBoardSetActiveCell({ x, y }))
  }
}
