import { ComponentFixture, TestBed } from '@angular/core/testing'
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog'
import { By } from '@angular/platform-browser'
import { DialogData } from '../../services/dialog.service'
import { ConfirmationDialogComponent } from './confirmation-dialog.component'

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent
  let fixture: ComponentFixture<ConfirmationDialogComponent>
  const dialogData: DialogData = { title: 'hello', message: 'world' }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => true } },
        { provide: MAT_DIALOG_DATA, useValue: dialogData }
      ]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent)
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

    expect(dialogTitle).toEqual(dialogData.title)
    expect(dialogMessage).toEqual(dialogData.message)
  })

  it('clicking on the "yes" button should close the dialogRef', () => {
    const dialogRefSpy = jest.spyOn(component.dialogRef, 'close')
    component.onYesClick()

    expect(dialogRefSpy).toHaveBeenCalledWith(true)
    expect(dialogRefSpy).toHaveBeenCalledTimes(1)
  })
})
