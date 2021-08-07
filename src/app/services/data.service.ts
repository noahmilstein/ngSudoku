import { Injectable } from '@angular/core'
import { Cell } from '../models/cell.model'
import { Coordinate } from '../models/coordinate.type'
import { Board } from '../models/game.model'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  /**
   * @deprecated
   */
  coordinates(coordinateTuple: number[]): Coordinate {
    return { x: coordinateTuple[0], y: coordinateTuple[1] }
  }

  isSharedSubgrid(
    activeRowIndex: number,
    activeColumnIndex: number,
    rowIndex: number,
    columnIndex: number
  ): boolean {
    const subGridRow = activeRowIndex - (activeRowIndex % 3)
    const subGridColumn = activeColumnIndex - (activeColumnIndex % 3)
    const withinActiveSubgridRow =
      rowIndex >= subGridRow && rowIndex <= subGridRow + 2
    const withinActiveSubgridColumn =
      columnIndex >= subGridColumn && columnIndex <= subGridColumn + 2
    const sharedSubgrid = withinActiveSubgridRow && withinActiveSubgridColumn
    return sharedSubgrid
  }

  isCellRelated(
    activeCellCoordinates: Cell | null,
    rowIndex: number,
    columnIndex: number
  ): boolean {
    // TODO :: used in pipes :: move logic elsewhere
    if (!activeCellCoordinates) {
      return false
    }
    const { x, y } = activeCellCoordinates
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

  isCellValid(
    displayBoard: number[][],
    checkValue: number,
    activeCell: number[]
  ): boolean {
    // TODO :: currently used in number-pad.effects
    // move this logic elsewhere
    return !this.getActiveCoordinates(displayBoard).some((coord) => {
      const { x, y } = this.coordinates(coord)
      const { x: activeX, y: activeY } = this.coordinates(activeCell)
      const inSubgrid = this.isSharedSubgrid(activeX, activeY, x, y)
      const isRelated = y === activeY || x === activeX || inSubgrid
      const isNotSelf = !(x === activeX && y === activeY)
      const isAlreadyUsed = checkValue === displayBoard[x][y]
      return isRelated && isNotSelf && isAlreadyUsed
    })
  }
}
