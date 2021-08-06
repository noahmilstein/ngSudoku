import { Component, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { first } from 'rxjs/operators'
import { DialogService } from './services/dialog.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer', { static: true }) drawer: MatDrawer

  constructor(private dialogService: DialogService) {}

  onMenuClick(): void {
    this.drawer.toggle()
  }

  toggleRulesDialog(): void {
    // Every square has to contain a single number
    // Only the numbers from 1 through to 9 can be used
    // Each 3×3 box can only contain each number from 1 to 9 once
    // Each vertical column can only contain each number from 1 to 9 once
    // Each horizontal row can only contain each number from 1 to 9 once

    this.dialogService.sudokuRulesDialog().afterClosed()
  }

  routeToWiki(): void {
    window.open('https://en.wikipedia.org/wiki/Sudoku')
  }

  routeToGitHub(): void {
    window.open('https://github.com/noahmilstein/ngSudoku')
  }
}
