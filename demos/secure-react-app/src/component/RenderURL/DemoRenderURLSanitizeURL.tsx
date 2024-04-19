import { sanitizeUrl } from "@braintree/sanitize-url";

export const DemoRenderURLSanitizeURL = () => {
  const evilUrl = "javascript:alert('OMG')";

  return (
    <div>
      <a href={sanitizeUrl(evilUrl)}>Click me - sanatizeUrl</a>
    </div>
  );
};
