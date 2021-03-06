// @ts-check
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";

/** @type {import("rollup").RollupOptions} */
const config = {
  input: "src/index.ts",
  output: {
    file: "bin/create-geofs-plugin.js",
    format: "cjs",
  },
  plugins: [typescript(), json()],
  external: [
    "@colors/colors/safe",
    "commander",
    "fs-extra",
    "inquirer",
    "klaw",
    "lodash",
    "simple-git",
    "validate-npm-package-name",
    /^node:/,
  ],
};

export default config;
