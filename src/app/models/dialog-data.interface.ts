export interface DialogData {
  title: string
  message: string
}

export const dialogData = {
  newGameDialogData: {
    title: 'Create New Game',
    message:
      'Are you sure you want to create a new game? Your progress will be lost.'
  },
  restartGameDialogData: {
    title: 'Restart Game',
    message:
      'Are you sure you want to restart this game? Your progress will be lost.'
  },
  revealSolvedBoardDialogData: {
    title: 'Reveal Solved Board',
    message:
      'Are you sure you want to reveal the solved board? This will end your game.'
  }
}
