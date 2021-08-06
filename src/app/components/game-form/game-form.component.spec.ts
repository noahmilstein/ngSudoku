import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Difficulty } from '../../models/difficulty.model'
import { DialogService } from '../../services/dialog.service'
import { mockStoreBaseState } from '../../mock-data/mock-store'
import { FormatTimePipe } from '../../pipes/format-time.pipe'
import { GameFormComponent } from './game-form.component'
import { of } from 'rxjs'

describe('GameFormComponent', () => {
  let component: GameFormComponent
  let fixture: ComponentFixture<GameFormComponent>
  let store: MockStore<any>

  let storeSpy: jest.SpyInstance
  let toggleTimerSpy: jest.SpyInstance
  let newGameDialogSpy: jest.SpyInstance
  let revealBoardDialogSpy: jest.SpyInstance
  let restartGameDialogSpy: jest.SpyInstance

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
        MatIconModule,
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
    store = TestBed.inject(MockStore)
    storeSpy = jest.spyOn(store, 'dispatch')
    toggleTimerSpy = jest.spyOn(component, 'toggleTimer')
    newGameDialogSpy = jest.spyOn(component.dialogService, 'newGameDialog')
    revealBoardDialogSpy = jest.spyOn(
      component.dialogService,
      'revealSolvedBoardDialog'
    )
    restartGameDialogSpy = jest.spyOn(
      component.dialogService,
      'restartGameDialog'
    )

    fixture.detectChanges()
  })

  function gameIsActiveTestHelper(called: boolean): void {
    const expectedPayload = (gameIsActive: boolean) => {
      return {
        gameIsActive,
        type: '[Game Form] Set Game Is Active'
      }
    }
    if (called) {
      expect(storeSpy).toHaveBeenCalledWith(expectedPayload(false))
      expect(storeSpy).toHaveBeenCalledWith(expectedPayload(true))
    } else {
      expect(storeSpy).not.toHaveBeenCalledWith(expectedPayload(false))
      expect(storeSpy).not.toHaveBeenCalledWith(expectedPayload(true))
    }
  }

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('changes to gameIsSolved should toggle the timer', () => {
    store.setState({ ...mockStoreBaseState, gameIsSolved: true })
    expect(toggleTimerSpy).toHaveBeenCalled()
  })

  it('selecting a new difficulty should open dialog and dispatch actions', () => {
    component.difficultyControl.setValue(Difficulty.Medium)

    expect(newGameDialogSpy).toHaveBeenCalledTimes(1)
    expect(storeSpy).toHaveBeenCalledWith({
      difficulty: Difficulty.Medium,
      type: '[Game Form] Create New Game'
    })
    gameIsActiveTestHelper(true)
    expect(toggleTimerSpy).toHaveBeenCalled()
  })

  it('selecting a new difficulty should NOT open dialog and SHOULD dispatch actions', () => {
    store.setState({ ...mockStoreBaseState, gameIsSolved: true })
    component.difficultyControl.setValue(Difficulty.Medium)

    expect(newGameDialogSpy).not.toHaveBeenCalled()
    gameIsActiveTestHelper(false)
    expect(storeSpy).toHaveBeenCalledWith({
      difficulty: Difficulty.Medium,
      type: '[Game Form] Create New Game'
    })
  })

  it('solveBoard() should open a reveal board dialog and dispatch actions', () => {
    component.solveBoard()
    expect(revealBoardDialogSpy).toHaveBeenCalledTimes(1)
    gameIsActiveTestHelper(true)
    expect(storeSpy).toHaveBeenCalledWith({ type: '[Game Form] Solve Board' })
    expect(toggleTimerSpy).toHaveBeenCalled()
  })

  it('restartGame() should open a restart game dialog and dispatch actions', () => {
    component.restartGame(false)
    expect(restartGameDialogSpy).toHaveBeenCalledTimes(1)
    gameIsActiveTestHelper(true)
    expect(storeSpy).toHaveBeenCalledWith({ type: '[Game Form] Restart Game' })
    expect(toggleTimerSpy).toHaveBeenCalled()
  })

  it('restartGame() should NOT open a restart game dialog and dispatch actions', () => {
    component.restartGame(true)
    expect(restartGameDialogSpy).not.toHaveBeenCalled()
    gameIsActiveTestHelper(false)
    expect(storeSpy).toHaveBeenCalledWith({ type: '[Game Form] Restart Game' })
    expect(toggleTimerSpy).toHaveBeenCalled()
  })

  it('restartGame() should NOT open a restart game dialog and dispatch actions', () => {
    const menuClickEmitSpy = jest.spyOn(component.menuClick, 'emit')
    component.onMenuClick()
    expect(menuClickEmitSpy).toHaveBeenCalledTimes(1)
  })
})
