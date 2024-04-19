import { Component } from '@angular/core';

@Component({
  selector: 'render-url',
  template: `<div>
    <h2>Render URL</h2>
    <p-card header="Attack">
      <router-outlet></router-outlet>
    </p-card>
  </div>`,
})
export class RenderURL {}
