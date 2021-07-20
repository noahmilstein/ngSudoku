import { Pipe, PipeTransform } from '@angular/core'
import { Board } from '../models/game.model'
import { DataService } from '../services/data.service'
import { Cell } from '../models/cell.model'
import { CellHistory } from '../models/cell-history.model'

@Pipe({
  name: 'isValueUsed'
})
export class IsValueUsedPipe implements PipeTransform {
  constructor(private data: DataService) {}
  transform(
    _: CellHistory[],
    activeCell: Cell | null,
    rowIndex: number,
    columnIndex: number,
    displayBoard: Board | null
  ): boolean {
    const isCellRelated = this.data.isCellRelated(activeCell, rowIndex, columnIndex)
    if (!activeCell || !isCellRelated || !displayBoard) {
      return false
    }
    const { x, y } = activeCell
    const activeCellValue = displayBoard[x][y]
    const currentCellValue = displayBoard[rowIndex][columnIndex]
    return activeCellValue !== 0 && currentCellValue !== 0 && activeCellValue === currentCellValue
  }
}
