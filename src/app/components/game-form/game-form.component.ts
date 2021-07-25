import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { BehaviorSubject, interval, NEVER, Subject, Subscription } from 'rxjs'
import { dematerialize, materialize, switchMap } from 'rxjs/operators'
import { selectGameIsActive } from '../../store/game-is-active/game-is-active.selectors'
import { difficulties, Difficulty } from '../../models/difficulty.model'
import { AppStore } from '../../store/app-store.model'
import { gameFormSolveBoard, gameFormCreateNewGame, gameFormRestartGame } from './game-form.actions'
import { selectGameIsSolved } from '../../store/game-is-solved/game-is-solved.selectors'
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

  gameIsSolved$ = this.appStore.select(selectGameIsSolved)

  gameIsActiveSubscription: Subscription
  gameIsSolvedSubscription: Subscription
  difficultyChangesSubscription: Subscription
  pauserSubscription: Subscription

  constructor(
    private fb: FormBuilder,
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
    this.gameIsSolvedSubscription = this.gameIsSolved$.subscribe(gameIsSolved => {
      if (gameIsSolved) {
        this.toggleTimer(true)
      }
    })
  }

  ngOnDestroy(): void {}

  generateNewGame(difficulty: Difficulty): void {
    this.appStore.dispatch(gameFormCreateNewGame({ difficulty }))
    this.netTimeTranspired = -1
    this.toggleTimer(false)
  }

  restartGame(): void {
    this.appStore.dispatch(gameFormRestartGame())
  }

  solveBoard(): void {
    // WORKING HERE :: should open modal FIRST
    // "Are you sure you want to reveal the board? This will end your current game"
    // Yes, reveal board
    // No, continue game
    this.appStore.dispatch(gameFormSolveBoard())
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
