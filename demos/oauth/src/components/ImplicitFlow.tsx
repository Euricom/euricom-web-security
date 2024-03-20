import React, { useState } from "react";

const CLIENT_ID = "a47d0927-3892-4f3b-9c66-8069b1bc608a";
const TENANT_ID = "0b53d2c1-bc55-4ab3-a161-927d289257f2";

export const ImplicitFlow = () => {
  const [prompt, setPrompt] = useState("none");

  const handleLoginPrompt = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrompt(e.target.value);
  };

  const handleLogin = () => {
    // https://learn.microsoft.com/nl-nl/entra/identity-platform/v2-oauth2-implicit-grant-flow
    const url =
      `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?client_id=${CLIENT_ID}` +
      // Must include id_token for OpenID Connect sign-in
      // token: access_token
      // id_token: id_token
      "&response_type=id_token token" +
      // The redirect URI of your app, where authentication responses can be sent and received by your app
      "&redirect_uri=http://localhost:5173" +
      // A space-separated list of scopes (openid, profile, email, offline_access, user.read, etc. )
      "&scope=openid" +
      // Indicates the type of user interaction that is required; login, none, select_account or consent
      `&prompt=${prompt}` +
      // A value included in the request that will also be returned in the token response
      "&state=12345" +
      // A value included in the request, generated by the app, that will be included in the resulting ID token as a claim
      "&nonce=12345";
    console.log("Implicit flow, redirect to\n", url);
    sessionStorage.setItem("redirect", url);
    window.location.href = url.replace(/\n|\r/g, "");
  };

  return (
    <div className="border p-2 my-2">
      <h1 className="text-xl font-medium mb-2">Implicit Flow</h1>
      <div className="space-x-2">
        <button className="btn btn-primary" type="button" onClick={handleLogin}>
          Login
        </button>
        <select className="select" onChange={handleLoginPrompt}>
          <option value="none">None</option>
          <option value="login">Login</option>
          <option value="consent">Concent</option>
        </select>
      </div>
    </div>
  );
};

export default ImplicitFlow;