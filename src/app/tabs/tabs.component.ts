import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'by-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor() { }

  tabs = ['aaaa', 'bbbb', 'ccccc', 'dddd', 'eeeee', 'fffff', 'hhhhh', 'iiiii', 'llll'];

  ngOnInit() {
  }

  scroll(id: string) {
    document.getElementById(id).scrollIntoView();
  }

}
