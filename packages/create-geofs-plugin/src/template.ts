import { readFileSync } from "node:fs";
import {
  EslintConfigNames,
  MoreThanOneArray,
  getEslintConfig,
} from "@geps/cgp-eslint-config";

interface TemplateJson {
  /** The dependencies of the template. Does not include the dependencies returned from cgp-eslint-config. */
  dependencies: string[];
  eslintConfigTemplates: EslintConfigNames[];
}

function isObject(obj: unknown): obj is Record<string, unknown> {
  // intentionally allowing a comparison of both undefined and null
  // Object.getPrototypeOf will throw for both undefined and null
  // eslint-disable-next-line eqeqeq
  return obj != null && Object.getPrototypeOf(obj) === Object.prototype;
}

export function assertTemplateJsonFormat(
  templateJson: unknown
): templateJson is TemplateJson {
  // thanks to Joshua Chen on the TS discord for this assertion code!
  type AssertTrue<T extends true> = T;
  // If typescript throws type 'false' does not satisfy the constraint 'true' here, then
  // allPossibleConfigNames doesn't include all values of EslintConfigNames
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
    templateJson.dependencies.every<string>((val): val is string => {
      // TODO: ensure val is a npm dep name followed by a major version number (after @ symbol)
      return typeof val === "string";
    }) &&
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

export default function expandTemplateJson(
  templateJsonPath: string
): ExpandedTemplateJson {
  const templateJson: unknown = JSON.parse(
    readFileSync(templateJsonPath, "utf-8")
  );

  if (!assertTemplateJsonFormat(templateJson))
    throw new Error("template.json is malformed");

  let { eslintConfigTemplates } = templateJson;
  if (!eslintConfigTemplates.length) eslintConfigTemplates = ["baseConfig"];

  const [eslintConfig, eslintDependencies] = getEslintConfig(
    ...(eslintConfigTemplates as MoreThanOneArray<
      typeof eslintConfigTemplates[number]
    >)
  );

  const dependencies: string[] = [
    ...templateJson.dependencies,
    ...eslintDependencies,
  ];

  return { dependencies, eslintConfig };
}