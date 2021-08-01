import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { mergeMap, withLatestFrom } from 'rxjs/operators'
import { DataService } from '../../services/data.service'
import { CellHistory } from '../../models/cell-history.model'
import { AppStore } from '../../store/app-store.model'
import {
  numberPadClickNumberPad,
  numberPadLockBoard,
  numberPadUpdateBoardHistory,
  numberPadUpdateDisplayBoard
} from './number-pad.actions'
import { selectNumberPadClickDependency } from './number-pad.selectors'

@Injectable()
export class NumberPadEffects {
  // TODO :: refactor this. This pattern may not be the best approach. Think it over.
  clickNumberPad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(numberPadClickNumberPad),
      withLatestFrom(this.store.select(selectNumberPadClickDependency)),
      mergeMap(
        ([
          { digit },
          { gameIsActive, lockedCoordinates, cell, displayBoard }
        ]) => {
          const isCellLocked = (): boolean => {
            return (
              !gameIsActive ||
              lockedCoordinates.some((coord) => {
                const x1 = coord[0]
                const y1 = coord[1]
                const x2 = cell.x
                const y2 = cell.y
                return x1 === x2 && y1 === y2
              })
            )
          }
          if (cell && !isCellLocked()) {
            const { x, y } = cell
            const prevValue = displayBoard[x][y]
            const cellHistory = new CellHistory({
              coordinate: [x, y],
              before: prevValue,
              after: digit
            })
            // WORKING HERE :: move logic for lockBoard!!!
            const lockBoard = !this.data.isCellValid(displayBoard, digit, [
              x,
              y
            ])
            return [
              numberPadUpdateDisplayBoard({ x, y, digit }),
              numberPadUpdateBoardHistory({ cellHistory }),
              numberPadLockBoard({ lockBoard })
            ]
          } else {
            return []
          }
        }
      )
    )
  )

  constructor(
    private actions$: Actions,
    private store: Store<AppStore>,
    private data: DataService
  ) {}
}
