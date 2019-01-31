import { Component, OnInit, Input, TemplateRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'by-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, AfterViewInit {
  @Input() title: string;

  constructor() {}

  ngAfterViewInit() {}

  ngOnInit() {}
}
