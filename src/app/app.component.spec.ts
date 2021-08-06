import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { AppComponent } from './app.component'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'
import { GameFormComponent } from './components/game-form/game-form.component'
import { GamePadComponent } from './components/game-pad/game-pad.component'
import { NumberPadComponent } from './components/number-pad/number-pad.component'
import { DialogComponent } from './components/dialog/dialog.component'
import { SudokuBoardComponent } from './components/sudoku-board/sudoku-board.component'
import { mockStoreBaseState } from './mock-data/mock-store'
import { FormatTimePipe } from './pipes/format-time.pipe'
import { IsCellActivePipe } from './pipes/is-cell-active.pipe'
import { IsCellRelatedPipe } from './pipes/is-cell-related.pipe'
import { IsValueHintedPipe } from './pipes/is-value-hinted.pipe'
import { IsValueUsedPipe } from './pipes/is-value-used.pipe'
import { DialogService } from './services/dialog.service'

describe('AppComponent', () => {
  let app: AppComponent
  let dialogService: DialogService
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatSidenavModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [
        FormatTimePipe,
        IsCellActivePipe,
        IsCellRelatedPipe,
        IsValueHintedPipe,
        IsValueUsedPipe,
        AppComponent,
        GameFormComponent,
        SudokuBoardComponent,
        NumberPadComponent,
        GamePadComponent,
        DialogComponent
      ],
      providers: [
        DialogService,
        provideMockStore({
          initialState: mockStoreBaseState
        })
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [DialogComponent]
        }
      })
      .compileComponents()
    fixture = TestBed.createComponent(AppComponent)
    dialogService = TestBed.inject(DialogService)
    app = fixture.componentInstance
  })

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })

  it('onMenuClick should toggle the sidenav', () => {
    const drawerSpy = jest.spyOn(app.drawer, 'toggle')
    app.onMenuClick()
    expect(drawerSpy).toHaveBeenCalledTimes(1)
  })

  it('toggleRulesDialog should open the rules dialog', () => {
    const rulesDialogSpy = jest.spyOn(dialogService, 'sudokuRulesDialog')
    app.toggleRulesDialog()
    expect(rulesDialogSpy).toHaveBeenCalledTimes(1)
  })
})
