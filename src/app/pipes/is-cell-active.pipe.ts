import { Pipe, PipeTransform } from '@angular/core'
import { Cell } from '@models/cell.model'

@Pipe({
  name: 'isCellActive'
})
export class IsCellActivePipe implements PipeTransform {
  transform(
    cellCoordinates: Cell | null,
    rowIndex: number,
    columnIndex: number
  ): boolean {
    if (!cellCoordinates) {
      return false
    }
    return cellCoordinates.x === rowIndex && cellCoordinates.y === columnIndex
  }
}
