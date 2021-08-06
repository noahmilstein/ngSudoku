export interface DialogData {
  title: string
  message: string
  buttons?: ButtonData[]
}

export interface ButtonData {
  text: string
  payload: boolean
}

const confirmationButtons: ButtonData[] = [
  {
    text: 'Yes',
    payload: true
  },
  {
    text: 'No',
    payload: false
  }
]

export const dialogData = {
  newGameDialogData: {
    title: 'Create New Game',
    message:
      'Are you sure you want to create a new game? Your progress will be lost.',
    buttons: confirmationButtons
  },
  restartGameDialogData: {
    title: 'Restart Game',
    message:
      'Are you sure you want to restart this game? Your progress will be lost.',
    buttons: confirmationButtons
  },
  revealSolvedBoardDialogData: {
    title: 'Reveal Solved Board',
    message:
      'Are you sure you want to reveal the solved board? This will end your game.',
    buttons: confirmationButtons
  },
  sudokuRulesDialogData: {
    title: 'Sudoku Rules',
    message: `- Each cell must contain a number<br>
      - Only the digits 1-9 may be used<br>
      - Each 9 cell horizontal row must contain exactly one instance of each 1-9 digit<br>
      - Each 9 cell vertical column must contain exactly one instance of each 1-9 digit<br>
      - Each 3×3 box must contain exactly one instance of each 1-9 digit`
  }
}
