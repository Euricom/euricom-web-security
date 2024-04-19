import "./App.css";

import { Menubar } from "primereact/menubar";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const items = [
    {
      label: "HTML escaping",
      items: [
        {
          label: "Regular",
          command: () => navigate("/HTMLEscaping/Regular"),
        },
      ],
    },
    {
      label: "Render URL",
      items: [
        {
          label: "Regular",
          command: () => navigate("/RenderURL/Regular"),
        },
        {
          label: "IsValid",
          command: () => navigate("/RenderURL/IsValid"),
        },
        {
          label: "SanitizeURL",
          command: () => navigate("/RenderURL/SanitizeURL"),
        },
      ],
    },
    {
      label: "Render HTML",
      items: [
        {
          label: "Regular",
          command: () => navigate("/RenderHTML/Regular"),
        },
        {
          label: "Dompurify",
          command: () => navigate("/RenderHTML/Dompurify"),
        },
        {
          label: "Ref",
          command: () => navigate("/RenderHTML/Ref"),
        },
      ],
    },
    {
      label: "Trusted Types",
      items: [
        {
          label: "HTML",
          command: () => navigate("/TrustedTypes/HTML"),
        },
        {
          label: "HTML Dompurify",
          command: () => navigate("/TrustedTypes/HTMLDompurify"),
        },
        {
          label: "HTML Safevalues",
          command: () => navigate("/TrustedTypes/HTMLSafevalues"),
        },
        {
          label: "URL",
          command: () => navigate("/TrustedTypes/URL"),
        },
        {
          label: "URL Safevalues",
          command: () => navigate("/TrustedTypes/URLSafevalues"),
        },
        {
          label: "URL sanitize url",
          command: () => navigate("/TrustedTypes/URLSanitizeURL"),
        },
      ],
    },
  ];
  return (
    <>
      <Menubar
        model={items}
        start={<img src="/react-2.svg" alt="" height="60px" />}
      />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}

export default App;
