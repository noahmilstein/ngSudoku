import { Component, OnInit } from '@angular/core'
import { CellHistory } from 'src/app/models/cell-history.model'
import { Difficulty } from 'src/app/models/difficulty.model'
import { Board } from 'src/app/models/game.model'
import { DataService } from 'src/app/services/data.service'
import { SudokuBuilderService } from 'src/app/services/sudoku-builder.service'
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
  boardHistory: CellHistory[] = []
  lockedCoordinates: number[][] = []

  keyPadClick$ = this.dataService.keyPadClick$
  activeCell: number[]
  // WORKING HERE :: handle UNSUBSCRIBE!!! (see /decorators/auto-unsubscribe.ts)

  activeCellFilter = (coordinates: number[]) => {
    const { x, y } = this.dataService.coordinates(coordinates)
    return coordinates.length > 0 && this.initialBoardState[x][y] === 0
  }

  constructor(private sudoku: SudokuBuilderService, private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.activeCell$.subscribe(activeCell => {
      this.activeCell = activeCell
    })
    this.dataService.lockedCoordinates$.subscribe(lockedCoordinates => {
      this.lockedCoordinates = lockedCoordinates
    })
    this.dataService.undo$.subscribe(undo => {
      if (undo && this.boardHistory.length > 0) {
        const { coordinate, before } = this.boardHistory[this.boardHistory.length - 1]
        const { x, y } = this.dataService.coordinates(coordinate)
        this.displayBoard[x][y] = before
        this.boardHistory.splice(-1, 1)
      }
    })
    this.keyPadClick$.subscribe(key => {
      if (this.activeCell.length > 0 && !this.isCellLocked()) {
        const { x, y } = this.dataService.coordinates(this.activeCell)
        const prevValue = this.displayBoard[x][y]
        this.displayBoard[x][y] = key
        const history = new CellHistory({
          coordinate: [x, y],
          before: prevValue,
          after: key
        })
        this.boardHistory.push(history)
      }
    })
    this.dataService.generateNewGame$.subscribe(diff => {
      if (diff) {
        this.generateNewGame(diff)
      }
    })
    this.dataService.restartGame$.subscribe(restart => {
      if (restart) {
        this.restartGame()
      }
    })
  }

  isCellLocked(): boolean {
    return this.lockedCoordinates.some(coord => {
      return coord.toString() === this.activeCell.toString()
    })
  }

  initBoardState(): void {
    this.boardHistory = []
    this.dataService.initActiveCell()
  }

  activateCell(x: number, y: number): void {
    this.dataService.setActiveCell(x, y, this.displayBoard)
  }

  generateNewGame(difficulty: Difficulty): void {
    console.log('in new game block')
    const currentGame = this.sudoku.generateNewGame(difficulty)
    this.solvedBoard = currentGame.solvedBoard
    this.displayBoard = currentGame.displayBoard
    this.initialBoardState = JSON.parse(JSON.stringify(currentGame.displayBoard))
    this.dataService.setLockedCoordinates(this.displayBoard)
    this.initBoardState()
  }

  restartGame(): void {
    console.log('restart game')
    this.displayBoard = this.initialBoardState
    this.initBoardState()
  }
}
