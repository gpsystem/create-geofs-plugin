import { describe, expect, test } from "@jest/globals";
import { eslintConfigBases } from "../src/configurations";
import { getEslintConfig } from "../src/index";

describe("get the eslint config", () => {
  const allConfigBasesNames: (keyof typeof eslintConfigBases)[] = [
    "baseConfig",
    "tsBase",
    "reactBase",
  ];
  for (const configBaseName of Object.keys(eslintConfigBases)) {
    if (
      !allConfigBasesNames.includes(
        configBaseName as keyof typeof eslintConfigBases
      )
    )
      throw new Error(
        "allConfigBasesNames needs to include all config base names before a test can be run"
      );
  }

  test("requires one config name", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore expecting an error
    expect(() => getEslintConfig()).toThrowErrorMatchingSnapshot();
    expect(() => getEslintConfig("baseConfig")).not.toThrow();
  });

  test("returns an array with the config and dependencies", () => {
    const [config, dependencies] = getEslintConfig("baseConfig");
    // config is an object
    expect(Object.prototype.toString.call(config)).toBe(
      Object.prototype.toString()
    );
    expect(Array.isArray(dependencies)).toBe(true);
  });

  test("returns a dependency string array", () => {
    const [, dependencies] = getEslintConfig("baseConfig");

    expect(Array.isArray(dependencies)).toBe(true);
    expect(dependencies.every((val) => typeof val === "string")).toBe(true);
  });

  test("returns consistent values", () => {
    /**
     * Rules for a permutation:
     * 1. Must have at least one element
     * 2. Must have baseConfig first
     */
    const validConfigBaseNamePermutations: [
      keyof typeof eslintConfigBases,
      ...(keyof typeof eslintConfigBases)[]
    ][] = [
      ["baseConfig"],
      ["baseConfig", "reactBase"],
      ["baseConfig", "tsBase"],
      ["baseConfig", "reactBase", "tsBase"],
      ["baseConfig", "tsBase", "reactBase"],
    ];
    for (const configBaseNames of validConfigBaseNamePermutations) {
      const [config, dependencies] = getEslintConfig(...configBaseNames);
      const runName: string = configBaseNames
        .map((val) => val.split(/[A-Z]/)[0])
        .join("-");

      expect(config).toMatchSnapshot(`config for ${runName} run`);
      expect(dependencies).toMatchSnapshot(`dependencies for ${runName} run`);
    }
  });
});
