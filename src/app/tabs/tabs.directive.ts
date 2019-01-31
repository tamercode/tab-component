import { Directive, TemplateRef, ViewContainerRef, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[byTabs]'
})
export class TabsDirective implements AfterContentInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngAfterContentInit() {}


}
