import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Difficulty } from '../models/difficulty.model'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private generateNewGameSource = new BehaviorSubject<Difficulty>(Difficulty.Easy)
  private restartGameSource = new Subject<boolean>()
  private keyPadClickSource = new Subject<number>()

  generateNewGame$ = this.generateNewGameSource.asObservable()
  restartGame$ = this.restartGameSource.asObservable()
  keyPadClick$ = this.keyPadClickSource.asObservable()

  generateNewGame(difficulty: Difficulty): void {
    this.generateNewGameSource.next(difficulty)
  }

  restartGame(restart: boolean): void {
    this.restartGameSource.next(restart)
  }

  keyPadClick(key: number): void {
    this.keyPadClickSource.next(key)
  }
}
