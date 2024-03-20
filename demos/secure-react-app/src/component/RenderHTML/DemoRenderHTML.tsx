export const DemoRenderHTML = () => {
  const comment = `Hi <img src="none" onerror="alert('OMG')"><b>Syntax</b>`;
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: comment,
      }}
    />
  );
};
