import { useState } from "react";
import { getPkce, splitSearchParams } from "../util";

const CLIENT_ID = "a47d0927-3892-4f3b-9c66-8069b1bc608a";
const TENANT_ID = "0b53d2c1-bc55-4ab3-a161-927d289257f2";

export const CodeFlowWithPkce = () => {
  const [request, setRequest] = useState("");
  const [result, setResult] = useState("");
  const [prompt, setPrompt] = useState("none");
  const [refreshToken, setRefreshToken] = useState("");

  const handleLoginPrompt = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrompt(e.target.value);
  };

  const handleLogin = async () => {
    const { verifier, challenge } = await getPkce();

    // store the verify, it will be used to request the token after we received the code
    sessionStorage.setItem("verifier", verifier);

    const url =
      `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}` +
      // code: authorization_code
      "&response_type=code" +
      // The redirect URI of your app, where authentication responses can be sent and received by your app
      "&redirect_uri=http://localhost:5173" +
      // A space-separated list of scopes (permissions) being requested by your app
      // openid profile email User.Read
      "&scope=openid profile email" +
      // Indicates the type of user interaction that is required; login, none, select_account or consent
      `&prompt=${prompt}` +
      // A value included in the request that will also be returned in the token response
      "&state=my-cookie-state-value" +
      // Used to secure authorization code grants by using Proof Key for Code Exchange (PKCE)
      `&code_challenge=${challenge}` +
      "&code_challenge_method=S256";
    console.log("Pkce flow, redirect to\\n", url);
    sessionStorage.setItem("redirect", url);
    window.location.href = url.replace(/\n|\r/g, "");
  };

  const handleRequestTokens = async () => {
    // Retrieve the verifier from the session storage
    const verifier = sessionStorage.getItem("verifier");

    // get code from the URL
    const search = window.location.search.substring(1);
    const searchParams = new URLSearchParams(search);
    const code = searchParams.get("code");

    // Request the token
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: CLIENT_ID,
      code_verifier: verifier || "",
      code: code || "",
      redirect_uri: "http://localhost:5173",
    });
    const result = await fetch(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    }).then((res) => res.json());
    setRequest(body.toString());
    setResult(result);
    setRefreshToken(result.refresh_token);
  };

  const handleRefreshToken = async () => {
    console.log("Refresh token");

    // Request the token
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      scope: "openid",
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    });
    const result = await fetch(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    }).then((res) => res.json());
    setRequest(body.toString());
    setResult(result);
  };

  return (
    <div className="border p-2">
      <h1 className="text-xl font-medium mb-2">Authorization Code with Pkce Flow</h1>
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
          Request Token
        </button>
        <button className="btn btn-primary" type="button" onClick={handleRefreshToken}>
          Refresh Token
        </button>
      </div>
      <div className="mt-2">
        {request && (
          <div className="bg-slate-200 border p-2 my-2 break-all w-[2000px]">
            POST https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token
            <br />
            <br />
            <div dangerouslySetInnerHTML={{ __html: splitSearchParams(request.toString()) }} />
          </div>
        )}
        {result && (
          <pre className="bg-slate-200 border p-2 ml-5 break-all w-[2000px]">
            Response body:
            <div dangerouslySetInnerHTML={{ __html: JSON.stringify(result, null, 2) }} />
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeFlowWithPkce;
