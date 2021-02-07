import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-key-pad',
  templateUrl: './key-pad.component.html',
  styleUrls: ['./key-pad.component.scss']
})
export class KeyPadComponent implements OnInit {
  // WORKING HERE
  // - key pad component
  //   - click on key pad (update active cell value DISPLAY value >>> check if VALID)
  //   - listen to number key keyboard events (update active cell DISPLAY value >>> check if VALID)
  //   - listen to arrow key keyboard events (update active cell coordinates)
  //   - whenever a cell DISPLAY value is changed, update board history

  constructor() { }

  ngOnInit(): void {}

}
