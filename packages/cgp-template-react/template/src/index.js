/// <reference types="jquery" />
/// <reference types="@geps/geofs-types" />

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

// Replace the selector with a link to your UI host!
// Example: #geofs-ui-right
const root = createRoot(document.querySelector("REPLACE ME"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);