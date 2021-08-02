import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { IsCellActivePipe } from '../../pipes/is-cell-active.pipe'
import { IsCellRelatedPipe } from '../../pipes/is-cell-related.pipe'
import { IsValueHintedPipe } from '../../pipes/is-value-hinted.pipe'
import { IsValueUsedPipe } from '../../pipes/is-value-used.pipe'
import { SudokuBoardComponent } from './sudoku-board.component'

describe('SudokuBoardComponent', () => {
  let component: SudokuBoardComponent
  let fixture: ComponentFixture<SudokuBoardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SudokuBoardComponent,
        IsCellActivePipe,
        IsCellRelatedPipe,
        IsValueHintedPipe,
        IsValueUsedPipe
      ],
      providers: [provideMockStore({})]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuBoardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
