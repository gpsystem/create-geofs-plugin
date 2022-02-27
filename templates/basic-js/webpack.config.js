/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("node:path");

/** @type {import("webpack").Configuration} */
const config = {
  entry: join(__dirname, "src", "index.js"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
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
