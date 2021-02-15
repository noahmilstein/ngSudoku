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
import { KeyPadComponent } from './components/key-pad/key-pad.component'
import { GameFormComponent } from './components/game-form/game-form.component'
import { KeyHandlerDirective } from './directives/key-handler.directive'
import { IsValueUsedPipe } from './pipes/is-value-used.pipe'

@NgModule({
  declarations: [
    AppComponent,
    SudokuBoardComponent,
    IsCellActivePipe,
    IsCellRelatedPipe,
    KeyPadComponent,
    GameFormComponent,
    KeyHandlerDirective,
    IsValueUsedPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
