import { describe, expect, test } from "@jest/globals";
import {
  eslintConfigBaseDependencies,
  eslintConfigBases,
} from "../src/configurations";
import { isObject } from "./isObject";

describe("raw config bases", () => {
  test("all values are vanilla objects", () => {
    for (const configBase of Object.values(eslintConfigBases)) {
      expect(isObject(configBase)).toBe(true);
    }
  });

  test("none of the extends properties conflict", () => {
    const allExtendsProperties: string[] = [];
    // can't use extends as a variable name, but can in the objects
    for (const { extends: configExtends } of Object.values(eslintConfigBases)) {
      if (!configExtends)
        throw new Error("config extends property should always be defined");

      for (const extendsProperty of configExtends) {
        expect(allExtendsProperties).not.toContain(extendsProperty);
        allExtendsProperties.push(extendsProperty);
      }
    }
  });
});

describe("config base dependencies", () => {
  test("indexable by the keys of the raw config bases", () => {
    for (const key in eslintConfigBases) {
      // key can index both eslintConfigBases and eslintConfigBaseDependencies
      expect(
        Object.prototype.hasOwnProperty.call(eslintConfigBases, key) &&
          Object.prototype.hasOwnProperty.call(
            eslintConfigBaseDependencies,
            key
          )
      ).toBe(true);
    }
  });

  test("all values are string arrays", () => {
    for (const dependencies of Object.values(eslintConfigBaseDependencies)) {
      expect(Array.isArray(dependencies)).toBe(true);
      expect(dependencies.every((val) => typeof val === "string")).toBe(true);
    }
  });
});
