import { relative } from "node:path";
import { afterEach, describe, expect, test } from "@jest/globals";
import { Configuration, parseConfig } from "../src/config";
import {
  allArgPermutations,
  createArgsForProgram,
  createDirectoryForTest,
  normalizeToForwardSlash,
} from "./utils/index";

describe("parse config", () => {
  const { cleanup, directoryPath, getRelativePath } = createDirectoryForTest();

  afterEach(() => cleanup());

  for (const [name, args] of allArgPermutations) {
    test(`ensure parsing integrity ${name}`, () => {
      const originalConfig: Configuration = parseConfig(
        createArgsForProgram(args, directoryPath)
      );
      const snapshotConfig: Configuration = {
        ...originalConfig,
        // should be an empty string
        targetDir: normalizeToForwardSlash(
          getRelativePath(originalConfig.targetDir)
        ),
        templateDir: normalizeToForwardSlash(
          relative(__dirname, originalConfig.templateDir)
        ),
        templateTopLevelDir: normalizeToForwardSlash(
          relative(__dirname, originalConfig.templateTopLevelDir)
        ),
      };

      expect(snapshotConfig).toMatchSnapshot();
    });
  }
});
