import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { filter, first } from 'rxjs/operators'
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
  initialBoardState: Board

  boardHistory: CellHistory[]
  // WORKING HERE
  // number of move
  // coordinate of move
  // before value
  // after value

  activeCellSource = new BehaviorSubject<number[]>([])
  activeCell$ = this.activeCellSource.asObservable()

  activeCellFilter = (coordinates: number[]) => {
    const x = coordinates[0]
    const y = coordinates[1]
    return coordinates.length > 0 && this.initialBoardState[x][y] === 0
  }

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
    // const activeCellFilter = (coordinates: number[]) => {
    //   const x = coordinates[0]
    //   const y = coordinates[1]
    //   return coordinates.length > 0 && this.initialBoardState[x][y] === 0
    // }
    this.gameService.keyPadClick$.pipe(filter(num => num !== 0)).subscribe(key => {
      this.activeCell$.pipe(first(), filter(this.activeCellFilter)).subscribe(activeCell => {
        // attempt to set active cell value with incoming key value
        const x = activeCell[0]
        const y = activeCell[1]
        this.displayBoard[x][y] = key
        // run check against new value
        // highlight appropriate cells
        // color text in cells, identify the LOCKED original display values
      })
    })
  }


  initActiveCell(): void {
    this.activeCellSource.next([])
  }

  activateCell(rowIndex: number, columnIndex: number): void {
    this.activeCellSource.next([rowIndex, columnIndex])
  }

  generateNewGame(difficulty: Difficulty): void {
    console.log('in new game block')
    const currentGame = this.sudoku.generateNewGame(difficulty)
    this.solvedBoard = currentGame.solvedBoard
    this.displayBoard = currentGame.displayBoard
    this.initialBoardState = JSON.parse(JSON.stringify(currentGame.displayBoard))
    // initialize game HISTORY here
    this.initActiveCell()
  }

  restartGame(): void {
    console.log('restart game')
    this.initActiveCell()
  }
}
