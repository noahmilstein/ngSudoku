export class IconOption {
  text: GamePadKey
  icon: GamePadIcon
  func: () => void
}

export enum GamePadKey {
  Pause = 'Pause',
  Play = 'Play',
  Hint = 'Hint',
  Undo = 'Undo',
  Erase = 'Erase'
}

export enum GamePadIcon {
  Pause = 'pause',
  Play = 'play_arrow',
  Hint = 'help',
  Undo = 'undo',
  Erase = 'clear'
}
