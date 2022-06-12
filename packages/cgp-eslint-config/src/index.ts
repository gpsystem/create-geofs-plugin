import merge from "lodash.merge";
import {
  eslintConfigBaseDependencies,
  eslintConfigBases,
  EslintConfigNames,
  UnknownEslintConfigBase,
} from "./configurations";

export type MoreThanOneArray<T> = [T, ...T[]];

// TODO: is there a type for a eslint configuration file?
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
  ...configNames: MoreThanOneArray<EslintConfigNames>
): [config: Record<string, unknown>, dependencies: string[]] {
  if (!configNames.length)
    throw new Error("must provide at least one config name");
  const configsToMerge: UnknownEslintConfigBase[] = configNames.map(
    (val) => eslintConfigBases[val]
  );
  const config: Record<string, unknown> = merge(
    ...(configsToMerge as MoreThanOneArray<UnknownEslintConfigBase>)
  );

  // if the typescript template is mentioned, remove globals from the config
  if (configNames.includes("tsBase") && config.globals !== undefined)
    delete config.globals;

  return [
    config,
    configNames.reduce<string[]>(
      (acc, val) => [...acc, ...eslintConfigBaseDependencies[val]],
      []
    ),
  ];
}

export { EslintConfigNames };
