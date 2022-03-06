import type {
  Config,
  DirectConfig,
  OnlyOptionalConfigOptions,
} from "../../types";
import getQuestions from "./getQuestions";
import { prompt } from "inquirer";

/**
 * Acquires the missing configuration using inquirer.
 */
export default async function getMissingOptions(
  config: DirectConfig
): Promise<Config> {
  console.log(`
Let's create a plugin!
Hit enter to accept the suggestion.
`);

  const answers = await prompt<Required<OnlyOptionalConfigOptions>>(
    getQuestions(config)
  );
  const mergedConfig: Config = { ...config, ...answers };

  return mergedConfig;
}
