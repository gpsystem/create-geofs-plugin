import { existsSync } from "fs-extra";
import { join } from "path";
import { chmod } from "shelljs";
import { bin } from "../package.json";

/**
 * Converts TS file under ./bin/ into an executable file.
 *
 * By default, the compiled `bin/*.js` scripts ar not executable.
 * When a developer is modifying the application, they won't be able to run the
 * compiled scripts from the CLI.
 *
 * This utility function applies executable permissions to the compiled binary script.
 */
function chBinMod(): void {
  const distributableBinary = join(__dirname, "..", bin);

  try {
    if (existsSync(distributableBinary)) chmod("+x", distributableBinary);
  } catch (err) {
    console.error(err);
  }
}

chBinMod();
