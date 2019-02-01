import {
  Directive,
  AfterContentInit,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Output,
  ContentChildren,
  QueryList,
  Input
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Directive({
  selector: '[byTabs]'
})
export class TabsDirective implements AfterContentInit, AfterViewInit {
  elements: Array<{ element: Element; tabComponent: TabComponent }>;
  private options = {
    threshold: [0.5]
  };
  private _intersectionObserver?: IntersectionObserver;

  @Input('byTabs')
  private set _childrenTab(_childrenTab: QueryList<TabComponent>) {
    if (!_childrenTab) {
      return;
    }
    this.childrenTab = _childrenTab.toArray();
  }
  private childrenTab: TabComponent[];

  @Output() public out: EventEmitter<number> = new EventEmitter();
  @Output() public in: EventEmitter<number> = new EventEmitter();

  constructor(private tabContainer: ElementRef) {}

  ngAfterContentInit() {}

  ngAfterViewInit() {
    const refArray = Array.from(this.tabContainer.nativeElement.childNodes);
    refArray.shift();
    this.elements = refArray.map(
      (el: Element, index: number) => {
        return {
          element: el,
          tabComponent: this.childrenTab[index]
        };
      }
    );
    this._intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    }, {});
    this.elements.forEach(
      (elemet: { element: Element; tabComponent: TabComponent }) =>
        this._intersectionObserver.observe(elemet.element)
    );
  }

  private checkForIntersection(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry: IntersectionObserverEntry, index: number) => {
      const ratio = entry.intersectionRatio;
      const element = entry.target;
      const tabId = element.id;
      if (ratio > 0) {
        // in
        this.elements.find(
          el => el.element.id === tabId
        ).tabComponent.visible = true;
        console.log('mettilo fuori');
      } else {
        // out
        this.elements.find(
          el => el.element.id === tabId
        ).tabComponent.visible = false;
        console.log('mettilo dentro');
      }
    });
  }
}
