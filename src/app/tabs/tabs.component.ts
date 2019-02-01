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
  EventEmitter,
  AfterContentChecked,
  AfterViewChecked
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'by-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit, AfterViewInit, AfterContentChecked, AfterViewChecked {
  @Output() selectEvent: EventEmitter<number> = new EventEmitter();
  tabSelected: TabComponent;

  constructor(private ref: ChangeDetectorRef) {}

  // @ViewChild('contentTemplate') tpl:
  //   TemplateRef<any>;

  // @ContentChildren(TabComponent, {read: ViewContainerRef}) tabs: QueryList<ViewContainerRef>;
  @ContentChildren(TabComponent) childrenTab: QueryList<TabComponent>;
  @ContentChildren('target', {read: ElementRef}) childrenTabRef: QueryList<ElementRef>;
  @ViewChild('container') container: ElementRef;
  // @ContentChildren('tpl') tpl: QueryList<TemplateRef<any>>;

  ngOnInit() {}

  ngAfterContentInit() {
    this.tabSelected = this.childrenTab.find(tab => tab.active);
  }

  ngAfterViewChecked() {}

  ngAfterViewInit() {}

  ngAfterContentChecked() {}

  scroll(tab: TabComponent, i: number) {
    this.tabSelected.active = false;
    tab.active = true;
    this.tabSelected = tab;
    this.selectEvent.emit(i);
     this.container.nativeElement.firstElementChild.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'end'});
    // setTimeout(() => {
    // //  this.childrenTabRef..scrollIntoView({behavior: 'smooth', block: 'end', inline: 'end'});
    //   debugger
    // }, 2000);
  }

  select(tab: TabComponent, el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'start'});
    this.tabSelected.active = false;
    tab.active = true;
    this.tabSelected = tab;
  }

  // isOverflow(el: HTMLElement): boolean {
  //   const containerLeft = this.container.nativeElement.getBoundingClientRect().left;
  //   const containerRight = this.container.nativeElement.getBoundingClientRect().right;
  //   const elLeft = el.getBoundingClientRect().left;
  //   const elRight = el.getBoundingClientRect().right;
  //   if (elLeft < containerLeft || elRight > containerRight) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
