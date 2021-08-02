import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { NumberPadComponent } from './number-pad.component'

describe('KeyPadComponent', () => {
  let component: NumberPadComponent
  let fixture: ComponentFixture<NumberPadComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberPadComponent],
      providers: [provideMockStore({})]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberPadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
