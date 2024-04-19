// Don't forget to enable the trusted types CSP in vite.config.js

export const DemoTrustedTypesURL = () => {
  const evilUrl = "javascript:alert('OMG')";

  return (
    <>
      <div>
        <a href={evilUrl}>Click me</a>
      </div>
    </>
  );
};
