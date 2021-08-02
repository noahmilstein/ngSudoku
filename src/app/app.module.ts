import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { SudokuBoardComponent } from './components/sudoku-board/sudoku-board.component'
import { NumberPadComponent } from './components/number-pad/number-pad.component'
import { GameFormComponent } from './components/game-form/game-form.component'
import { GamePadComponent } from './components/game-pad/game-pad.component'
import { NumberPadEffects } from './components/number-pad/number-pad.effects'
import { GamePadEffects } from './components/game-pad/game-pad.effects'
import { GameFormEffects } from './components/game-form/game-form.effects'
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component'
import { KeyHandlerDirective } from './directives/key-handler.directive'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { IsCellActivePipe } from './pipes/is-cell-active.pipe'
import { IsCellRelatedPipe } from './pipes/is-cell-related.pipe'
import { IsValueUsedPipe } from './pipes/is-value-used.pipe'
import { IsValueHintedPipe } from './pipes/is-value-hinted.pipe'
import { FormatTimePipe } from './pipes/format-time.pipe'
import { difficultyReducer } from './store/difficulty/difficulty.reducers'
import { activeCellReducer } from './store/active-cell/active-cell.reducers'
import { initialBoardReducer } from './store/initial-board/initial-board.reducers'
import { lockedCoordinatesReducer } from './store/locked-coordinates/locked-coordinates.reducers'
import { boardHistoryReducer } from './store/board-history/board-history.reducers'
import { lockBoardReducer } from './store/lock-board/lock-board.reducers'
import { hintsReducer } from './store/hints/hints.reducers'
import { gameIsSolvedReducer } from './store/game-is-solved/game-is-solved.reducers'
import { DifficultyEffects } from './store/difficulty/difficulty.effects'
import { solvedBoardReducer } from './store/solved-board/solved-board.reducers'
import { displayBoardReducer } from './store/display-board/display-board.reducers'
import { gameIsActiveReducer } from './store/game-is-active/game-is-active.reducers'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

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
    FormatTimePipe,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatDialogModule,
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
      gameIsSolved: gameIsSolvedReducer,
      activeCell: activeCellReducer,
      lockBoard: lockBoardReducer,
      lockedCoordinates: lockedCoordinatesReducer,
      hints: hintsReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([
      DifficultyEffects,
      NumberPadEffects,
      GamePadEffects,
      GameFormEffects
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
