import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectGameIsSolved } from '@store/game-is-solved/game-is-solved.selectors'
import { AppStore } from '@store/app-store.model'
import { selectGameIsActive } from '@store/game-is-active/game-is-active.selectors'
import { numberPadClickNumberPad } from './number-pad.actions'

@Component({
  selector: 'app-number-pad',
  templateUrl: './number-pad.component.html',
  styleUrls: ['./number-pad.component.scss']
})
export class NumberPadComponent implements OnInit {
  digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  keyPad: number[][] = []
  size = 3
  gameIsActive$ = this.store.select(selectGameIsActive)
  gameIsSolved$ = this.store.select(selectGameIsSolved)

  constructor(private store: Store<AppStore>) {}

  ngOnInit(): void {
    this.keyPad = this.generateKeyPad()
  }

  generateKeyPad(): number[][] {
    const keyPad: number[][] = []
    for (let i = 0; i < this.size; i++) {
      const numberRow = this.digits.slice(
        i * this.size,
        i * this.size + this.size
      )
      keyPad.push(numberRow)
    }
    return keyPad
  }

  handleNumericalKey(digit: number): void {
    if (!this.digits.includes(digit)) {
      return
    }
    const keyPadElement = document.querySelector(`#key_${digit}`)
    keyPadElement?.classList.add('clicked')
    this.store.dispatch(numberPadClickNumberPad({ digit }))
    setTimeout(() => {
      keyPadElement?.classList.remove('clicked')
    }, 150)
  }
}
