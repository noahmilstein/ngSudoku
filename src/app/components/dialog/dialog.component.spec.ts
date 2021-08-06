import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog'
import { By } from '@angular/platform-browser'
import { dialogData } from '../../models/dialog-data.interface'
import { DialogComponent } from './dialog.component'

describe('ConfirmationDialogComponent', () => {
  let component: DialogComponent
  let fixture: ComponentFixture<DialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => true } },
        { provide: MAT_DIALOG_DATA, useValue: dialogData.newGameDialogData }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('dialog should display expected data', () => {
    const dialogTitle = fixture.debugElement.query(By.css('.mat-dialog-title'))
      .nativeElement.innerHTML
    const dialogMessage = fixture.debugElement.query(By.css('#dialog-message'))
      .nativeElement.innerHTML

    expect(dialogTitle).toEqual(dialogData.newGameDialogData.title)
    expect(dialogMessage).toEqual(dialogData.newGameDialogData.message)
  })

  it('clicking on the first/left button should close the dialogRef', () => {
    const dialogRefSpy = jest.spyOn(component.dialogRef, 'close')
    component.onBtnClick(dialogData.newGameDialogData.buttons[0].payload)

    expect(dialogRefSpy).toHaveBeenCalledWith(true)
    expect(dialogRefSpy).toHaveBeenCalledTimes(1)
  })
})
