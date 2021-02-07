import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { difficulties, Difficulty } from 'src/app/models/difficulty.model'
import { GameService } from 'src/app/services/game.service'

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit {
  difficultyLevels = difficulties

  boardForm = this.fb.group({
    difficulty: [Difficulty.Easy, Validators.required]
  })

  get difficultyControl(): FormControl {
    return this.boardForm.get('difficulty') as FormControl
  }
  timeLeft: any
  constructor(private fb: FormBuilder, private gameService: GameService) {}

  ngOnInit(): void {
    // check localStorage history first
    // if localStorage game history exists, then rehydrate
    // if not, then create new game
    this.generateNewGame(this.difficultyControl.value)

  }

  generateNewGame(difficulty: Difficulty): void {
    this.gameService.generateNewGame(difficulty)
    // this.setTimer()
  }

  restartGame(): void {
    this.gameService.restartGame(true)
  }
}
