import { exposeApi } from "./api";

export function startPlugin() {
  exposeApi();
  console.log("This is where your plugin logic starts executing");
}
