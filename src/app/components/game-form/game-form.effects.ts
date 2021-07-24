import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map } from 'rxjs/operators'
import { gameFormCreateNewGame, gameFormSetDifficulty } from './game-form.actions'

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

  constructor(
    private actions$: Actions
  ) {}
}
