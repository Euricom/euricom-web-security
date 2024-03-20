import { Component } from '@angular/core';

@Component({
  selector: 'demo-render-url',
  template: `<a [href]="evilUrl">Click me</a>`,
})
export class DemoRenderURL {
  evilUrl = "javascript:alert('OMG')";
}
