import "./App.css";

import { RenderHTML } from "./component/RenderHTML";
import { HTMLEscaping } from "./component/HTMLEscaping";
import { RenderURL } from "./component/RenderURL";
import { TrustedTypes } from "./component/TrustedTypes";

// const unsafeValue = `Peter<img src="#" onerror="alert('OMG')">`;
// const unsafeUrl = "javascript:alert('WTF')";

function App() {
  return (
    <>
      <div className="topBar">
        <h1>XSS and trusted types demo (React)</h1>
      </div>
      <div className="content">
        {/* <HTMLEscaping /> */}
        {/* <RenderURL /> */}
        {/* <RenderHTML /> */}
        {/* <TrustedTypes /> */}
      </div>
    </>
  );
}

export default App;
