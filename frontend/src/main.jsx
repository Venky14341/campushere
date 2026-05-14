import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "12px",
          border: "1px solid rgba(148,163,184,.3)",
          background: "#0f172a",
          color: "#e5e7eb"
        }
      }}
    />
    <App />
  </React.StrictMode>
);
