import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideMockStore } from '@ngrx/store/testing'
import { FormatTimePipe } from '../../pipes/format-time.pipe'
import { GameFormComponent } from './game-form.component'

describe('GameFormComponent', () => {
  let component: GameFormComponent
  let fixture: ComponentFixture<GameFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameFormComponent, FormatTimePipe],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [provideMockStore({})]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
