export const DemoHTMLEscapeing = () => {
  const unsafeValue = `Value<img src="#" onerror="alert('OMG')">`;
  return <div>Some value that will be rendered: {unsafeValue}</div>;
};
