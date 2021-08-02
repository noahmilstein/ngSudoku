import { inject } from '@angular/core/testing'
import { DataService } from '../services/data.service'
import { IsValueUsedPipe } from './is-value-used.pipe'

describe('IsValueUsedPipe', () => {
  it('create an instance', inject([DataService], (dataService: DataService) => {
    const pipe = new IsValueUsedPipe(dataService)
    expect(pipe).toBeTruthy()
  }))
})
