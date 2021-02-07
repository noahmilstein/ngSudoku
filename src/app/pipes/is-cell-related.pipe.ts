import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'isCellRelated'
})
export class IsCellRelatedPipe implements PipeTransform {
  isSharedSubgrid(activeRowIndex: number, activeColumnIndex: number, rowIndex: number, columnIndex: number): boolean {
    const subGridRow = (activeRowIndex - activeRowIndex % 3)
    const subGridColumn = (activeColumnIndex - activeColumnIndex % 3)
    const withinActiveSubgridRow = rowIndex >= subGridRow && rowIndex <= subGridRow + 2
    const withinActiveSubgridColumn = columnIndex >= subGridColumn && columnIndex <= subGridColumn + 2
    const sharedSubgrid = withinActiveSubgridRow && withinActiveSubgridColumn
    return sharedSubgrid
  }

  transform(activeCellCoordinates: [number, number] | null, rowIndex: number, columnIndex: number): boolean {
    if (!activeCellCoordinates) {
      return false
    }
    const activeCellRowIndex = activeCellCoordinates[0]
    const activeCellColumnIndex = activeCellCoordinates[1]
    const sharedRow = activeCellRowIndex === rowIndex
    const sharedColumn = activeCellColumnIndex === columnIndex
    const sharedSubgrid = this.isSharedSubgrid(activeCellRowIndex, activeCellColumnIndex, rowIndex, columnIndex)
    const isActiveCell = activeCellRowIndex === rowIndex && activeCellColumnIndex === columnIndex
    return !isActiveCell && (sharedRow || sharedColumn || sharedSubgrid)
  }
}
