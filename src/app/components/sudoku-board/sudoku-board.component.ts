import { Component, Input, OnInit } from '@angular/core'
import { ReplaySubject, Subject } from 'rxjs'
import { CellHistory } from 'src/app/models/cell-history.model'
import { Board } from 'src/app/models/game.model'
// tslint:disable: deprecation (https://github.com/ReactiveX/rxjs/issues/4159#issuecomment-466630791)

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrls: ['./sudoku-board.component.scss']
})
export class SudokuBoardComponent implements OnInit {
  // game:
  @Input() solvedBoard: Board // board with game solution
  @Input() displayBoard: Board // clone of solvedBoard with values hidden to display to user

  boardHistory: CellHistory[]
  // number of move
  // coordinate of move
  // before value
  // after value

  activeCell$: Subject<[number, number]>

  constructor() {}

  ngOnInit(): void {
    this.activeCell$ = new ReplaySubject<[number, number]>()
    // TODO :: set to class attribute Subscription objects and create @AutoUnsubscribe() decorator

    this.activeCell$.subscribe({
      next: (cellCoordinates) => {
        console.log(cellCoordinates)
      }
    })
  }

  activateCell(rowIndex: number, columnIndex: number): void {
    this.activeCell$.next([rowIndex, columnIndex])
    // WORKING HERE
    // handle cell click
    // BE CERTAIN to handle all clicking outside of cell
    // create a number pad for the user to click on
    // listen to keyboard actions to fill active cell with clicked numerical key is/when pressed
  }
}
