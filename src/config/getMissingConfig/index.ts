import type { Config, DirectConfig } from "../../types";
import getMissingOptions from "./getMissingOptions";

export default async function getMissingConfig(
  startConfig: DirectConfig
): Promise<Config> {
  return await getMissingOptions(startConfig);
}
