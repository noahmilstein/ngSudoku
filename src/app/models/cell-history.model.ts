export class CellHistory {
  coordinate: [number, number]
  before: number
  after: number

  constructor(init: CellHistory) {
    Object.assign(this, init)
  }
}
