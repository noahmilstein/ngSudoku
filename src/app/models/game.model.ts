export class Game {
  solvedBoard: Board
  displayBoard: Board

  constructor(init: Game) {
    Object.assign(this, init)
  }
}

export type Board = number[][]
