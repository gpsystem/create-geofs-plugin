const { join } = require("node:path");

/** @type {import("webpack").Configuration} */
const config = {
  entry: join(__dirname, "src", "index.ts"),
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
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    clean: true,
    filename: "index.js",
    path: join(__dirname, "dist"),
  },
};

module.exports = config;
