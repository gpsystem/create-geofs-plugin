/// <reference types="jquery" />
/// <reference types="@geps/geofs-types" />

import { createRoot } from "react-dom/client";
import React from "react";
import { App } from "./App";

// start writing your code here!
// you can reference the geofs apis in intellisense because of the triple-slash directives
// the apis from geofs plugin system are not available yet

const root = createRoot(document.getElementById("test"));
root.render(<App />);
