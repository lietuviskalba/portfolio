// client/src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

// Use /portfolio as basename in production; remove it in development.
const basename = process.env.NODE_ENV === "production" ? "/portfolio" : "";

root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);
