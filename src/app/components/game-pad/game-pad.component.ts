import { Component, OnInit, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subscription } from 'rxjs'
import { startWith } from 'rxjs/operators'
import { AutoUnsubscribe } from 'src/app/decorators/auto-unsubscribe'
import { GamePadIcon, GamePadKey, IconOption } from 'src/app/models/game-pad.model'
import { DataService } from 'src/app/services/data.service'

@Component({
  selector: 'app-game-pad',
  templateUrl: './game-pad.component.html',
  styleUrls: ['./game-pad.component.scss']
})
@AutoUnsubscribe()
export class GamePadComponent implements OnInit, OnDestroy {
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

  gameIsActiveSubscription: Subscription

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.gameIsActiveSubscription = this.dataService.gameIsActive$.pipe(startWith(true)).subscribe(isActive => {
      this.gameIsActive = isActive
      const options = [...this.baseOptions, this.getPlayOption(isActive)]
      this.pausePlay$.next(options)
    })
  }

  ngOnDestroy(): void {}

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

  handleHint(): void {
    this.dataService.setHint()
  }

  handleUndo(): void {
    this.dataService.handleUndo()
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
