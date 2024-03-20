// import CodeFlow from "./components/CodeFlow";
import { useEffect, useState } from "react";
import ClientCredentials from "./components/ClientCredentials";
import CodeFlow from "./components/CodeFlow";
import CodeFlowWithPkce from "./components/CodeFlowWithPkce";
import ImplicitFlow from "./components/ImplicitFlow";
import { splitSearchParams } from "./util";

const TENANT_ID = "0b53d2c1-bc55-4ab3-a161-927d289257f2";

const RenderParams = () => {
  const search = window.location.hash.substring(1) || window.location.search.substring(1);
  const params = splitSearchParams(search);
  const redirect = sessionStorage.getItem("redirect");
  return (
    <div>
      {params && (
        <>
          <div className="p-2 my-2 bg-slate-200 border  break-all w-[2000px]">
            <code>
              <div>Redirect to:</div>
              <div dangerouslySetInnerHTML={{ __html: splitSearchParams(redirect || "") }} />
            </code>
          </div>
          <div className="p-2 ml-5 bg-slate-200 border break-all w-[2000px]">
            <div>Response URL Params:</div>
            <div dangerouslySetInnerHTML={{ __html: splitSearchParams(search) }} />
          </div>
        </>
      )}
    </div>
  );
};

function App() {
  const [tab, setTab] = useState("clientCredentials");
  useEffect(() => {
    const tab = sessionStorage.getItem("tab");
    if (tab) {
      setTab(tab);
    }
  }, []);

  const handleReset = () => {
    sessionStorage.clear();
    sessionStorage.setItem("tab", "implicit");
    window.location.href = window.location.origin + window.location.pathname;
  };

  const handleLogout = () => {
    sessionStorage.clear();
    sessionStorage.setItem("tab", "implicit");
    window.location.href = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:5173`;
  };

  const selectTab = (tab: string) => {
    sessionStorage.setItem("tab", tab);
    setTab(tab);
    window.location.href = window.location.origin + window.location.pathname;
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold my-2">OAuth 2.0 Tester</h1>
      <p className="my-2">Here you can run multiple OAuth 2.0 authorization flows .</p>
      <div className="space-x-2">
        <button className="btn btn-primary btn-sm mb-2" type="button" onClick={handleReset}>
          Reset
        </button>
        <button className="btn btn-primary btn-sm mb-2" type="button" onClick={handleLogout}>
          Logout
        </button>
        <div role="tablist" className="tabs tabs-bordered w-[700px]">
          <a
            role="tab"
            className={`tab ${tab === "implicit" ? "tab-active" : ""}`}
            onClick={() => selectTab("implicit")}
          >
            Implicit Flow
          </a>
          <a role="tab" className={`tab ${tab === "client" ? "tab-active" : ""}`} onClick={() => selectTab("client")}>
            Client Credentials
          </a>
          <a role="tab" className={`tab ${tab === "code" ? "tab-active" : ""}`} onClick={() => selectTab("code")}>
            Code Flow
          </a>
          <a role="tab" className={`tab ${tab === "pkce" ? "tab-active" : ""}`} onClick={() => selectTab("pkce")}>
            Code Flow with PKCE
          </a>
        </div>
      </div>
      <RenderParams />
      <div className="m-3">
        {tab === "client" && <ClientCredentials />}
        {tab === "implicit" && <ImplicitFlow />}
        {tab === "code" && <CodeFlow />}
        {tab === "pkce" && <CodeFlowWithPkce />}
      </div>
    </div>
  );
}

export default App;
