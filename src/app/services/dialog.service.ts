import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { dialogData } from '../models/dialog-data.interface'
import { DialogComponent } from '../components/dialog/dialog.component'

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  sudokuRulesDialog(): MatDialogRef<DialogComponent, any> {
    return this.dialog.open(DialogComponent, {
      width: '400px',
      data: dialogData.sudokuRulesDialogData
    })
  }

  newGameDialog(): MatDialogRef<DialogComponent, any> {
    return this.dialog.open(DialogComponent, {
      width: '250px',
      data: dialogData.newGameDialogData
    })
  }

  restartGameDialog(): MatDialogRef<DialogComponent, any> {
    return this.dialog.open(DialogComponent, {
      width: '250px',
      data: dialogData.restartGameDialogData
    })
  }

  revealSolvedBoardDialog(): MatDialogRef<DialogComponent, any> {
    return this.dialog.open(DialogComponent, {
      width: '250px',
      data: dialogData.revealSolvedBoardDialogData
    })
  }
}
