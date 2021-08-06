import { Component, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { DialogService } from './services/dialog.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly wikiPath = 'https://en.wikipedia.org/wiki/Sudoku'
  readonly gitHubPath = 'https://github.com/noahmilstein/ngSudoku'

  @ViewChild('drawer', { static: true }) drawer: MatDrawer

  constructor(private dialogService: DialogService) {}

  onMenuClick(): void {
    this.drawer.toggle()
  }

  toggleRulesDialog(): void {
    this.dialogService.sudokuRulesDialog().afterClosed()
  }
}
