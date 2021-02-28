import { Component, OnInit } from '@angular/core'
import { combineLatest } from 'rxjs'
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

  keyPadClick$ = this.dataService.keyPadClick$
  activeCell$ = this.dataService.activeCell$
  // WORKING HERE :: handle UNSUBSCRIBE!!!

  activeCellFilter = (coordinates: number[]) => {
    const { x, y } = this.dataService.coordinates(coordinates)
    return coordinates.length > 0 && this.initialBoardState[x][y] === 0
  }

  constructor(private sudoku: SudokuBuilderService, private dataService: DataService) {}

  ngOnInit(): void {
    combineLatest([
      this.activeCell$,
      this.keyPadClick$,
      this.dataService.lockedCoordinates$
    ]).subscribe(([activeCell, key, lockedCells]) => {
      const isCellLocked = lockedCells.find(coord => {
        return coord.toString() === activeCell.toString()
      })
      if (activeCell.length > 0 && !isCellLocked) {
        const { x, y } = this.dataService.coordinates(activeCell)
        this.displayBoard[x][y] = key
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

  initActiveCell(): void {
    this.dataService.initActiveCell()
  }

  initBoardCheck(): void {
    // this.data.service.runBoardCheckSource.next([])
  }

  initBoardState(): void {
    this.initActiveCell()
    this.initBoardCheck()
    this.dataService.setLockedCoordinates(this.displayBoard)
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
    this.initBoardState()
  }

  restartGame(): void {
    console.log('restart game')
    this.initBoardState()
  }
}
