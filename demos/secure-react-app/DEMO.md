# Demo

## Simple rendering

```js
function App() {
  const unsafeContent = `Peter<img src="#" onerror="alert('OMG')">`;
  return (
    <>
      <h1>Vite + React</h1>
      {unsafeContent}
    </>
  );
}
```

## Html Rendering

```js
function App() {
  const unsafeContent = `Peter<img src="#" onerror="alert('OMG')">`;
  return (
    <>
      <h1>Vite + React</h1>
      <div dangerouslySetInnerHTML={{ __html: unsafeContent }}></div> 
    </>
  );
}
```

## Use Ref

```js
const Component = ({ title }) => {
  const elementRef = React.createRef();

  useEffect(() => {
    // UNSAFE: bypass security by native DOM manipulation
    ref.current.innerHTML = title;
  }, []);

  return (<span ref={elementRef}>no data</span>)
}
```

## Unsafe URL

```js
const DynamicLink = ({ url, title }) => {
  return (
    <a href={url}>{title}</a>
  )
}
```

```html
<DynamicLink title=”Open Me” url=”javascript:alert("WTF")” />
```

```js
function isValidUrl(url) {
  const parsed = new URL(url)
  return [‘https:’, ‘http:’].includes(parsed.protocol)
}
```

```jsx
<a href={isValidUrl(url) ? url : ‘#’}>{title}</a>
```

## TrustedTypes


```jsx
import { sanitizeHtml } from "safevalues";

const safeContent = DOMPurify.sanitize(untrusted, { RETURN_TRUSTED_TYPE: true })
return (
  <div dangerouslySetInnerHTML={{ __html: safeContent }}></div> 
)
```

```jsx
import { sanitizeHtml } from "safevalues";

const safeContent = sanitizeHtml(untrusted);
return (
  <div dangerouslySetInnerHTML={{ __html: safeContent }}></div> 
)
```

```jsx
import { trustedResourceUrl } from "safevalues";

export const Link = ({ url }: { url: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trustedURL: any = trustedResourceUrl`https://domain/${url}/`;
  return (
    <div>
      <h1>Link</h1>
      <a href={trustedURL}>Click Me</a>
    </div>
  );
};
```


