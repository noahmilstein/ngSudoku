export class DifficultyDisplay {
  display: string
  value: number

  constructor(init?: Partial<DifficultyDisplay>) {
    Object.assign(this, init)
  }
}

export enum Difficulty {
  Easy = 38,
  Medium = 30,
  Hard = 25,
  Expert = 23
}

export const difficulties = Object.keys(Difficulty).reduce((total, diff) => {
  if (Number.isInteger(parseInt(diff, 10))) {
    const displayObj = new DifficultyDisplay({
      display: Difficulty[parseInt(diff, 10)],
      value: parseInt(diff, 10)
    })
    return [...total, displayObj]
  }
  return total
}, [] as DifficultyDisplay[]).reverse()
