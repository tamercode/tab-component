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
  AfterViewChecked,
  HostListener
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { trigger, transition, style, animate } from '@angular/animations';

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
  tabSelected: TabComponent;
  tabSelectedRef: HTMLElement;
  translateValue: number;

  constructor(private ref: ChangeDetectorRef) {}

  @ContentChildren(TabComponent) childrenTab: QueryList<TabComponent>;
  @ViewChild('container') container: ElementRef<Element>;

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.tabSelectedRef) {
      const containerLeft = this.container.nativeElement.getBoundingClientRect().left;
      const tabLeft = this.tabSelectedRef.getBoundingClientRect().left;
      if (tabLeft < containerLeft) { // ottimization
        this.scrollTab(this.container.nativeElement, this.tabSelectedRef);
      }
    }
  }

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
    this.tabSelectedRef = <HTMLElement>(
      this.container.nativeElement.firstElementChild
    );
    this.scrollTab(this.container.nativeElement, this.tabSelectedRef);
  }

  select(tab: TabComponent, el: HTMLElement, containerEl: HTMLElement) {
    console.log(containerEl);
    this.tabSelectedRef = el;
    this.scrollTab(containerEl, el);
    // el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    this.tabSelected.active = false;
    tab.active = true;
    this.tabSelected = tab;
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
