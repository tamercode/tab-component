import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ContentChildren,
  AfterContentInit,
  Output,
  EventEmitter,
  HostListener,
  QueryList,
  Input,
  TemplateRef
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'by-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent
  implements
    OnInit,
    AfterContentInit {
  @Input() tabTemplate: TemplateRef<any>;
  @Input() tabStyle = 'tab';
  @Input() tabSelectedStyle = 'tab-selected';
  @Input() firstTabStyle = 'first-tab';
  @Output() selectEvent: EventEmitter<number> = new EventEmitter();
  tabSelected: {elementRef: HTMLElement, tabComponent: TabComponent} = {elementRef: null, tabComponent: null};

  constructor() {}

  @ContentChildren(TabComponent)
  set _childrenTab (_childrenTab: QueryList<TabComponent>) {
    this.childrenTab = _childrenTab.toArray().reverse();
  }
  @ViewChild('tabContainerRef') tabContainerRef: ElementRef<Element>;

  childrenTab: TabComponent[];

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.tabSelected.elementRef) {
      const containerLeft = this.tabContainerRef.nativeElement.getBoundingClientRect().left;
      const tabLeft = this.tabSelected.elementRef.getBoundingClientRect().left;
      if (tabLeft < containerLeft) { // ottimization
        this.scrollTab(this.tabContainerRef.nativeElement, this.tabSelected.elementRef);
      }
    }
  }

  ngAfterContentInit() {
    this.tabSelected.tabComponent = this.childrenTab.find(tab => tab.active);
  }

  onJumpToTab(tab: TabComponent, i: number) {
    this.tabSelected.tabComponent.active = false;
    this.tabSelected.tabComponent = tab;
    this.tabSelected.tabComponent.active = true;
    this.selectEvent.emit((this.childrenTab.length - 1) - i);
    this.tabSelected.elementRef = <HTMLElement>(
      this.tabContainerRef.nativeElement.firstElementChild
    );
    this.scrollTab(this.tabContainerRef.nativeElement, this.tabSelected.elementRef);
  }

  onSelect(tab: TabComponent, tabRef: HTMLElement) {
    this.tabSelected.tabComponent.active = false;
    this.tabSelected.tabComponent = tab;
    this.tabSelected.tabComponent.active = true;
    this.tabSelected.elementRef = tabRef;
    this.scrollTab(this.tabContainerRef.nativeElement, this.tabSelected.elementRef);
  }

  scrollTab(container: Element, tab: HTMLElement): void {
    const containerLeft =  container.getBoundingClientRect().left;
    const containerRight = container.getBoundingClientRect().right;
    const tabLeft = tab.getBoundingClientRect().left;
    const tabRight = tab.getBoundingClientRect().right;
    const scrollLeftContainer = container.scrollLeft;
    debugger
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

  setTabClasses(index: number, tab: TabComponent) {
    const classes = {
      [this.firstTabStyle]: index === this.childrenTab.length - 1,
      [this.tabStyle]: index < this.childrenTab.length - 1,
      [this.tabSelectedStyle]: tab.active,
    };
    return classes;
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
