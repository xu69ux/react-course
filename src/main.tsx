import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";
import { FallBack } from "./components/fallback/FallBack";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<FallBack />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
