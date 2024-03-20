import { sanitizeHtml } from "safevalues";

// Don't forget to enable the trusted types CSP in vite.config.js
export const DemoTrustedTypesHTMLSafevalues = () => {
  const comment = `Hi <img src="none" onerror="alert('OMG')"><b>Syntax</b>`;
  const safeComment = sanitizeHtml(comment);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: safeComment,
      }}
    />
  );
};
