import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { mergeMap, withLatestFrom } from 'rxjs/operators'
import { AppStore } from '../../store/app-store.model'
import { gamePadUndo, gamePadUndoLastBoardHistory, gamePadUpdateDisplayBoard } from './game-pad.actions'
import { selectNumberPadUndoDependency } from './game-pad.selectors'

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

  constructor(
    private actions$: Actions,
    private store: Store<AppStore>
  ) {}
}
