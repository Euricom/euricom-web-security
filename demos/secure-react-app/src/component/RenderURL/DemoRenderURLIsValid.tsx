export const DemoRenderURLIsValid = () => {
  const evilUrl = "javascript:alert('OMG')";

  function isValidUrl(url: string) {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol);
  }

  return (
    <div>
      <a href={isValidUrl(evilUrl) ? evilUrl : "#"}>Click me - is valid</a>
    </div>
  );
};
