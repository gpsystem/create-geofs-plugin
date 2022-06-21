import { Configuration, parseConfig } from "../src/config";
import {
  allArgPermutations,
  createArgsForProgram,
  createTestDirectory__RENAME_LATER,
  normalizeToForwardSlash,
  pathRelativeToPackage,
  TestDirectoryResults,
} from "./utils/index";

describe("parse config", () => {
  const { cleanup, directoryPath }: TestDirectoryResults =
    createTestDirectory__RENAME_LATER();

  afterEach(() => cleanup());

  for (const [name, args] of allArgPermutations) {
    test(`ensure parsing integrity ${name}`, () => {
      const originalConfig: Configuration = parseConfig(
        createArgsForProgram(args, directoryPath)
      );
      const snapshotConfig: Configuration = {
        ...originalConfig,
        targetDir: normalizeToForwardSlash(
          pathRelativeToPackage(originalConfig.targetDir)
        ),
        templateDir: normalizeToForwardSlash(
          pathRelativeToPackage(originalConfig.templateDir)
        ),
      };

      expect(snapshotConfig).toMatchSnapshot();
    });
  }
});
