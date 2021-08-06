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
    this.dialogService.sudokuRulesDialog().afterClosed()
  }

  routeToWiki(): void {
    window.open('https://en.wikipedia.org/wiki/Sudoku')
  }

  routeToGitHub(): void {
    window.open('https://github.com/noahmilstein/ngSudoku')
  }
}
