import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { dialogData } from '../models/dialog-data.interface'
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component'

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  newGameDialog(): MatDialogRef<ConfirmationDialogComponent, any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: dialogData.newGameDialogData
    })
  }

  restartGameDialog(): MatDialogRef<ConfirmationDialogComponent, any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: dialogData.restartGameDialogData
    })
  }

  revealSolvedBoardDialog(): MatDialogRef<ConfirmationDialogComponent, any> {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: dialogData.revealSolvedBoardDialogData
    })
  }
}
