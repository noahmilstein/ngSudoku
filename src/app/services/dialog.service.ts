import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component'

export interface DialogData {
  title: string
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  newGameDialog(): MatDialogRef<ConfirmationDialogComponent, any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: 'Create New Game',
        message:
          'Are you sure you want to create a new game? Your progress will be lost.'
      }
    })
  }

  restartGameDialog(): MatDialogRef<ConfirmationDialogComponent, any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: 'Restart Game',
        message:
          'Are you sure you want to restart this game? Your progress will be lost.'
      }
    })
  }
  revealSolvedBoardDialog(): MatDialogRef<ConfirmationDialogComponent, any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        title: 'Reveal Solved Board',
        message:
          'Are you sure you want to reveal the solved board? This will end your game.'
      }
    })
  }
}
