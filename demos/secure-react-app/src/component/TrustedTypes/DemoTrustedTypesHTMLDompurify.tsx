import DOMPurify from "dompurify";

// Don't forget to enable the trusted types CSP in vite.config.js
export const DemoTrustedTypesHTMLDompurify = () => {
  const comment = `Hi <img src="none" onerror="alert('OMG')"><b>Syntax</b>`;
  const safeComment = DOMPurify.sanitize(comment, {
    RETURN_TRUSTED_TYPE: true,
  });
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: safeComment,
      }}
    />
  );
};
