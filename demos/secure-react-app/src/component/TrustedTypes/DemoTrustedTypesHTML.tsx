// Don't forget to enable the trusted types CSP in vite.config.js
export const DemoTrustedTypesHTML = () => {
  const comment = `Hi <img src="none" onerror="alert('OMG')"><b>Syntax</b>`;
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: comment,
      }}
    />
  );
};
