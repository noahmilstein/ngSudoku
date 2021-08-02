import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import {
  BehaviorSubject,
  interval,
  NEVER,
  Observable,
  Subject,
  Subscription
} from 'rxjs'
import { dematerialize, first, materialize, switchMap } from 'rxjs/operators'
import { selectGameIsActive } from '@store/game-is-active/game-is-active.selectors'
import { difficulties, Difficulty } from '@models/difficulty.model'
import { AppStore } from '@store/app-store.model'
import {
  gameFormSolveBoard,
  gameFormCreateNewGame,
  gameFormRestartGame
} from './game-form.actions'
import { selectGameIsSolved } from '@store/game-is-solved/game-is-solved.selectors'
import { MatDialog } from '@angular/material/dialog'
import { DialogService } from '@services/dialog.service'
import { AutoUnsubscribe } from '@decorators/auto-unsubscribe'

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss']
})
@AutoUnsubscribe()
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
  difficultyChanges$: Observable<Difficulty> =
    this.difficultyControl.valueChanges

  gameIsActiveSubscription: Subscription
  gameIsSolvedSubscription: Subscription
  difficultyChangesSubscription: Subscription
  pauserSubscription: Subscription

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogService: DialogService,
    private appStore: Store<AppStore> // working here :: normalize naming across app
  ) {}

  ngOnInit(): void {
    this.initTimer()
    this.gameIsActiveSubscription = this.appStore
      .select(selectGameIsActive)
      .subscribe((gameIsActive) => this.toggleTimer(!gameIsActive))
    // check localStorage history first
    // if localStorage game history exists, then rehydrate
    // if not, then create new game
    this.generateNewGame(this.difficultyControl.value)
    this.difficultyChangesSubscription = this.difficultyChanges$.subscribe(
      (diffChange) => this.newGameDialog(diffChange)
    )
    this.gameIsSolvedSubscription = this.gameIsSolved$.subscribe(
      (gameIsSolved) => {
        if (gameIsSolved) {
          this.toggleTimer(true)
        }
      }
    )
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {}

  newGameDialog(difficulty?: Difficulty): void {
    this.dialogService.newGameDialog
      .afterClosed()
      .pipe(first())
      .subscribe((result) => {
        if (result) {
          this.generateNewGame(difficulty)
        }
      })
  }

  generateNewGame(difficulty: Difficulty): void {
    this.appStore.dispatch(gameFormCreateNewGame({ difficulty }))
    this.netTimeTranspired = -1
    this.toggleTimer(false)
  }

  restartGame(): void {
    this.dialogService.restartGameDialog
      .afterClosed()
      .pipe(first())
      .subscribe((result) => {
        if (result) {
          this.appStore.dispatch(gameFormRestartGame())
        }
      })
  }

  solveBoard(): void {
    this.dialogService.revealSolvedBoardDialog
      .afterClosed()
      .pipe(first())
      .subscribe((result) => {
        if (result) {
          this.appStore.dispatch(gameFormSolveBoard())
        }
      })
  }

  initTimer(): void {
    this.pauserSubscription = this.pauser
      .pipe(
        switchMap((paused) =>
          paused ? NEVER : this.source.pipe(materialize())
        ),
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
