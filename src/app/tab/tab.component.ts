import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';


@Component({
  selector: 'by-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  animations: [
    trigger('panelInOut', [
        transition('void => *', [
            style({transform: 'translateX(-90%)'}),
            animate(800)
        ]),
        transition('* => void', [
            animate(800, style({transform: 'translateX(+90%)'}))
        ])
    ])
]
})
export class TabComponent implements OnInit {
  @Input() title = 'tab';
  @Input() active = false;
  @Input() visible = true;
  @Input() tabId: string;

  constructor() {}

  ngOnInit() {}
}
