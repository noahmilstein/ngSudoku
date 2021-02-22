import { Component, OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { startWith } from 'rxjs/operators'
import { GamePadIcon, GamePadKey, IconOption } from 'src/app/models/game-pad.model'
import { DataService } from 'src/app/services/data.service'

@Component({
  selector: 'app-game-pad',
  templateUrl: './game-pad.component.html',
  styleUrls: ['./game-pad.component.scss']
})
export class GamePadComponent implements OnInit {
  // tslint:disable: deprecation (https://github.com/ReactiveX/rxjs/issues/4159#issuecomment-466630791)
  playOptions: IconOption[] = [
    { text: GamePadKey.Pause, icon: GamePadIcon.Pause, func: this.toggleActive.bind(this) },
    { text: GamePadKey.Play, icon: GamePadIcon.Play, func: this.toggleActive.bind(this) }
  ]
  baseOptions: IconOption[] = [
    { text: GamePadKey.Hint, icon: GamePadIcon.Hint, func: this.handleHint.bind(this) },
    { text: GamePadKey.Undo, icon: GamePadIcon.Undo, func: this.handleUndo.bind(this) },
    { text: GamePadKey.Erase, icon: GamePadIcon.Erase, func: this.handleClear.bind(this) }
  ]
  pausePlay$ = new BehaviorSubject<IconOption[]>(this.baseOptions)
  gameIsActive = true

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.gameIsActive$.pipe(startWith(true)).subscribe(isActive => {
      this.gameIsActive = isActive
      const options = [...this.baseOptions, this.getPlayOption(isActive)]
      this.pausePlay$.next(options)
    })
  }

  getPlayOption(isActive: boolean): IconOption {
    return this.playOptions
      .find(opt =>
        isActive ?
        opt.text === GamePadKey.Pause :
        opt.text === GamePadKey.Play) as IconOption
  }

  toggleActive(): void {
    this.dataService.toggleGameIsActive(!this.gameIsActive)
  }

  // WORKING HERE ::
  //  - update styling
  //  - update logic for handleHint, handleUndo, and handleClear

  handleHint(): void {
    console.log('HANDLE HINT')
  }

  handleUndo(): void {
    console.log('HANDLE UNDO')
    // this requires game history
  }

  handleClear(): void {
    this.dataService.keyPadClick(0)
  }

  handleClick(optionText: string): void {
    const keyPadElement = document.querySelector(`#${optionText}`)
    keyPadElement?.classList.add('clicked')
    setTimeout(() => {
      keyPadElement?.classList.remove('clicked')
    }, 150)
  }
}
