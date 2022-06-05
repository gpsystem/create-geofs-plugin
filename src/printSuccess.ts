import { blue, green } from "@colors/colors/safe";
import { join, relative } from "node:path";
import type { Config } from "./types";
import { cwd } from "node:process";

/**
 * Prints the success of the CLI and directs to the new app's README for more instructions.
 * @param config The configuration to destructure `appName` and `destination` from.
 */
export default function printSuccess({ appName, destination }: Config) {
  const newLine = "\n";
  /** The relative path from where create-geofs-plugin was called to the new README */
  const readmeLocation: string = relative(
    cwd(),
    join(destination, "README.md")
  );
  // prettier-ignore
  const successMessage: string =
    `Successfully created ${blue(appName)}.` +
    newLine +
    `See your README (located at ${blue(readmeLocation)}) for more usage instructions.` +
    newLine +
    green("Enjoy building your plugin!");

  // separates the success message from the status updates
  console.log(newLine);
  console.log(successMessage);
}
