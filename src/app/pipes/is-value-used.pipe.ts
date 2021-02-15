import { Pipe, PipeTransform } from '@angular/core'
import { DataService } from '../services/data.service'

@Pipe({
  name: 'isValueUsed'
})
export class IsValueUsedPipe implements PipeTransform {
  constructor(private data: DataService) {}
  transform(
    activeCellCoordinates: number[] | null,
    rowIndex: number,
    columnIndex: number,
    displayBoard: number[][]
  ): boolean {
    // WORKING HERE :: consolidate with data service logic
    const isCellRelated = this.data.isCellRelated(activeCellCoordinates, rowIndex, columnIndex)
    if (!activeCellCoordinates || !isCellRelated) {
      return false
    }
    const { x, y } = this.data.coordinates(activeCellCoordinates)
    const activeCellValue = displayBoard[x][y]
    const currentCellValue = displayBoard[rowIndex][columnIndex]
    return activeCellValue !== 0 && currentCellValue !== 0 && activeCellValue === currentCellValue
  }
}
