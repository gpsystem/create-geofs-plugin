import type { Config, DirectConfig } from "../../types";
import getMissingOptions from "./getMissingOptions";

/**
 * Acquires the missing configuration and verifies the template name.
 */
export default async function getMissingConfig(
  startConfig: DirectConfig
): Promise<Config> {
  const config = await getMissingOptions(startConfig);
  return config;
}
