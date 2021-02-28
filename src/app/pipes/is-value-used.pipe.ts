import { Pipe, PipeTransform } from '@angular/core'
import { Board } from '../models/game.model'
import { DataService } from '../services/data.service'

@Pipe({
  name: 'isValueUsed'
})
export class IsValueUsedPipe implements PipeTransform {
  constructor(private data: DataService) {}
  transform(
    keyPadClick: number | null,
    activeCell: number[] | null,
    rowIndex: number,
    columnIndex: number,
    displayBoard: Board
  ): boolean {
    if (!keyPadClick) {
      return false
    }
    const isCellRelated = this.data.isCellRelated(activeCell, rowIndex, columnIndex)
    if (!activeCell || !isCellRelated) {
      return false
    }
    const { x, y } = this.data.coordinates(activeCell)
    const activeCellValue = displayBoard[x][y]
    const currentCellValue = displayBoard[rowIndex][columnIndex]
    return activeCellValue !== 0 && currentCellValue !== 0 && activeCellValue === currentCellValue
  }
}
