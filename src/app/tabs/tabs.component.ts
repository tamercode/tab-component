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
export class TabsComponent
  implements
    OnInit,
    AfterContentInit,
    AfterViewInit,
    AfterContentChecked,
    AfterViewChecked {
  @Output() selectEvent: EventEmitter<number> = new EventEmitter();
  tabSelected: TabComponent;

  constructor(private ref: ChangeDetectorRef) {}

  @ContentChildren(TabComponent) childrenTab: QueryList<TabComponent>;
  @ViewChild('container') container: ElementRef;

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
    this.container.nativeElement.firstElementChild.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'end'
    });
  }

  select(tab: TabComponent, el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
    this.tabSelected.active = false;
    tab.active = true;
    this.tabSelected = tab;
  }

  onIn(index: number): void {
    console.log('in ', index);
    this.childrenTab.toArray()[index].visible = true;
  }

  onOut(index: number): void {
    console.log('out ', index);
    this.childrenTab.toArray()[index].visible = false;
  }
}
