import { Card } from "primereact/card";
import { CodeBlock, monoBlue } from "react-code-blocks";
import { Outlet, useOutlet } from "react-router-dom";
import ReactDomServer from "react-dom/server";

export const RenderURL = () => {
  const out = useOutlet();
  return (
    <>
      <h2>Render url</h2>
      <Card title="Attack" className="mb-6">
        <Outlet />
      </Card>
      <Card title="Output" className="mb-6">
        <CodeBlock
          text={ReactDomServer.renderToString(out)}
          language="tsx"
          showLineNumbers
          theme={monoBlue}
        />
      </Card>
    </>
  );
};
