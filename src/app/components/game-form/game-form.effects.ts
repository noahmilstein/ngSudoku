import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, mergeMap, withLatestFrom } from 'rxjs/operators'
import { selectSolvedBoard } from '../../store/solved-board/solved-board.selectors'
import { DataService } from '../../services/data.service'
import { AppStore } from '../../store/app-store.model'
import {
  gameFormSolveBoard,
  gameFormCreateNewGame,
  gameFormSetGameIsSolved,
  gameFormResetBoardHistory,
  gameFormResetDisplayBoard,
  gameFormResetHints,
  gameFormResetLockedCoordinates,
  gameFormRestartGame,
  gameFormRevealSolvedBoard,
  gameFormSetDifficulty,
  gameFormSetGameIsActive
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
            gameFormResetBoardHistory(),
            gameFormSetGameIsSolved({gameIsSolved: false})
          ]
        } else {
          return []
        }
      })
    )
  )

  solveBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameFormSolveBoard),
      withLatestFrom(this.store.select(selectSolvedBoard)),
      mergeMap(([_, solvedBoard]) => {
        const lockedCoordinates = this.dataService.getActiveCoordinates(solvedBoard)
        return [
          gameFormRevealSolvedBoard({ displayBoard: solvedBoard }),
          gameFormSetGameIsActive({ gameIsActive: true }),
          gameFormResetLockedCoordinates({ lockedCoordinates })
        ]
      })
    )
  )

  revealSolvedBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameFormRevealSolvedBoard),
      map(() => {
        return gameFormSetGameIsSolved({ gameIsSolved: true })
      })
    )
  )


  constructor(
    private actions$: Actions,
    private store: Store<AppStore>,
    private dataService: DataService
  ) {}
}
