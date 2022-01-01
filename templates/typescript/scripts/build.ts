import { join } from "path";
import { chdir } from "process";
import * as webpack from "webpack";
import * as yargs from "yargs";
import { hideBin } from "yargs/helpers";

const mainDir = join(__dirname, "..");
const argv = yargs(hideBin(process.argv)).option("dev", {
  type: "boolean",
  default: false,
}).argv;

chdir(mainDir);

(async function () {
  const compiler = webpack({
    entry: join(mainDir, "src", "init.ts"),
    mode: (await argv).dev ? "development" : "production",
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
      extensions: [".tsx", ".ts", ".js"],
    },
    optimization: {
      moduleIds: "named",
      mangleExports: false,
      concatenateModules: false,
    },
  });

  await new Promise<void>((resolve, reject) => {
    try {
      compiler.run((err, stats) => {
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
