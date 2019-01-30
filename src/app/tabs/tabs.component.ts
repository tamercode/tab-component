import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'by-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor(private ref: ChangeDetectorRef) { }

  tabs = ['aaaa', 'bbbb', 'ccccc', 'dddd', 'eeeee', 'fffff', 'hhhhh', 'iiiii', 'llll'].reverse();

  ngOnInit() {
   // console.log(this.tabs);
  }

  scroll(i: number) {
    this.sortArray(i);
    document.getElementById('tab-0').scrollIntoView({behavior: 'smooth'});
  }

  sortArray(i: number) {
    const item = this.tabs.splice(i, 1)[0];
    this.tabs.unshift(item);
    this.tabs = [...this.tabs];
  }

}
