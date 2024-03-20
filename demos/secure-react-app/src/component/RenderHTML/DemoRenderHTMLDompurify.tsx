import DOMPurify from "dompurify";

export const DemoRenderHTMLDompurify = () => {
  const comment = `Hi <img src="none" onerror="alert('OMG')"><b>Syntax</b>`;
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(comment),
      }}
    />
  );
};
