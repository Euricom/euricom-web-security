import { Outlet, useOutlet } from "react-router-dom";
import { Message } from "primereact/message";
import { Card } from "primereact/card";
import { CodeBlock, monoBlue } from "react-code-blocks";
import ReactDomServer from "react-dom/server";

export const TrustedTypes = () => {
  const out = useOutlet();
  return (
    <>
      <h2>Trusted types</h2>
      <Message
        className="mb-6"
        severity="warn"
        text="Don't forget to enable the trusted types CSP in vite.config.js"
      />
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
