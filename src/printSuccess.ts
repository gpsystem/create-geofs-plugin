import { blue, green } from "./chalkTypes";
import { join, relative } from "path";
import { cwd } from "process";

export default function printSuccess(appName: string, destination: string) {
  console.log(`
Successfully created ${blue(appName)}.
See your README (located at ${blue(
    relative(cwd(), join(destination, "README.md"))
  )}) for more usage instructions.
${green("Enjoy building your plugin!")}`);
}
