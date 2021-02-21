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
    { text: GamePadKey.Erase, icon: GamePadIcon.Erase, func: this.handlClear.bind(this) }
  ]
  pausePlay$ = new BehaviorSubject<IconOption[]>(this.baseOptions)
  gameIsActive = true

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.gameIsActive$.pipe(startWith(true)).subscribe(isActive => {
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
    this.data.toggleGameIsActive(!this.gameIsActive)
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

  handlClear(): void {
    console.log('HANDLE CLEAR')
    // clear active cell IF not revealed in original display board
  }
}
