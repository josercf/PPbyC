import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'display-spinner',
  templateUrl: './display-spinner.component.html'
})
export class DisplaySpinnerComponent implements OnInit {

  @Input() display: boolean;
  constructor() { }

  ngOnInit() {
  }

}
