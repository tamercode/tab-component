import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'by-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tabs = [
    'aaaa',
    'bbbb',
    'ccccc',
    'dddd',
    'eeeee',
    'fffff',
    'ggggg',
    'hhhhhhhhhhhhhhhhhhhhhhhhhhh',
    'iiiii',
    'llll'
  ];

  @ViewChild('container') container: ElementRef;

  constructor() {}

  ngOnInit() {}

  moveToTheEnd(i: number) {
   this.tabs = this.tabs.concat(this.tabs.splice(i, 1));
  }
}
