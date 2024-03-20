import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'demo-render-html-bypass',
  template: `<div [innerHTML]="commentValue">No data</div>`,
})
export class DemoRenderHTMLBypass {
  constructor(private sanitzer: DomSanitizer) {}

  comment = `Hi <img src="none" onerror="alert('OMG')"><b>Syntax</b>`;
  commentValue = this.sanitzer.bypassSecurityTrustHtml(this.comment);
}
