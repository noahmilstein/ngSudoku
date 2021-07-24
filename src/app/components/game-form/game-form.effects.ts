import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, mergeMap, withLatestFrom } from 'rxjs/operators'
import { DataService } from '../../services/data.service'
import { AppStore } from '../../store/app-store.model'
import {
  gameFormCreateNewGame,
  gameFormResetBoardHistory,
  gameFormResetDisplayBoard,
  gameFormResetHints,
  gameFormResetLockedCoordinates,
  gameFormRestartGame,
  gameFormSetDifficulty
} from './game-form.actions'
import { selectGameFormRestartGameDependency } from './game-form.selectors'

@Injectable()
export class GameFormEffects {
  createNewGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameFormCreateNewGame),
      map(({ difficulty }) => {
        return gameFormSetDifficulty({ difficulty })
      })
    )
  )

  restartGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameFormRestartGame),
      withLatestFrom(this.store.select(selectGameFormRestartGameDependency)),
      mergeMap(([_, {gameIsActive, initialBoard}]) => {
        const lockedCoordinates = this.dataService.getActiveCoordinates(initialBoard)
        if (gameIsActive) {
          return [
            gameFormResetDisplayBoard({ displayBoard: initialBoard}),
            gameFormResetHints(),
            gameFormResetLockedCoordinates({lockedCoordinates}),
            gameFormResetBoardHistory()
          ]
        } else {
          return []
        }
      })
    )
  )

  constructor(
    private actions$: Actions,
    private store: Store<AppStore>,
    private dataService: DataService
  ) {}
}
