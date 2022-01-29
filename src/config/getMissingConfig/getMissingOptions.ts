import type {
  Config,
  DirectConfig,
  OnlyOptionalConfigOptions,
} from "../../types";
import getQuestions from "./getQuestions";
import isNil from "lodash/isNil";
import { prompt } from "inquirer";

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
  (Object.keys(mergedConfig) as Array<keyof Config>).forEach((key) => {
    // all the properties that could be undefined are all strings, so we're safe to make this assertion
    isNil(mergedConfig[key]) ? (mergedConfig[key] = "" as never) : void 0;
  });

  return mergedConfig;
}
