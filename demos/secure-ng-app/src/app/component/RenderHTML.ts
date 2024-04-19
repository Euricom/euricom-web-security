import { Component } from '@angular/core';

@Component({
  selector: 'render-html',
  template: `<div>
    <h2>Render HTML</h2>
    <p-card header="Attack">
      <router-outlet></router-outlet>
    </p-card>
  </div>`,
})
export class RenderHTML {}
