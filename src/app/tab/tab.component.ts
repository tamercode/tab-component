import { Component, OnInit, Input, TemplateRef, AfterViewInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'by-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: [
    trigger('panelInOut', [
        transition('void => *', [
            style({transform: 'translateX(-90%)'}),
            animate(400)
        ]),
        transition('* => void', [
            animate(400, style({transform: 'translateX(+90%)'}))
        ])
    ])
]
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
