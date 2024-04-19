import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/fluent-light/theme.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HTMLEscaping } from "./component/HTMLEscaping.tsx";
import { RenderHTML } from "./component/RenderHTML.tsx";
import { RenderURL } from "./component/RenderURL.tsx";
import { TrustedTypes } from "./component/TrustedTypes.tsx";
import { DemoRenderHTML } from "./component/RenderHTML/DemoRenderHTML.tsx";
import { DemoRenderHTMLDompurify } from "./component/RenderHTML/DemoRenderHTMLDompurify.tsx";
import { DemoRenderHTMLRef } from "./component/RenderHTML/DemoRenderHTMLRef.tsx";
import { DemoRenderURL } from "./component/RenderURL/DemoRenderURL.tsx";
import { DemoRenderURLIsValid } from "./component/RenderURL/DemoRenderURLIsValid.tsx";
import { DemoRenderURLSanitizeURL } from "./component/RenderURL/DemoRenderURLSanitizeURL.tsx";
import { DemoTrustedTypesHTML } from "./component/TrustedTypes/DemoTrustedTypesHTML.tsx";
import { DemoTrustedTypesHTMLDompurify } from "./component/TrustedTypes/DemoTrustedTypesHTMLDompurify.tsx";
import { DemoTrustedTypesHTMLSafevalues } from "./component/TrustedTypes/DemoTrustedTypesHTMLSafevalues.tsx";
import { DemoTrustedTypesURL } from "./component/TrustedTypes/DemoTrustedTypesURL.tsx";
import { DemoTrustedTypesURLSafeValues } from "./component/TrustedTypes/DemoTrustedTypesURLSafevalues.tsx";
import { DemoTrustedTypesURLSanitizeURL } from "./component/TrustedTypes/DemoTrustedTypesURLSanitizeUrl.tsx";
import { DemoHTMLEscapeing } from "./component/HTMLEscapeing/DemoHTMLEscapeing.tsx";

// load trusted types early
// import "./trustedType.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    ),
    children: [
      {
        path: "HTMLEscaping",
        element: <HTMLEscaping />,
        children: [
          {
            path: "Regular",
            element: <DemoHTMLEscapeing />,
          },
        ],
      },
      {
        path: "RenderURL",
        element: <RenderURL />,
        children: [
          {
            path: "Regular",
            element: <DemoRenderURL />,
          },
          {
            path: "IsValid",
            element: <DemoRenderURLIsValid />,
          },
          {
            path: "SanitizeURL",
            element: <DemoRenderURLSanitizeURL />,
          },
        ],
      },
      {
        path: "RenderHTML",
        element: <RenderHTML />,
        children: [
          {
            path: "Regular",
            element: <DemoRenderHTML />,
          },
          {
            path: "Dompurify",
            element: <DemoRenderHTMLDompurify />,
          },
          {
            path: "Ref",
            element: <DemoRenderHTMLRef />,
          },
        ],
      },
      {
        path: "TrustedTypes",
        element: <TrustedTypes />,
        children: [
          {
            path: "HTML",
            element: <DemoTrustedTypesHTML />,
          },
          {
            path: "HTMLDompurify",
            element: <DemoTrustedTypesHTMLDompurify />,
          },
          {
            path: "HTMLSafevalues",
            element: <DemoTrustedTypesHTMLSafevalues />,
          },
          {
            path: "URL",
            element: <DemoTrustedTypesURL />,
          },
          {
            path: "URLSafeValues",
            element: <DemoTrustedTypesURLSafeValues />,
          },
          {
            path: "URLSanitizeURL",
            element: <DemoTrustedTypesURLSanitizeURL />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
