// @ts-check
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-node-externals";

/** @type {import("rollup").RollupOptions} */
const config = {
  input: "src/index.ts",
  output: {
    file: "bin/create-geofs-plugin.js",
    format: "cjs",
  },
  plugins: [external(), typescript(), json()],
};

export default config;
