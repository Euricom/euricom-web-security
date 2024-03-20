import { Component } from '@angular/core';

@Component({
  selector: 'demo-html-escaping',
  template: `<div>Some value that will be rendered: {{ unsafeValue }}</div> `,
})
export class DemoHTMLEscaping {
  unsafeValue = `Value<img src="#" onerror="alert('OMG')">`;
}
