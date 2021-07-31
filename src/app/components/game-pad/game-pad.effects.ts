import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { mergeMap, withLatestFrom } from 'rxjs/operators'
import { selectActiveCell } from '../../store/active-cell/active-cell.selectors'
import { Cell } from '../../models/cell.model'
import { SudokuBuilderService } from '../../services/sudoku-builder.service'
import { AppStore } from '../../store/app-store.model'
import {
  gamePadAppendLockedCoordinates,
  gamePadAppendUsedHints,
  gamePadClear,
  gamePadSetNewHint,
  gamePadUndo,
  gamePadUndoClearLastMoveBoardHistory,
  gamePadUndoLastBoardHistory,
  gamePadUnlockBoard,
  gamePadUpdateDisplayBoard
} from './game-pad.actions'
import { selectNumberPadHintDependency, selectNumberPadUndoDependency } from './game-pad.selectors'

@Injectable()
export class GamePadEffects {
  // TODO :: refactor this. This pattern may not be the best approach. Think it over.
  undo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamePadUndo),
      withLatestFrom(this.store.select(selectNumberPadUndoDependency)),
      mergeMap(([_, {gameIsActive, boardHistory}]) => {
        if (gameIsActive && boardHistory.length > 0) {
          const lastMove = boardHistory[boardHistory.length - 1]
          const { coordinate, before } = lastMove
          const x = coordinate[0]
          const y = coordinate[1]
          return [
            gamePadUpdateDisplayBoard({ x, y, digit: before }),
            gamePadUndoLastBoardHistory()
          ]
        } else {
          return []
        }
      })
    )
  )

  hint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamePadSetNewHint),
      withLatestFrom(this.store.select(selectNumberPadHintDependency)),
      mergeMap(([_, {hintsUsed, displayBoard, solvedBoard}]) => {
        const maxHints = 3
        if (hintsUsed.length >= maxHints) {
          return []
        } else {
          const emptyCoordinates = this.sudoku.getEmptyCoordinates(displayBoard)
          const randomElement = emptyCoordinates[Math.floor(Math.random() * emptyCoordinates.length)]
          const x = randomElement[0]
          const y = randomElement[1]
          const newHintValue = solvedBoard[x][y]
          return [
            gamePadAppendUsedHints({ hint: new Cell({ x, y }) }),
            gamePadUpdateDisplayBoard({ x, y, digit: newHintValue }),
            gamePadAppendLockedCoordinates({lockedCoordinate: [x, y]})
          ]
        }
      })
    )
  )

  erase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gamePadClear),
      withLatestFrom(this.store.select(selectActiveCell)),
      mergeMap(([_, activeCell]) => {
        const { x, y } = activeCell
        return [
          gamePadUpdateDisplayBoard({ x, y, digit: 0 }),
          gamePadUndoClearLastMoveBoardHistory({ activeCell }),
          gamePadUnlockBoard()
        ]
      })
    )
  )

  constructor(
    private actions$: Actions,
    private store: Store<AppStore>,
    private sudoku: SudokuBuilderService
  ) {}
}
