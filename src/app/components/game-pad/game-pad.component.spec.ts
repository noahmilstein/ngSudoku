import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { Store } from '@ngrx/store'
import { provideMockStore } from '@ngrx/store/testing'
import { AppStore } from '../../store/app-store.model'
import { mockStoreBaseState } from '../../mock-data/mock-store'
import { GamePadComponent } from './game-pad.component'

describe('GamePadComponent', () => {
  let component: GamePadComponent
  let fixture: ComponentFixture<GamePadComponent>
  let store: Store<AppStore>
  let storeSpy: jest.SpyInstance

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamePadComponent],
      imports: [MatIconModule],
      providers: [
        provideMockStore({
          initialState: mockStoreBaseState
        })
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePadComponent)
    component = fixture.componentInstance
    store = TestBed.inject(Store)
    storeSpy = jest.spyOn(store, 'dispatch')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('toggleActive should dispatch action', () => {
    component.toggleActive()
    expect(storeSpy).toHaveBeenCalledWith({
      type: '[Game Pad] Toggle Game Is Active'
    })
  })

  it('handleHint should dispatch action', () => {
    component.handleHint()
    expect(storeSpy).toHaveBeenCalledWith({ type: '[Game Pad] Set New Hint' })
  })

  it('handleUndo should dispatch action', () => {
    component.handleUndo()
    expect(storeSpy).toHaveBeenCalledWith({ type: '[Game Pad] Undo' })
  })

  it('handleClear should dispatch action', () => {
    component.handleClear()
    expect(storeSpy).toHaveBeenCalledWith({ type: '[Game Pad] Clear' })
  })
})
