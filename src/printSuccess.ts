import { blue, green } from "./chalkTypes";
import { join, relative } from "node:path";
import type { Config } from "./types";
import { cwd } from "node:process";

/**
 * Prints the success of the CLI and directs to the new app's README for more instructions.
 * @param config The configuration to destructure `appName` and `destination` from.
 */
export default function printSuccess({ appName, destination }: Config) {
  // TODO: make this more readable
  console.log(`
Successfully created ${blue(appName)}.
See your README (located at ${blue(
    relative(cwd(), join(destination, "README.md"))
  )}) for more usage instructions.
${green("Enjoy building your plugin!")}`);
}
