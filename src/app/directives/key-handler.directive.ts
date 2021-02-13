import { Directive, EventEmitter, HostListener, Output } from '@angular/core'

@Directive({
  selector: '[appKeyHandler]'
})
export class KeyHandlerDirective {
  @Output() numericalKeyEvent = new EventEmitter<number>()

  isNumeric(input: string): boolean {
    return !isNaN(parseInt(input, 10)) && !isNaN(parseFloat(input)) && input !== '0'
  }

  @HostListener('document:keyup', ['$event'])
    keyEvent(event: KeyboardEvent): void {
    if (this.isNumeric(event.key)) {
      this.numericalKeyEvent.emit(parseInt(event.key, 10))
    }
  }
}
