/* eslint-disable @typescript-eslint/no-var-requires */

const { join } = require("path");
const { existsSync, rmSync } = require("fs-extra");
const { chmod } = require("shelljs");
const { BannerPlugin } = require("webpack");
const { bin } = require("./package.json");

/**
 * Taps into webpack to ensure that the needed actions happen before and after compilation.
 */
class CustomBuildPlugin {
  constructor() {
    const distributableBinary = join(__dirname, bin);

    this.name = "CustomBuildPlugin";
    this.preCompilationCallback = () => {
      rmSync(join(__dirname, "bin"), { recursive: true, force: true });
    };
    this.afterCompilationCallback = () => {
      if (existsSync(distributableBinary)) chmod(755, distributableBinary);
    };
  }

  /**
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.compile.tap(this.name, this.preCompilationCallback);
    compiler.hooks.afterDone.tap(this.name, this.afterCompilationCallback);
  }
}

/** @type {import("webpack").Configuration} */
const config = {
  entry: join(__dirname, "src", "index.ts"),
  mode: "production",
  target: "node",
  plugins: [
    new CustomBuildPlugin(),
    new BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
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
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "create-geofs-plugin.js",
    path: join(__dirname, "bin"),
  },
};

module.exports = config;
