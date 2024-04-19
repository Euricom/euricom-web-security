import { Component } from '@angular/core';

@Component({
  selector: 'html-escaping',
  template: `<div>
    <h2>HTML escaping</h2>
    <p-card header="Attack">
      <router-outlet></router-outlet>
    </p-card>
  </div>`,
})
export class HTMLEscaping {}
