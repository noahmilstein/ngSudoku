import { Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { Difficulty } from '../models/difficulty.model'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private generateNewGameSource = new BehaviorSubject<Difficulty>(Difficulty.Easy)
  private restartGameSource = new Subject<boolean>()

  generateNewGame$ = this.generateNewGameSource.asObservable()
  restartGame$ = this.restartGameSource.asObservable()

  generateNewGame(difficulty: Difficulty): void {
    this.generateNewGameSource.next(difficulty)
  }

  restartGame(restart: boolean): void {
    this.restartGameSource.next(restart)
  }
}
