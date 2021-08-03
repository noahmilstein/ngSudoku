import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { IsCellActivePipe } from '../../pipes/is-cell-active.pipe'
import { IsCellRelatedPipe } from '../../pipes/is-cell-related.pipe'
import { IsValueHintedPipe } from '../../pipes/is-value-hinted.pipe'
import { IsValueUsedPipe } from '../../pipes/is-value-used.pipe'
import { SudokuBoardComponent } from './sudoku-board.component'
import { mockStoreNewGameState } from '../../mock-data/mock-store'

describe('SudokuBoardComponent', () => {
  let component: SudokuBoardComponent
  let fixture: ComponentFixture<SudokuBoardComponent>
  let store: MockStore<any>
  let storeSpy: jest.SpyInstance

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SudokuBoardComponent,
        IsCellActivePipe,
        IsCellRelatedPipe,
        IsValueHintedPipe,
        IsValueUsedPipe
      ],
      providers: [provideMockStore({ initialState: mockStoreNewGameState })]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuBoardComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
    storeSpy = jest.spyOn(store, 'dispatch')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('activateCell should dispatch action', () => {
    component.activateCell(1, 1)
    expect(storeSpy).toHaveBeenCalledWith({
      x: 1,
      y: 1,
      type: '[Sudoku Board] Set Active Cell'
    })
  })

  it('activateCell should not dispatch action if gameIsInactive', () => {
    component.activateCell(1, 1)
    expect(storeSpy).toHaveBeenCalledWith({
      x: 1,
      y: 1,
      type: '[Sudoku Board] Set Active Cell'
    })
  })

  it('activateCell should not dispatch action if lockBoard', () => {
    store.setState({ ...mockStoreNewGameState, gameIsActive: false })
    component.activateCell(1, 1)
    expect(storeSpy).not.toHaveBeenCalledWith({
      x: 1,
      y: 1,
      type: '[Sudoku Board] Set Active Cell'
    })
  })

  it('activateCell should not dispatch action if lockBoard', () => {
    store.setState({ ...mockStoreNewGameState, lockBoard: true })
    component.activateCell(1, 1)
    expect(storeSpy).not.toHaveBeenCalledWith({
      x: 1,
      y: 1,
      type: '[Sudoku Board] Set Active Cell'
    })
  })
})
