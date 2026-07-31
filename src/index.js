import React from "react";
import ReactDOM from "react-dom/client";
// Self-hosted font weights (see index.css for why: external Google
// Fonts/Fontshare requests were the dominant cost behind a slow LCP under
// throttled conditions). Only the weights actually used across the site.
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
