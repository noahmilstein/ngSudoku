import { TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatIconTestingModule } from '@angular/material/icon/testing'
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { AppComponent } from './app.component'
import { GameFormComponent } from './components/game-form/game-form.component'
import { GamePadComponent } from './components/game-pad/game-pad.component'
import { NumberPadComponent } from './components/number-pad/number-pad.component'
import { SudokuBoardComponent } from './components/sudoku-board/sudoku-board.component'
import { mockAppBaseState } from './mock-data/mock-app-state'
import { FormatTimePipe } from './pipes/format-time.pipe'
import { IsCellActivePipe } from './pipes/is-cell-active.pipe'
import { IsCellRelatedPipe } from './pipes/is-cell-related.pipe'
import { IsValueHintedPipe } from './pipes/is-value-hinted.pipe'
import { IsValueUsedPipe } from './pipes/is-value-used.pipe'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconTestingModule,
        MatIconModule,
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
        GamePadComponent
      ],
      providers: [
        provideMockStore({
          initialState: mockAppBaseState
        })
      ]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })
})
