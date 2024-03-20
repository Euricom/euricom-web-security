import { Component } from '@angular/core';

@Component({
  selector: 'demo-render-html',
  template: `<div [innerHTML]="comment">No data</div>`,
})
export class DemoRenderHTML {
  comment = `Hi <img src="none" onerror="alert('OMG')"><b>Syntax</b>`;
}
