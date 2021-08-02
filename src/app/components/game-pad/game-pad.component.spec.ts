import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material/icon'
import { MatIconTestingModule } from '@angular/material/icon/testing'
import { provideMockStore } from '@ngrx/store/testing'
import { GamePadComponent } from './game-pad.component'

describe('GamePadComponent', () => {
  let component: GamePadComponent
  let fixture: ComponentFixture<GamePadComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamePadComponent],
      imports: [MatIconTestingModule, MatIconModule],
      providers: [
        provideMockStore({
          initialState: {
            // WORKING HERE :: create mock/testing data
            difficulty: null,
            solvedBoard: [],
            displayBoard: [],
            initialBoard: [],
            boardHistory: [],
            gameIsActive: false,
            gameIsSolved: false,
            activeCell: {},
            lockBoard: false,
            lockedCoordinates: [],
            hints: []
          }
        })
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePadComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
