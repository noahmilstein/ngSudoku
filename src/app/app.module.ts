import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms'
import { SudokuBoardComponent } from './components/sudoku-board/sudoku-board.component'
import { IsCellActivePipe } from './pipes/is-cell-active.pipe'
import { IsCellRelatedPipe } from './pipes/is-cell-related.pipe'
import { NumberPadComponent } from './components/number-pad/number-pad.component'
import { GameFormComponent } from './components/game-form/game-form.component'
import { KeyHandlerDirective } from './directives/key-handler.directive'
import { IsValueUsedPipe } from './pipes/is-value-used.pipe'
import { MatIconModule } from '@angular/material/icon'
import { GamePadComponent } from './components/game-pad/game-pad.component'
import { IsValueHintedPipe } from './pipes/is-value-hinted.pipe'
import { FormatTimePipe } from './pipes/format-time.pipe'
import { StoreModule } from '@ngrx/store'
import { difficultyReducer } from './store/difficulty/difficulty.reducers'
import { EffectsModule } from '@ngrx/effects'
import { DifficultyEffects } from './store/difficulty/difficulty.effects'
import { solvedBoardReducer } from './store/solved-board/solved-board.reducers'
import { displayBoardReducer } from './store/display-board/display-board.reducers'
import { gameIsActiveReducer } from './store/game-is-active/game-is-active.reducers'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { activeCellReducer } from './store/active-cell/active-cell.reducers'
import { initialBoardReducer } from './store/initial-board/initial-board.reducers'
import { lockedCoordinatesReducer } from './store/locked-coordinates/locked-coordinates.reducers'
import { boardHistoryReducer } from './store/board-history/board-history.reducers'
import { NumberPadEffects } from './components/number-pad/number-pad.effects'
import { lockBoardReducer } from './store/lock-board/lock-board.reducers'
import { GamePadEffects } from './components/game-pad/game-pad.effects'

@NgModule({
  declarations: [
    AppComponent,
    SudokuBoardComponent,
    IsCellActivePipe,
    IsCellRelatedPipe,
    NumberPadComponent,
    GameFormComponent,
    KeyHandlerDirective,
    IsValueUsedPipe,
    GamePadComponent,
    IsValueHintedPipe,
    FormatTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    StoreModule.forRoot({
      difficulty: difficultyReducer,
      solvedBoard: solvedBoardReducer,
      displayBoard: displayBoardReducer,
      initialBoard: initialBoardReducer,
      boardHistory: boardHistoryReducer,
      gameIsActive: gameIsActiveReducer,
      activeCell: activeCellReducer,
      lockBoard: lockBoardReducer,
      lockedCoordinates: lockedCoordinatesReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([DifficultyEffects, NumberPadEffects, GamePadEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
