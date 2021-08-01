import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { mergeMap, withLatestFrom } from 'rxjs/operators'
import { DataService } from '@services/data.service'
import { gameFormSetDifficulty } from '@components/game-form/game-form.actions'
import { SudokuBuilderService } from '@services/sudoku-builder.service'
import { AppStore } from '../app-store.model'
import { selectGameIsActive } from '../game-is-active/game-is-active.selectors'
import {
  difficultyEffectsResetHints,
  difficultyEffectsSetBoardHistory,
  difficultyEffectsSetDisplayBoard,
  difficultyEffectsSetGameIsActive,
  difficultyEffectsSetGameIsSolved,
  difficultyEffectsSetInitialBoard,
  difficultyEffectsSetLockBoard,
  difficultyEffectsSetLockedCoordinates,
  difficultyEffectsSetSolvedBoard
} from './difficulty.actions'

@Injectable()
export class DifficultyEffects {
  setDifficulty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameFormSetDifficulty),
      withLatestFrom(this.store.select(selectGameIsActive)),
      mergeMap(([{ difficulty }, gameIsActiveState]) => {
        const { solvedBoard, displayBoard } =
          this.sudokuBuilder.generateNewGame(difficulty)
        const gameIsActive = !!gameIsActiveState ? gameIsActiveState : true
        const lockedCoordinates =
          this.dataService.getActiveCoordinates(displayBoard)
        return [
          difficultyEffectsSetSolvedBoard({ solvedBoard }),
          difficultyEffectsSetDisplayBoard({ displayBoard }),
          difficultyEffectsSetInitialBoard({ initialBoard: displayBoard }),
          difficultyEffectsSetLockedCoordinates({ lockedCoordinates }),
          difficultyEffectsSetBoardHistory({ boardHistory: [] }),
          difficultyEffectsSetGameIsActive({ gameIsActive }),
          difficultyEffectsResetHints(),
          difficultyEffectsSetGameIsSolved({ gameIsSolved: false }),
          difficultyEffectsSetLockBoard({ lockBoard: false })
        ]
      })
    )
  )

  constructor(
    private actions$: Actions,
    private store: Store<AppStore>,
    private sudokuBuilder: SudokuBuilderService,
    private dataService: DataService
  ) {}
}
