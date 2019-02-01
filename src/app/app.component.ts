import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'by-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tab-component';
  tabs1 = ['aaaa', 'bbbb', 'ccccc', 'dddd', 'eeeee', 'fffff', 'hhhhhhhhhhhhhhhhhhhhhhhhhhh', 'iiiii', 'llll'];
  tabs: string[];
  constructor() {
    this.tabs = this.tabs1.reverse();
  }

  ngOnInit() {}

  test(i: number) {
    console.log(this.tabs);
   const item = this.tabs.splice(i, 1)[0];
     this.tabs.unshift(item);
     this.tabs = [...this.tabs];
     console.log(this.tabs);
  }

}
