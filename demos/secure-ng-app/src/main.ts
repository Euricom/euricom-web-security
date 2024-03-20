import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// Trusted Types
// import * as DOMPurify from 'dompurify';
// export const policy = window.trustedTypes?.createPolicy('default', {
//   createHTML(source) {
//     return DOMPurify.sanitize(source);
//   },
// });

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
