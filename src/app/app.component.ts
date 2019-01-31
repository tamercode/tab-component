import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'by-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tab-component';
  tabs1 = ['aaaa', 'bbbb', 'ccccc', 'dddd', 'eeeee', 'fffff', 'hhhhh', 'iiiii', 'llll'];
  tabs: string[];
  constructor() {
    this.tabs = this.tabs1.reverse();
  }

  ngOnInit() {}

}
