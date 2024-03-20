import { useState } from "react";

const CLIENT_ID = "c134cace-e155-4f6a-be76-6a85f967a2ef";
const TENANT_ID = "0b53d2c1-bc55-4ab3-a161-927d289257f2";

export const CodeFlowWithPkce = () => {
  const [request, setRequest] = useState("");
  const [prompt, setPrompt] = useState("none");

  const handleLoginPrompt = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrompt(e.target.value);
  };

  const handleLogin = async () => {
    const url =
      `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}` +
      // code: authorization_code
      "&response_type=code" +
      // The redirect URI of your app, where authentication responses can be sent and received by your app
      "&redirect_uri=http://localhost:5173" +
      // A space-separated list of scopes
      "&scope=openid" +
      // Indicates the type of user interaction that is required; login, none, select_account or consent
      `&prompt=${prompt}` +
      // A value included in the request that will also be returned in the token response
      "&state=my-cookie-state-value";
    console.log("Pkce flow, redirect to\\n", url);
    sessionStorage.setItem("redirect", url);
    window.location.href = url.replace(/\n|\r/g, "");
  };

  const handleRequestTokens = async () => {
    // get code from the URL
    const search = window.location.search.substring(1);
    const searchParams = new URLSearchParams(search);
    const code = searchParams.get("code");

    const result = `
// RUN THIS REQUEST IN THE TERMINAL (or postman)
// YOU CAN'T RUN THIS IN THE BROWSER
@TENANT_ID = 0b53d2c1-bc55-4ab3-a161-927d289257f2
@CLIENT_ID = c134cace-e155-4f6a-be76-6a85f967a2ef

POST https://login.microsoftonline.com/{{TENANT_ID}}/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
  &client_id={{CLIENT_ID}}
  &code=${code}
  &client_secret={{CLIENT_SECRET}}
  &redirect_uri=http://localhost:5173
`;

    setRequest(result);
  };

  return (
    <div className="border p-2">
      <h1 className="text-xl font-medium mb-2">Authorization Code </h1>
      <div className="space-x-2">
        <button className="btn btn-primary" type="button" onClick={handleLogin}>
          Login
        </button>
        <select className="select" onChange={handleLoginPrompt}>
          <option value="none">None</option>
          <option value="login">Login</option>
          <option value="consent">Concent</option>
        </select>
        <button className="btn btn-primary" type="button" onClick={handleRequestTokens}>
          Request Token (server only)
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

export default CodeFlowWithPkce;
