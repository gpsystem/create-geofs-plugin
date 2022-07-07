import type { EslintConfig } from "eslint-define-config";
import merge from "lodash.merge";
import {
  eslintConfigBaseDependencies,
  eslintConfigBases,
  EslintConfigNames,
} from "./configurations";

type MinOneElementArray<T> = [T, ...T[]];

/**
 * Merges eslint configuration templates into one configuration to output to a .eslintrc file.
 *
 * @param configNames All the configuration templates.
 * The templates will be merged (deeply) with further right configuration templates overwriting further left templates.
 *
 * @returns A tuple. First is the configuration, ready to be stringified and outputted to a .eslintrc file.
 * Second is the names of the dependencies to install to make sure the .eslintrc configuration works properly.
 */
export function getEslintConfig(
  ...configNames: MinOneElementArray<EslintConfigNames>
): [config: EslintConfig, dependencies: string[]] {
  if (configNames.length < 1)
    throw new Error("must provide at least one config name");

  const dependencies: string[] = configNames.flatMap(
    (val) => eslintConfigBaseDependencies[val]
  );
  const configsToMerge = configNames.map<EslintConfig>(
    (val) => eslintConfigBases[val]
  ) as MinOneElementArray<EslintConfig>;
  const config: EslintConfig = merge(...configsToMerge);

  // if the typescript template is used, remove globals from the config (typescript-eslint will pick them up)
  if (configNames.includes("tsBase") && config.globals) delete config.globals;

  return [config, dependencies];
}

export { EslintConfigNames };
