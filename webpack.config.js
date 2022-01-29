/* eslint-disable @typescript-eslint/no-var-requires */

const { join } = require("path");
const { BannerPlugin } = require("webpack");

// TODO output esm and externalize everything
/** @type {import("webpack").Configuration} */
const config = {
  entry: join(__dirname, "src", "index.ts"),
  mode: "production",
  target: "node",
  plugins: [new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true })],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /(node_modules)/,
      },
    ],
  },
  externalsPresets: { node: true },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "create-geofs-plugin.js",
    path: join(__dirname, "bin"),
  },
};

module.exports = config;
