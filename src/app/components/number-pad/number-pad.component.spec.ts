import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { provideMockStore } from '@ngrx/store/testing'
import { AppStore } from '../../store/app-store.model'
import { NumberPadComponent } from './number-pad.component'

describe('KeyPadComponent', () => {
  let component: NumberPadComponent
  let fixture: ComponentFixture<NumberPadComponent>
  let store: Store<AppStore>
  let storeSpy: jest.SpyInstance

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberPadComponent],
      providers: [provideMockStore({})]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberPadComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    storeSpy = jest.spyOn(store, 'dispatch')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should create keyPad onInit', () => {
    expect(component.keyPad.length).toEqual(3)
    component.keyPad.forEach((row) => {
      expect(row.length).toEqual(3)
    })
  })

  it('generateKeyPad should create keyPad', () => {
    const keyPad = component.generateKeyPad()
    expect(keyPad.length).toEqual(3)
    keyPad.forEach((row) => {
      expect(row.length).toEqual(3)
    })
  })

  it('handleNumericalKey should dispatch action', () => {
    component.handleNumericalKey(3)
    expect(storeSpy).toHaveBeenCalledWith({
      digit: 3,
      type: '[Number Pad] Click Number Pad'
    })
  })

  it('handleNumericalKey should handle for invalid input', () => {
    component.handleNumericalKey(0)
    expect(storeSpy).not.toHaveBeenCalled()
  })
})
