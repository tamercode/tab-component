import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  AfterContentInit,
  ContentChildren,
  ViewChild,
  QueryList,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Directive({
  selector: '[byTabs]'
})
export class TabsDirective implements AfterContentInit, AfterViewInit {
  constructor(private tabContainer: ElementRef) {}

  // @ContentChildren(TabComponent) childrenTab: QueryList<TabComponent>;
  // @ContentChildren(TemplateRef) childrenTabsTemplate: QueryList<TemplateRef<any>>;

  ngAfterContentInit() {}

  ngAfterViewInit() {
    console.log(this.tabContainer);
  }
}
