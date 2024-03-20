// Don't forget to enable the trusted types CSP in vite.config.js

import { trustedResourceUrl } from "safevalues";

export const DemoTrustedTypesURLSafeValues = () => {
  const evilUrl = "javascript:alert('OMG')";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const safeUrl: any = trustedResourceUrl`https://localhost:3000/${evilUrl}/`;
  return (
    <div>
      <a href={safeUrl}>Click me</a>
    </div>
  );
};
