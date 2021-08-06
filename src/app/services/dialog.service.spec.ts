import { TestBed } from '@angular/core/testing'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'
import { DialogService } from './dialog.service'
import { DialogComponent } from '../components/dialog/dialog.component'
import { dialogData } from '../models/dialog-data.interface'

describe('DialogService', () => {
  let service: DialogService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, BrowserAnimationsModule],
      declarations: [DialogComponent]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [DialogComponent]
      }
    })
    service = TestBed.inject(DialogService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('newGameDialog should be return expected dialog', () => {
    const dialog = service.newGameDialog()
    expect(dialog instanceof MatDialogRef).toBeTrue
    expect(dialog.componentInstance.data).toEqual(dialogData.newGameDialogData)
  })

  it('restartGameDialog should be return expected dialog', () => {
    const dialog = service.restartGameDialog()
    expect(dialog instanceof MatDialogRef).toBeTrue
    expect(dialog.componentInstance.data).toEqual(
      dialogData.restartGameDialogData
    )
  })

  it('revealSolvedBoardDialog should be return expected dialog', () => {
    const dialog = service.revealSolvedBoardDialog()
    expect(dialog instanceof MatDialogRef).toBeTrue
    expect(dialog.componentInstance.data).toEqual(
      dialogData.revealSolvedBoardDialogData
    )
  })
})
