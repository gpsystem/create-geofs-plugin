// @ts-check
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import external from "rollup-plugin-node-externals";
import pkg from "./package.json";

/** @type {import("rollup").RollupOptions[]} */
const config = [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.exports.require,
        format: "cjs",
      },
      {
        file: pkg.exports.import,
        format: "esm",
      },
    ],
    plugins: [external(), typescript({ removeComments: true }), json()],
  },
  {
    input: "src/index.ts",
    output: { file: pkg.types, format: "es" },
    plugins: [dts()],
  },
];

export default config;
