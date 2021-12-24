import { startPlugin } from "./main";
import { getScriptInfo } from "./api";
import { default as pluginInfo } from "../plugin_info.json";

// make sure other scripts know that this script exists
plugins[pluginInfo.name] = { info: getScriptInfo() };

// Run the plugin only when the simulator is finished loading:
const timer = setInterval(function () {
  // Check if everything is ready for the script to start executing
  if (!geofs) return;
  clearInterval(timer);
  // add any logic prior to the plugin's loading here
  startPlugin();
}, 250);
