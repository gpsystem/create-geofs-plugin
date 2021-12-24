const { join } = require("path");
const { chdir } = require("process");
const webpack = require("webpack");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const mainDir = join(__dirname, "..");
const argv = yargs(hideBin(process.argv)).argv;

chdir(mainDir);
const compiler = webpack({
  entry: join(mainDir, "src", "init.ts"),
  mode: argv.dev ? "development" : "production",
  output: {
    path: join(mainDir, "dist"),
    filename: `main.js`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  optimization: {
    moduleIds: "named",
    mangleExports: false,
    concatenateModules: false,
  },
});

(async function () {
  await new Promise((resolve, reject) => {
    try {
      compiler.run((err, stats) => {
        if (err || stats.hasErrors) {
          if (err) {
            reject(err);
            return;
          }

          const info = stats.toJson();

          if (stats.hasWarnings()) {
            console.warn(info.warnings);
          }

          if (stats.hasErrors()) {
            reject(info.errors);
          }
        }

        compiler.close((closeErr) => {
          if (closeErr) {
            reject(closeErr);
          }
          resolve();
        });
      });
    } catch (err) {
      reject(err);
    }
  });
})();
