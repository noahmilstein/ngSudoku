import { Pipe, PipeTransform } from '@angular/core'
import { DataService } from '../services/data.service'

@Pipe({
  name: 'isCellRelated'
})
export class IsCellRelatedPipe implements PipeTransform {
  constructor(private data: DataService) {}
  transform(activeCellCoordinates: number[] | null, rowIndex: number, columnIndex: number): boolean {
    return this.data.isCellRelated(activeCellCoordinates, rowIndex, columnIndex)
  }
}
