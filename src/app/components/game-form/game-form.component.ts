import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { BehaviorSubject, interval, NEVER, Subject, Subscription } from 'rxjs'
import { dematerialize, materialize, switchMap } from 'rxjs/operators'
import { selectGameIsActive } from '../../store/game-is-active/game-is-active.selectors'
import { difficulties, Difficulty } from '../../models/difficulty.model'
import { DataService } from '../../services/data.service'
import { AppStore } from '../../store/app-store.model'
import { gameFormSetDifficulty } from './game-form.actions'
// tslint:disable: deprecation (https://github.com/ReactiveX/rxjs/issues/4159#issuecomment-466630791)


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
export class GameFormComponent implements OnInit, OnDestroy {
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

  gameIsActiveSubscription: Subscription
  difficultyChangesSubscription: Subscription
  pauserSubscription: Subscription

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private appStore: Store<AppStore> // working here :: normalize naming across app
  ) {}

  ngOnInit(): void {
    this.initTimer()
    this.gameIsActiveSubscription = this.appStore.select(selectGameIsActive).subscribe(gameIsActive => this.toggleTimer(!gameIsActive))
    // check localStorage history first
    // if localStorage game history exists, then rehydrate
    // if not, then create new game
    this.generateNewGame(this.difficultyControl.value)
    this.difficultyChangesSubscription = this.difficultyControl.valueChanges.subscribe(diffChange => {
      this.generateNewGame(diffChange)
    })
  }

  ngOnDestroy(): void {}

  generateNewGame(difficulty: Difficulty): void {
    // working here :: should call gameFormSetNewGame action
    // action should call game form effects to set default new game state
    this.appStore.dispatch(gameFormSetDifficulty({ difficulty }))
    this.netTimeTranspired = -1
    this.toggleTimer(false)
  }

  restartGame(): void {
    this.dataService.restartGame(true)
  }

  initTimer(): void {
    this.pauserSubscription = this.pauser.pipe(
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
