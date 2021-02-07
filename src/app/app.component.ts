import { Component } from '@angular/core'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { difficulties, Difficulty } from './models/difficulty.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngSudoku'
  difficultyLevels = difficulties

  boardForm = this.fb.group({
    difficulty: [Difficulty.Easy, Validators.required]
  })

  get difficultyControl(): FormControl {
    return this.boardForm.get('difficulty') as FormControl
  }

  constructor(private fb: FormBuilder) {}

}
