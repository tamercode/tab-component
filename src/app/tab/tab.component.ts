import { Component, OnInit, Input, TemplateRef, AfterViewInit, Output, EventEmitter, ElementRef } from '@angular/core';


@Component({
  selector: 'by-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, AfterViewInit {
  @Input() title = 'tab';
  @Input() active = false;
  @Input() visible = true;
  @Input() tabId: string;
  public elementRef: ElementRef;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.elementRef = this.el;
  }

  ngOnInit() {}
}
