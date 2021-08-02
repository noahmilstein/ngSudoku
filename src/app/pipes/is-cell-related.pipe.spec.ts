import { inject } from '@angular/core/testing'
import { DataService } from '../services/data.service'
import { IsCellRelatedPipe } from './is-cell-related.pipe'

describe('IsCellRelatedPipe', () => {
  it('create an instance', inject([DataService], (dataService: DataService) => {
    const pipe = new IsCellRelatedPipe(dataService)
    expect(pipe).toBeTruthy()
  }))
})
