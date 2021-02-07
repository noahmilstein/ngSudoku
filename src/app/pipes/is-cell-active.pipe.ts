import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'isCellActive'
})
export class IsCellActivePipe implements PipeTransform {
  transform(cellCoordinates: [number, number] | null, rowIndex: number, columnIndex: number): boolean {
    if (!cellCoordinates) {
      return false
    }
    return cellCoordinates[0] === rowIndex && cellCoordinates[1] === columnIndex
  }
}
