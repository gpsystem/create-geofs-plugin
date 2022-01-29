import type { Config, DirectConfig } from "../../types";
import getMissingOptions from "./getMissingOptions";
import { templateLiteralString } from "./getQuestions";

export default async function getMissingConfig(
  startConfig: DirectConfig
): Promise<Config> {
  const config = await getMissingOptions(startConfig);
  config.template = config.template.substring(
    0,
    config.template.indexOf(templateLiteralString)
  );
  return config;
}
