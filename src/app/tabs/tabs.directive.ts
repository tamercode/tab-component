import {
  Directive,
  AfterContentInit,
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Output,
  Input
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { FF_EQUALS } from 'ng-zorro-antd';

@Directive({
  selector: '[byTabs]'
})
export class TabsDirective implements AfterContentInit, AfterViewInit {
  elements: Array<{ element: Element; tabComponent: TabComponent }>;
  private options = {
    threshold: 1
  };
  private _intersectionObserver?: IntersectionObserver;

  @Input('byTabs') childrenTab: TabComponent[];

  constructor(private tabContainer: ElementRef) {}

  ngAfterContentInit() {}

  ngAfterViewInit() {
    let refArray = Array.from(this.tabContainer.nativeElement.childNodes);
    refArray = refArray.filter((ref: Element) => ref.nodeType !== ref.COMMENT_NODE);
    this.elements = refArray.map((el: Element, index: number) => {
      return {
        element: el,
        tabComponent: this.childrenTab[index]
      };
    });
    this._intersectionObserver = new IntersectionObserver(entries => {
      this.checkForIntersection(entries);
    }, this.options);
    this.elements.forEach(
      (elemet: { element: Element; tabComponent: TabComponent }) =>
        this._intersectionObserver.observe(elemet.element)
    );
  }

  private checkForIntersection(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry: IntersectionObserverEntry, index: number) => {
      const element = entry.target;
      const tabId = element.id;
      const findElement = this.elements.find(el => el.element.id === tabId);
      const ratio = entry.intersectionRatio;
        // console.log(entry.boundingClientRect);
        // console.log(entry.intersectionRect);
        // console.log(entry.isIntersecting);
        // console.log(entry.rootBounds);
        // console.log(entry.target);
        // console.log(entry.time);
        if (ratio < 1) {
          findElement.tabComponent.visible = false;
        }
        if (ratio >= 1) {
          findElement.tabComponent.visible = true;
        }
    });
  }
}
