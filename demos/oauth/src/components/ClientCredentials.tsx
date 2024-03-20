import { useState } from "react";

export const ClientCredentials = () => {
  const [request, setRequest] = useState("");

  const handleLogin = async () => {
    const result = `
// RUN THIS REQUEST IN THE TERMINAL (or postman)
// YOU CAN'T RUN THIS IN THE BROWSER
@TENANT_ID = 0b53d2c1-bc55-4ab3-a161-927d289257f2
@CLIENT_ID = c134cace-e155-4f6a-be76-6a85f967a2ef

POST https://login.microsoftonline.com/{{TENANT_ID}}/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id={{CLIENT_ID}}
  &scope=https://graph.microsoft.com/.default
  &client_secret={{CLIENT_SECRET}}
  &grant_type=client_credentials
`;
    setRequest(result);
  };

  return (
    <div className="border p-2">
      <h1 className="text-xl font-medium mb-2">Client Credentials (server only)</h1>
      <div className="space-x-2">
        <button className="btn btn-primary" type="button" onClick={handleLogin}>
          Request Token
        </button>
      </div>
      <div className="mt-2">
        {request && (
          <pre className="bg-slate-200 border p-2 my-2">
            <code>
              <div dangerouslySetInnerHTML={{ __html: request }} />
            </code>
          </pre>
        )}
      </div>
    </div>
  );
};

export default ClientCredentials;
