import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'isValueHinted'
})
export class IsValueHintedPipe implements PipeTransform {
  transform(hintedCoordinates: number[][] | null, rowIndex: number, columnIndex: number): boolean {
    if (!hintedCoordinates) {
      return false
    }
    return hintedCoordinates.some(coord => {
      return coord.toString() === [rowIndex, columnIndex].toString()
    })
  }
}
