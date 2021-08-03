import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideMockStore } from '@ngrx/store/testing'
import { Difficulty } from '../../models/difficulty.model'
import { DialogService } from '../../services/dialog.service'
import { mockStoreBaseState } from '../../mock-data/mock-store'
import { FormatTimePipe } from '../../pipes/format-time.pipe'
import { GameFormComponent } from './game-form.component'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'
import { AppStore } from 'app/store/app-store.model'

describe('GameFormComponent', () => {
  let component: GameFormComponent
  let fixture: ComponentFixture<GameFormComponent>
  let store: Store<AppStore>
  let storeSpy: jest.SpyInstance
  let toggleTimerSpy: jest.SpyInstance

  const mockDialogService = {
    newGameDialog: () => {
      return {
        afterClosed: () => of(true)
      }
    },
    restartGameDialog: () => {
      return {
        afterClosed: () => of(true)
      }
    },
    revealSolvedBoardDialog: () => {
      return {
        afterClosed: () => of(true)
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameFormComponent, FormatTimePipe],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: DialogService, useValue: mockDialogService },
        provideMockStore({
          initialState: mockStoreBaseState
        })
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFormComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    storeSpy = jest.spyOn(store, 'dispatch')
    toggleTimerSpy = jest.spyOn(component, 'toggleTimer')

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('selecting a new difficulty should open dialog, toggle the timer, and dispatch the selection', () => {
    const newGameDialogSpy = jest.spyOn(
      component.dialogService,
      'newGameDialog'
    )
    const toggleTimerSpy = jest.spyOn(component, 'toggleTimer')
    component.difficultyControl.setValue(Difficulty.Medium)

    expect(newGameDialogSpy).toHaveBeenCalledTimes(1)
    expect(storeSpy).toHaveBeenCalledWith({
      difficulty: Difficulty.Medium,
      type: '[Game Form] Create New Game'
    })
    expect(toggleTimerSpy).toHaveBeenCalled()
  })

  it('solveBoard() should open a reveal board dialog and toggle the timer', () => {
    const revealBoardDialogSpy = jest.spyOn(
      component.dialogService,
      'revealSolvedBoardDialog'
    )
    component.solveBoard()
    expect(revealBoardDialogSpy).toHaveBeenCalledTimes(1)
    expect(storeSpy).toHaveBeenCalledWith({ type: '[Game Form] Solve Board' })
    expect(toggleTimerSpy).toHaveBeenCalled()
  })

  it('restartGame() should open a restart game dialog and dispatch restart action', () => {
    const restartGameDialogSpy = jest.spyOn(
      component.dialogService,
      'restartGameDialog'
    )
    component.restartGame()
    expect(restartGameDialogSpy).toHaveBeenCalledTimes(1)
    expect(storeSpy).toHaveBeenCalledWith({ type: '[Game Form] Restart Game' })
    expect(toggleTimerSpy).toHaveBeenCalled()
  })
})
