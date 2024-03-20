export const DemoRenderURL = () => {
  const evilUrl = "javascript:alert('OMG')";

  return (
    <div>
      <a href={evilUrl}>Click me</a>
    </div>
  );
};
