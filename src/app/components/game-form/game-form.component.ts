import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { BehaviorSubject, interval, NEVER, Subject } from 'rxjs'
import { dematerialize, materialize, switchMap } from 'rxjs/operators'
import { difficulties, Difficulty } from 'src/app/models/difficulty.model'
import { DataService } from 'src/app/services/data.service'
// tslint:disable: deprecation (https://github.com/ReactiveX/rxjs/issues/4159#issuecomment-466630791)


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

  netTimeTranspired = 0
  source = interval(1000)
  pauser = new Subject()
  timer = new BehaviorSubject<number>(0)

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.initTimer()
    this.dataService.gameIsActive$.subscribe(gameIsActive => this.toggleTimer(!gameIsActive))
    // check localStorage history first
    // if localStorage game history exists, then rehydrate
    // if not, then create new game
    this.generateNewGame(this.difficultyControl.value)
    this.difficultyControl.valueChanges.subscribe(diffChange => {
      this.generateNewGame(diffChange)
    })
  }

  generateNewGame(difficulty: Difficulty): void {
    this.dataService.generateNewGame(difficulty)
    this.netTimeTranspired = -1
    this.toggleTimer(false)
  }

  restartGame(): void {
    this.dataService.restartGame(true)
  }

  initTimer(): void {
    this.pauser.pipe(
      switchMap(paused => paused ? NEVER : this.source.pipe(materialize())),
      dematerialize()
    )
    .subscribe(() => {
      this.netTimeTranspired += 1
      this.timer.next(this.netTimeTranspired)
    })
  }

  toggleTimer(pause: boolean): void {
    this.pauser.next(pause)
  }
}
