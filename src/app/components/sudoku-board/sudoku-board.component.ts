import { Component, OnInit } from '@angular/core'
import { ReplaySubject, Subject } from 'rxjs'
import { CellHistory } from 'src/app/models/cell-history.model'
import { Difficulty } from 'src/app/models/difficulty.model'
import { Board } from 'src/app/models/game.model'
import { GameService } from 'src/app/services/game.service'
import { SudokuService } from 'src/app/services/sudoku.service'
// tslint:disable: deprecation (https://github.com/ReactiveX/rxjs/issues/4159#issuecomment-466630791)

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss']
})
export class SudokuBoardComponent implements OnInit {
  solvedBoard: Board // board with game solution
  displayBoard: Board // clone of solvedBoard with values hidden to display to user

  boardHistory: CellHistory[]
  // WORKING HERE
  // number of move
  // coordinate of move
  // before value
  // after value

  activeCell$: Subject<[number, number]>

  constructor(private sudoku: SudokuService, private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.generateNewGame$.subscribe(diff => {
      if (diff) {
        this.generateNewGame(diff)
      }
    })
    this.gameService.restartGame$.subscribe(restart => {
      if (restart) {
        this.restartGame()
      }
    })
    this.initActiveCell()
  }

  initActiveCell(): void {
    this.activeCell$ = new ReplaySubject<[number, number]>()
  }

  activateCell(rowIndex: number, columnIndex: number): void {
    this.activeCell$.next([rowIndex, columnIndex])
  }

  generateNewGame(difficulty: Difficulty): void {
    console.log('in new game block')
    const currentGame = this.sudoku.generateNewGame(difficulty)
    this.solvedBoard = currentGame.solvedBoard
    this.displayBoard = currentGame.displayBoard
    this.initActiveCell()
  }

  restartGame(): void {
    console.log('restart game')
    this.initActiveCell()
  }
}
