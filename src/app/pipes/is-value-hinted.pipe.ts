import { Pipe, PipeTransform } from '@angular/core'
import { Cell } from '../models/cell.model'

@Pipe({
  name: 'isValueHinted'
})
export class IsValueHintedPipe implements PipeTransform {
  transform(hintedCoordinates: Cell[] | null, rowIndex: number, columnIndex: number): boolean {
    return hintedCoordinates.some(cell => cell.x === rowIndex && cell.y === columnIndex)
  }
}
