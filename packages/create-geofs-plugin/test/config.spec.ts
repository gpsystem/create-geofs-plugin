import { relative } from "node:path";
import { Configuration, parseConfig } from "../src/config";
import {
  allArgPermutations,
  createArgsForProgram,
  createTestDirectory__RENAME_LATER,
  normalizeToForwardSlash,
  TestDirectoryResults,
} from "./utils/index";

describe("parse config", () => {
  const { cleanup, directoryPath, getRelativePath }: TestDirectoryResults =
    createTestDirectory__RENAME_LATER();

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
      };

      expect(snapshotConfig).toMatchSnapshot();
    });
  }
});
