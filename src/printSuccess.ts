import { relative } from "path";
import { blue, green } from "./chalkTypes";

export default function printSuccess(appName: string, destination: string) {
  console.log(`
Successfully created ${blue(appName)}.
Begin using your app with:
  ${green("cd")} ${relative(process.cwd(), destination)}
  npm start
${green("Enjoy building your plugin!")}`);
}
