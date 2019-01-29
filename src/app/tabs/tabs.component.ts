import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'by-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor() { }

  tabs = ['aaaa', 'bbbb', 'ccccc', 'dddd', 'eeeee', 'fffff', 'hhhhh', 'iiiii', 'llll'].reverse();

  ngOnInit() {
    console.log(this.tabs);
  }

  scroll(id: string) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
  }

  sortArray(i: number) {
    this.tabs = [...this.tabs.concat(this.tabs.splice(i, 1))];
  }

}
