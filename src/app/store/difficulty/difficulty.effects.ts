import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { mergeMap } from 'rxjs/operators'
import { gameFormSetDifficulty } from '../../components/game-form/game-form.actions'
import { SudokuBuilderService } from '../../services/sudoku-builder.service'
import { difficultyEffectsSetDisplayBoard, difficultyEffectsSetSolvedBoard } from './difficulty.actions'

@Injectable()
export class DifficultyEffects {

  setDifficulty$ = createEffect(() =>
    this.actions$.pipe(
      ofType(gameFormSetDifficulty),
      mergeMap(({ difficulty }) => {
        const { solvedBoard, displayBoard } = this.sudokuBuilder.generateNewGame(difficulty)
        return [
          difficultyEffectsSetSolvedBoard({ solvedBoard }),
          difficultyEffectsSetDisplayBoard({ displayBoard })
        ]
      })
    )
  )

  constructor(
    private actions$: Actions,
    private sudokuBuilder: SudokuBuilderService
  ) {}
}
