// Don't forget to enable the trusted types CSP in vite.config.js

import { sanitizeUrl } from "@braintree/sanitize-url";

export const DemoTrustedTypesURLSanitizeURL = () => {
  const evilUrl = "javascript:alert('OMG')";
  const safeUrl = sanitizeUrl(evilUrl);

  return (
    <div>
      <a href={safeUrl}>Click me</a>
    </div>
  );
};
