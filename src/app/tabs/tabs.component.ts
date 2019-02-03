import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ContentChildren,
  AfterContentInit,
  AfterViewInit,
  Output,
  EventEmitter,
  AfterContentChecked,
  AfterViewChecked,
  HostListener,
  QueryList
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'by-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent
  implements
    OnInit,
    AfterContentInit,
    AfterViewInit,
    AfterContentChecked,
    AfterViewChecked {
  @Output() selectEvent: EventEmitter<number> = new EventEmitter();
  tabSelected: {elementRef: HTMLElement, tabComponent: TabComponent} = {elementRef: null, tabComponent: null};
  translateValue: number;

  constructor(private ref: ChangeDetectorRef) {}

  @ContentChildren(TabComponent)
  set _childrenTab (_childrenTab: QueryList<TabComponent>) {
    this.childrenTab = _childrenTab.toArray().reverse();
    console.log('lista-interna ', this.childrenTab);
  }
  @ViewChild('container') container: ElementRef<Element>;

  childrenTab: TabComponent[];

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.tabSelected.elementRef) {
      const containerLeft = this.container.nativeElement.getBoundingClientRect().left;
      const tabLeft = this.tabSelected.elementRef.getBoundingClientRect().left;
      if (tabLeft < containerLeft) { // ottimization
        this.scrollTab(this.container.nativeElement, this.tabSelected.elementRef);
      }
    }
  }

  ngAfterContentInit() {
    this.tabSelected.tabComponent = this.childrenTab.find(tab => tab.active);
  }

  ngAfterViewChecked() {}

  ngAfterViewInit() {}

  ngAfterContentChecked() {}

  jumpToTab(tab: TabComponent, i: number) {
    this.tabSelected.tabComponent.active = false;
    this.tabSelected.tabComponent = tab;
    this.tabSelected.tabComponent.active = true;
    this.selectEvent.emit((this.childrenTab.length - 1) - i);
    this.tabSelected.elementRef = <HTMLElement>(
      this.container.nativeElement.firstElementChild
    );
    this.scrollTab(this.container.nativeElement, this.tabSelected.elementRef);
  }

  select(tab: TabComponent, el: HTMLElement, containerEl: HTMLElement) {
    this.tabSelected.elementRef = el;
    this.scrollTab(containerEl, this.tabSelected.elementRef);
    this.tabSelected.tabComponent.active = false;
    this.tabSelected.tabComponent = tab;
    this.tabSelected.tabComponent.active = true;
  }

  scrollTab(container: Element, tab: HTMLElement): void {
    const containerLeft =  container.getBoundingClientRect().left;
    const containerRight = container.getBoundingClientRect().right;
    const tabLeft = tab.getBoundingClientRect().left;
    const tabRight = tab.getBoundingClientRect().right;
    const scrollLeftContainer = container.scrollLeft;
    if (tabLeft < containerLeft) {
      const offset = containerLeft - tabLeft;
      container.scrollTo({
        top: 0,
        left: scrollLeftContainer - offset,
        behavior: 'smooth'
      });
    } else if (tabRight > containerRight) {
      const offset = containerRight - tabRight;
      container.scrollTo({
        top: 0,
        left: scrollLeftContainer - offset,
        behavior: 'smooth'
      });
    }
  }

  // scrollTab(container: Element, tab: HTMLElement): void {
  //   const direction = this.isOverflow(container, tab);
  //   if (direction) {
  //     tab.scrollIntoView({
  //       behavior: 'smooth',
  //       inline: direction
  //     });
  //   }
  // }
}
