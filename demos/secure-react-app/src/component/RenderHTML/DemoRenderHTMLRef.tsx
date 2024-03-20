import { createRef, useEffect } from "react";

export const DemoRenderHTMLRef = () => {
  const comment = `Hi <img src="none" onerror="alert('OMG')"><b>Syntax</b>`;

  const elementRef = createRef<HTMLDivElement>();
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.innerHTML = comment;
    }
  }, []);
  return <span ref={elementRef}>No data</span>;
};
