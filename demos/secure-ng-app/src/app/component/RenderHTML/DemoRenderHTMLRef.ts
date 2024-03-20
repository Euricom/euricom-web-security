import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'demo-render-html-ref',
  template: `<div #myDiv>No data</div>`,
})
export class DemoRenderHTMLRef {
  comment = `Hi <img src="none" onerror="alert('OMG')"><b>Syntax</b>`;

  // obtain a native DOM element
  @ViewChild('myDiv')
  myDiv: ElementRef;

  ngAfterViewInit() {
    this.myDiv.nativeElement.innerHTML = this.comment;
  }
}
