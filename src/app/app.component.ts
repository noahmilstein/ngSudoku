import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { difficulties, Difficulty } from './models/difficulty.model'
import { Game } from './models/game.model'
import { SudokuService } from './services/sudoku.service'
// tslint:disable: deprecation (https://github.com/ReactiveX/rxjs/issues/4159#issuecomment-466630791)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngSudoku'
  difficultyLevels = difficulties
  currentGame: Game

  boardForm = this.fb.group({
    difficulty: [Difficulty.Easy, Validators.required]
  })

  get difficultyControl(): FormControl {
    return this.boardForm.get('difficulty') as FormControl
  }

  constructor(private fb: FormBuilder, private sudoku: SudokuService) {}

  // TODO
  // create form for user UX/UI
  // write alternate algorithm
  ngOnInit(): void {
    this.generateNewGame(this.difficultyControl.value)
    // TODO :: set to class attribute Subscription objects and create @AutoUnsubscribe() decorator
    this.difficultyControl.valueChanges.subscribe({
      next: (diff: Difficulty) => {
        console.log(diff)
        this.generateNewGame(diff)
      },
      error: err => console.log(err)
    })
  }

  generateNewGame(diff: Difficulty): void {
    console.log('generate new game here', diff)
    this.currentGame = this.sudoku.generateNewGame(diff)
  }

  resetGame(): void {
    // develop AFTER creating game history for undo/erase
    // clear history back to first state of history/move array
    console.log('handle reset game here')
  }
}
