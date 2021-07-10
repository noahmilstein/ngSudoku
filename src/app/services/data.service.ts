import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Coordinate } from '../models/coordinate.type'
import { Difficulty } from '../models/difficulty.model'
import { Board } from '../models/game.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private initHints = 0
  private generateNewGameSource = new BehaviorSubject<Difficulty>(Difficulty.Easy)
  private restartGameSource = new Subject<boolean>()
  private keyPadClickSource = new Subject<number>()
  private gameIsActiveSource = new Subject<boolean>()
  private activeCellSource = new BehaviorSubject<number[]>([])
  private lockedCoordinatesSource = new BehaviorSubject<number[][]>([])
  private undoSource = new BehaviorSubject<boolean>(false)
  private hintSource = new BehaviorSubject<number>(this.initHints)
  // private isBoardValidSource = new BehaviorSubject<boolean>(true)

  generateNewGame$ = this.generateNewGameSource.asObservable()
  restartGame$ = this.restartGameSource.asObservable()
  keyPadClick$ = this.keyPadClickSource.asObservable()
  gameIsActive$ = this.gameIsActiveSource.asObservable()
  activeCell$ = this.activeCellSource.asObservable()
  lockedCoordinates$ = this.lockedCoordinatesSource.asObservable()
  undo$ = this.undoSource.asObservable()
  hints$ = this.hintSource.asObservable()
  // isBoardValid$ = this.isBoardValidSource.asObservable()

  setActiveCell(x: number, y: number, displayBoard: Board): void {
    const currentActiveCell = this.activeCellSource.getValue()
    if (currentActiveCell.length === 0) {
      // if there is no active cell, then set the active cell to clicked cell
      this.activeCellSource.next([x, y])
    } else {
      // else if there IS an active cell, then check to see IF this board is locked
      const { x: x2, y: y2 } = this.coordinates(currentActiveCell)
      const currentActiveCellValue = displayBoard[x2][y2]
      if (this.isCellValid(displayBoard, currentActiveCellValue, currentActiveCell)) {
        this.activeCellSource.next([x, y])
      }
    }
  }

  // setIsBoardValid(isBoardValid: boolean): void {
  //   this.isBoardValidSource.next(isBoardValid)
  // }

  setHint(reinit?: boolean): void {
    const payload = reinit ? 0 : this.hintSource.getValue() + 1
    this.hintSource.next(payload)
  }

  setLockedCoordinates(board: Board): void {
    const lockedCoordinates = this.getActiveCoordinates(board)
    this.lockedCoordinatesSource.next(lockedCoordinates)
  }

  initActiveCell(): void {
    this.activeCellSource.next([])
  }

  handleUndo(): void {
    this.undoSource.next(true)
  }

  generateNewGame(difficulty: Difficulty): void {
    this.generateNewGameSource.next(difficulty)
    this.gameIsActiveSource.next(true)
    this.setHint(true)
  }

  restartGame(restart: boolean): void {
    this.restartGameSource.next(restart)
    this.gameIsActiveSource.next(true)
    this.setHint(true)
  }

  keyPadClick(key: number): void {
    const isCellLocked = (cell: number[]) => {
      return this.lockedCoordinatesSource.getValue().some(coord => {
        const x1 = coord[0]
        const y1 = coord[1]
        const x2 = cell[0]
        const y2 = cell[1]
        return x1 === x2 && y1 === y2
      })
    }
    const activeCell = this.activeCellSource.getValue()
    if (!isCellLocked(activeCell)) {
      this.keyPadClickSource.next(key)
    }
  }

  toggleGameIsActive(gameIsActive: boolean): void {
    this.gameIsActiveSource.next(gameIsActive)
  }

  coordinates(coordinateTuple: number[]): Coordinate {
    return { x: coordinateTuple[0], y: coordinateTuple[1] }
  }

  isSharedSubgrid(activeRowIndex: number, activeColumnIndex: number, rowIndex: number, columnIndex: number): boolean {
    const subGridRow = (activeRowIndex - activeRowIndex % 3)
    const subGridColumn = (activeColumnIndex - activeColumnIndex % 3)
    const withinActiveSubgridRow = rowIndex >= subGridRow && rowIndex <= subGridRow + 2
    const withinActiveSubgridColumn = columnIndex >= subGridColumn && columnIndex <= subGridColumn + 2
    const sharedSubgrid = withinActiveSubgridRow && withinActiveSubgridColumn
    return sharedSubgrid
  }

  isCellRelated(activeCellCoordinates: number[] | null, rowIndex: number, columnIndex: number): boolean {
    if (!activeCellCoordinates) {
      return false
    }
    const { x, y } = this.coordinates(activeCellCoordinates)
    const sharedRow = x === rowIndex
    const sharedColumn = y === columnIndex
    const sharedSubgrid = this.isSharedSubgrid(x, y, rowIndex, columnIndex)
    const isActiveCell = x === rowIndex && y === columnIndex
    return !isActiveCell && (sharedRow || sharedColumn || sharedSubgrid)
  }

  getActiveCoordinates(initBoard: Board): number[][] {
    // NOTE :: return an array of COORDINATES/tuples, NOT rows
    const activeCoordinates: number[][] = []
    initBoard.forEach((row, rowIndex) => {
      row.forEach((_, columnIndex) => {
        if (initBoard[rowIndex][columnIndex] !== 0) {
          activeCoordinates.push([rowIndex, columnIndex])
        }
      })
    })
    return activeCoordinates
  }

  isCellValid(displayBoard: number[][], checkValue: number, activeCell: number[]): boolean {
    return !this.getActiveCoordinates(displayBoard).some(coord => {
      const { x, y } = this.coordinates(coord)
      const { x: activeX, y: activeY } = this.coordinates(activeCell)
      const inSubgrid = this.isSharedSubgrid(activeX, activeY, x, y)
      const isRelated = (y === activeY || x === activeX || inSubgrid)
      const isNotSelf = !(x === activeX && y === activeY)
      const isAlreadyUsed = checkValue === displayBoard[x][y]
      return isRelated && isNotSelf && isAlreadyUsed
    })
  }
}

// TODO :: dev this later
// const subGridMapping = {
//   2: 0,
//   5: 1,
//   8: 2
// }
// const getSubgridIndex = (axisValue: number) => {
//   return Object.entries(subGridMapping).find(([boardIndex, _]) => {
//     return axisValue <= parseInt(boardIndex, 10)
//   })
// }
// const getSubgrid = (x2: number, y2: number) => {
//   return [getSubgridIndex(x2), getSubgridIndex(y2)]
// }
