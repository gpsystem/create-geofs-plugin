import { readFileSync } from "node:fs";
import { EslintConfigNames, getEslintConfig } from "@geps/cgp-eslint-config";

export interface RawTemplateJson {
  /** The dependencies of the template. Does not include the dependencies returned from cgp-eslint-config. */
  dependencies: string[];
  eslintConfigTemplates: EslintConfigNames[];
}

/** Checks if the input is a vanilla object. */
function isObject(obj: unknown): obj is Record<string, unknown> {
  // intentionally allowing a comparison of both undefined and null, since
  // Object.getPrototypeOf will throw for both of them
  // eslint-disable-next-line eqeqeq
  return obj != null && Object.getPrototypeOf(obj) === Object.prototype;
}

/** Checks if the provided input follows the format of a raw template.json file. */
export function assertTemplateJsonFormat(
  templateJson: unknown
): templateJson is RawTemplateJson {
  // asserts that allPossibleConfigNames is a valid array of all possible EslintConfigNames
  // thanks to Joshua Chen on the TS discord for this assertion code!
  type AssertTrue<T extends true> = T;
  // If typescript throws type 'false' does not satisfy the constraint 'true' here, then
  // allPossibleConfigNames is malformed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type A = AssertTrue<
    [EslintConfigNames] extends [typeof allPossibleConfigNames[number]]
      ? true
      : false
  >;

  const allPossibleConfigNames = ["baseConfig", "tsBase", "reactBase"] as const;
  const { isArray } = Array;

  return (
    isObject(templateJson) &&
    isArray(templateJson.dependencies) &&
    templateJson.dependencies.every<string>(
      (val): val is string => typeof val === "string"
    ) &&
    isArray(templateJson.eslintConfigTemplates) &&
    templateJson.eslintConfigTemplates.every<EslintConfigNames>(
      (val): val is EslintConfigNames => allPossibleConfigNames.includes(val)
    )
  );
}

export interface ExpandedTemplateJson {
  /** All dependencies of the template, including the eslint dependencies. */
  dependencies: string[];
  /** The configuration to save to .eslintrc.yml. */
  eslintConfig: Record<string, unknown>;
}

/**
 * Expands a raw template.json file into a data structure to be used.
 *
 * @param templateJsonPath The path to the raw template.json file.
 * @returns The expanded template.json file.
 */
export default function expandTemplateJson(
  templateJsonPath: string
): ExpandedTemplateJson {
  const templateJson: unknown = JSON.parse(
    readFileSync(templateJsonPath, "utf-8")
  );

  if (!assertTemplateJsonFormat(templateJson))
    throw new Error("template.json is malformed");

  const { eslintConfigTemplates } = templateJson;
  if (eslintConfigTemplates.length === 0)
    throw new Error("template must specify at least one config template");
  if (eslintConfigTemplates[0] !== "baseConfig")
    throw new Error(
      "template's eslint config template list must include the base configuration first"
    );

  const [eslintConfig, eslintDependencies] = getEslintConfig(
    ...(eslintConfigTemplates as [EslintConfigNames, ...EslintConfigNames[]])
  );

  const dependencies: string[] = [
    ...templateJson.dependencies,
    ...eslintDependencies,
  ];

  return {
    dependencies,
    // EslintConfig is an interface, which isn't assignable to an object at compile-time, but is an object at runtime
    eslintConfig: eslintConfig as Record<string, unknown>,
  };
}
