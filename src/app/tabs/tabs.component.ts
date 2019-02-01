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
  AfterContentInit,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'by-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, AfterViewInit {
  @Output() selectEvent: EventEmitter<number> = new EventEmitter();
  tabSelected: TabComponent;

  constructor(private ref: ChangeDetectorRef) {}

  // @ViewChild('contentTemplate') tpl:
  //   TemplateRef<any>;

  // @ContentChildren(TabComponent, {read: ViewContainerRef}) tabs: QueryList<ViewContainerRef>;
  @ContentChildren(TabComponent) childrenTab: QueryList<TabComponent>;
  // @ViewChild('container') container: HTMLElement;
  // @ContentChildren('tpl') tpl: QueryList<TemplateRef<any>>;

  ngOnInit() {}

  ngAfterContentInit() {
    this.tabSelected = this.childrenTab.find(tab => tab.active);
  }

  ngAfterViewInit() {}

  scroll(tab: TabComponent, i: number) {
    this.tabSelected.active = false;
    tab.active = true;
    this.tabSelected = tab;
    this.selectEvent.emit(i);
    // document.getElementById('tab-0').scrollIntoView({ behavior: 'smooth' });
    //  console.log(this.childrenTabsTemplate);
    // const viewRef = this.childrenTabsTemplate[i].createEmbeddedView(null);
    //  this.vc.move(viewRef, 0);
    // this.childrenTab.toArray()[0].
    // console.log(this.childrenTab.toArray()[0].templateRefchildrenTabsTemplate);
    // console.log(viewRef);
    // console.log(this.vc);
  }

  sortArray(i: number) {
    // this.childrenTab[8] = this.childrenTab[i];
    // const item = this.childrenTab.splice(i, 1)[0];
    // this.childrenTab.unshift(item);
    // this.childrenTab = [...this.childrenTab];
  }

  select(tab: TabComponent, e) {
    const el: HTMLElement = e;
    el.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'start'});
    // el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    this.tabSelected.active = false;
    tab.active = true;
    this.tabSelected = tab;
  }
}
