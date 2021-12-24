import { default as pluginInfo } from "../../plugin_info.json";

interface ScriptInfo {
  name: string;
  version: string;
}

function createApi() {
  // Add your api implementation here!
  return {};
}

export function getScriptInfo(): ScriptInfo {
  return {
    name: pluginInfo.name,
    version: pluginInfo.version,
  };
}

export function exposeApi() {
  plugins[pluginInfo.name] = {
    ...createApi(),
    info: getScriptInfo(),
  };
}
