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

  constructor(private ref: ChangeDetectorRef) {}

  @ContentChildren(TabComponent) childrenTab: QueryList<TabComponent>;
  @ViewChild('container') container: ElementRef<Element>;

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.tabSelectedRef) {
      const containerLeft = this.container.nativeElement.getBoundingClientRect()
        .left;
      const containerRight = this.container.nativeElement.getBoundingClientRect()
        .right;
      const tabLeft = this.tabSelectedRef.getBoundingClientRect().left;
      const tabRight = this.tabSelectedRef.getBoundingClientRect().right;
      if (tabLeft < containerLeft || tabRight > containerRight) {
        this.tabSelectedRef.scrollIntoView({
          behavior: 'smooth',
          inline: 'start'
        });
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
    this.container.nativeElement.firstElementChild.scrollIntoView({
      behavior: 'smooth',
      inline: 'end'
    });
  }

  select(tab: TabComponent, el: HTMLElement, containerEl: HTMLElement) {
    console.log(containerEl);
    this.tabSelectedRef = el;
    el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    this.tabSelected.active = false;
    tab.active = true;
    this.tabSelected = tab;
  }

  // isOverflow(container: Element, tab: HTMLElement): any {
  //   const containerLeft = container.getBoundingClientRect().left;
  //   const containerRight = container.getBoundingClientRect().right;
  //   const tabLeft = tab.getBoundingClientRect().left;
  //   const tabRight = tab.getBoundingClientRect().right;
  //   if (tabLeft < containerLeft) {
  //     return 'start';
  //   } else
  //   if (tabLeft < containerLeft) {
  //     return 'end';
  //   } else {
  //     return null;
  //   }
  // }

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
