import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { filter, first } from 'rxjs/operators'
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
  maxHints = 3
  solvedBoard: Board // board with game solution
  displayBoard: Board // clone of solvedBoard with values hidden to display to user
  initialBoardState: Board
  boardHistory: CellHistory[] = []
  lockedCoordinates: number[][] = []
  hintedCoordinates$ = new BehaviorSubject<number[][]>([])

  keyPadClick$ = this.dataService.keyPadClick$
  activeCell$ = this.dataService.activeCell$
  activeCell: number[]
  // WORKING HERE :: handle UNSUBSCRIBE!!! (see /decorators/auto-unsubscribe.ts)

  activeCellFilter = (coordinates: number[]) => {
    const { x, y } = this.dataService.coordinates(coordinates)
    return coordinates.length > 0 && this.initialBoardState[x][y] === 0
  }

  constructor(private sudoku: SudokuBuilderService, private dataService: DataService) {}

  ngOnInit(): void {
    this.activeCell$.subscribe(activeCell => {
      this.activeCell = activeCell
    })
    this.dataService.lockedCoordinates$.pipe(first()).subscribe(lockedCoordinates => {
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
    this.dataService.hints$.pipe(filter(num => num > 0)).subscribe(hint => {
      if (hint <= this.maxHints) {
        // working here :: fix 2 bugs
        // fix for get hint IF active cell and invalid selections are present
        // fix for undo and auto update check for invalid selections on board
        const emptyCoordinates = this.sudoku.getEmptyCoordinates(this.displayBoard)
        const randomElement = emptyCoordinates[Math.floor(Math.random() * emptyCoordinates.length)]
        const { x, y } = this.dataService.coordinates(randomElement)
        const hintValue = this.solvedBoard[x][y]
        this.displayBoard[x][y] = hintValue
        const oldHints = this.hintedCoordinates$.getValue()
        const newHint = [x, y]
        this.lockedCoordinates.push(newHint)
        this.hintedCoordinates$.next([...oldHints, newHint])
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
