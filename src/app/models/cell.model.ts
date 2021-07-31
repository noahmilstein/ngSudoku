export class Cell {
  x: number
  y: number

  constructor(init: Cell) {
    Object.assign(this, init)
  }
}
