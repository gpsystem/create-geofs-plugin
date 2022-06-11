// @ts-check
const { join } = require("node:path");

/** @type {import("webpack").Configuration} */
const config = {
  entry: join(__dirname, "src", "index.js"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  output: {
    clean: true,
    filename: "index.js",
    path: join(__dirname, "dist"),
  },
};

module.exports = config;
