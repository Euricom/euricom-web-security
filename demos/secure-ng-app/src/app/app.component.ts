import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p-menubar [model]="items">
      <ng-template pTemplate="start">
        <img src="assets/angular-icon.svg" height="60" class="mr-2" />
      </ng-template>
    </p-menubar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  items = [
    {
      label: 'HTML escaping',
      items: [
        {
          label: 'Regular',
          routerLink: '/html-escaping/regular',
        },
      ],
    },
    {
      label: 'Render URL',
      items: [
        {
          label: 'Regular',
          routerLink: '/render-url/regular',
        },
      ],
    },
    {
      label: 'Render HTML',
      items: [
        {
          label: 'Regular',
          routerLink: '/render-html/regular',
        },
        {
          label: 'Ref',
          routerLink: '/render-html/ref',
        },
        {
          label: 'Bypass',
          routerLink: '/render-html/bypass',
        },
      ],
    },
  ];
}
