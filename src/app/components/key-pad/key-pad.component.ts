import { Component, OnInit } from '@angular/core'
import { DataService } from 'src/app/services/data.service'

@Component({
  selector: 'app-key-pad',
  templateUrl: './key-pad.component.html',
  styleUrls: ['./key-pad.component.scss']
})
export class KeyPadComponent implements OnInit {
  digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  keyPad: number[][] = []
  size = 3
  // TODO :: rename to NUMBER PAD

  constructor(private dataService: DataService) {}

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

  handleNumbericalKey(digit: number): void {
    const keyPadElement = document.querySelector(`#key_${digit}`)
    keyPadElement?.classList.add('clicked')
    this.dataService.keyPadClick(digit)
    setTimeout(() => {
      keyPadElement?.classList.remove('clicked')
    }, 150)
  }
}
