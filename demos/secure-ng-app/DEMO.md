Simple rendering

```js
@Component({
  template: `
    <h1 class="text-3xl font-bold underline">Angular security</h1>
    <div class="m-3">
      <h3 class="text-xl font-bold">Name: {{ unsafeValue }}</h3>
    </div>
  `,
})
export class AppComponent {
  unsafeValue = `Peter<img src="none" onerror="alert('OMG')">`;
}
```

## Html Rendering

```js
@Component({
  template: `
    <h1 class="text-3xl font-bold underline">Angular security</h1>
    <div class="m-3">
      <h3 class="text-xl font-bold">Name: {{ unsafeValue }}</h3>
      <div [innerHTML]="comment">no content</div>
    </div>
  `,
})
export class AppComponent {
  comment = `
    <h1>Image Sample</h1>
    <img src="https://picsum.photos/200/300" />
    <img src="#" onerror="alert('OMG')">
  `;
```

See the alert is encoded (safe)

## How to render a SVG

SVG is marked are unsafe by default, se we can't render it.

```js
import { logo } from '../images'
```

```js
constructor(private sanitizer: DomSanitizer) {
    this.comment = sanitizer.bypassSecurityTrustHtml(this.logo);
}

// or 
ngAfterViewInit() {
  this.myDiv.nativeElement.innerHTML = this.logo;
}
```

## URL

```js
this.url="javascript:alert('WTF')"
```

```html
<a [href]="url">Click Me</a>
```

## Trusted Types

```json
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
    "headers": {
      "Content-Security-Policy": "require-trusted-types-for 'script'"
    }
  },
}
```

```js
import * as DOMPurify from 'dompurify';

export const policy = window.trustedTypes?.createPolicy('default', {
  createHTML(source) {
    return DOMPurify.sanitize(source);
  },
});
```
