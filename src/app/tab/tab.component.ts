import { Component, OnInit, Input, TemplateRef, AfterViewInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'by-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() active: boolean;

  constructor() {}

  ngAfterViewInit() {}

  ngOnInit() {}
}
