import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-key-pad',
  templateUrl: './key-pad.component.html',
  styleUrls: ['./key-pad.component.scss']
})
export class KeyPadComponent implements OnInit {
  digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  keyPad: number[][] = []
  size = 3


  // WORKING HERE
  // - key pad component
  //   - click on key pad (update active cell value DISPLAY value >>> check if VALID)
  //   - listen to number key keyboard events (update active cell DISPLAY value >>> check if VALID)
  //   - listen to arrow key keyboard events (update active cell coordinates)
  //   - whenever a cell DISPLAY value is changed, update board history

  constructor() { }

  ngOnInit(): void {
    this.keyPad = this.generateKeyPad()
  }
  generateKeyPad(): number[][] {
    const keyPad: number[][] = []
    for (let i = 0; i < this.size; i++) {
      const numberRow = this.digits.slice(i * this.size, i * this.size + this.size)
      keyPad.push(numberRow)
    }
    return keyPad
  }

  handlePadClick(digit: number): void {
    console.log(digit)
  }
}
