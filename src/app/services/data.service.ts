import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Coordinate } from '../models/coordinate.type'
import { Difficulty } from '../models/difficulty.model'
import { Board } from '../models/game.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private generateNewGameSource = new BehaviorSubject<Difficulty>(Difficulty.Easy)
  private restartGameSource = new Subject<boolean>()
  private keyPadClickSource = new Subject<number>()

  generateNewGame$ = this.generateNewGameSource.asObservable()
  restartGame$ = this.restartGameSource.asObservable()
  keyPadClick$ = this.keyPadClickSource.asObservable()

  generateNewGame(difficulty: Difficulty): void {
    this.generateNewGameSource.next(difficulty)
  }

  restartGame(restart: boolean): void {
    this.restartGameSource.next(restart)
  }

  keyPadClick(key: number): void {
    this.keyPadClickSource.next(key)
    this.keyPadClickSource.next(0)
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

  isBoardValid(displayBoard: number[][], checkValue: number, activeCell: number[]): boolean {
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
