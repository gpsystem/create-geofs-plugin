import { Configuration, parseConfig } from "../src/config";
import {
  allArgPermutations,
  createArgsForProgram,
  normalizeToForwardSlash,
  pathRelativeToPackage,
} from "./utils/index";

describe("parse config", () => {
  for (const [name, args] of allArgPermutations) {
    test(`ensure parsing integrity ${name}`, () => {
      const originalConfig: Configuration = parseConfig(
        createArgsForProgram(args)
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
