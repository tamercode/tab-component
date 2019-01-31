import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ContentChild,
  ContentChildren,
  QueryList,
  ViewContainerRef,
  TemplateRef,
  ViewChildren,
  AfterContentInit
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'by-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit {
  constructor(private ref: ChangeDetectorRef) {}

  @ContentChildren(TabComponent) childrenTab: QueryList<TabComponent>;
  @ContentChildren(TemplateRef) childrenTabTemplate: QueryList<TemplateRef<any>>;
  @ViewChild('vc') vc: ViewContainerRef;

  ngOnInit() {}

  ngAfterContentInit() {
    console.log(this.childrenTabTemplate.first);    // Gives you the 1st template child
    console.log(this.childrenTabTemplate.last);     // Last template child (2nd child)
}

  scroll(i: number) {
    // this.sortArray(i);
    // document.getElementById('tab-0').scrollIntoView({ behavior: 'smooth' });
    // const viewRef = this.childrenTab.toArray()[7].;
    // this.vc.move(viewRef, 0);
    // this.childrenTab.toArray()[0].
    // console.log(this.childrenTab.toArray()[0].templateRefchildrenTabTemplate);
    console.log(this.childrenTabTemplate);
  }

  sortArray(i: number) {
    // this.childrenTab[8] = this.childrenTab[i];
    // const item = this.childrenTab.splice(i, 1)[0];
    // this.childrenTab.unshift(item);
    // this.childrenTab = [...this.childrenTab];
  }
}
