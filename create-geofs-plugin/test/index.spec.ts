import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { afterEach, describe, expect, test } from "@jest/globals";
import { start } from "../src/index";
import {
  allArgPermutations,
  createArgsForProgram,
  createDirectoryForTest,
  normalizeToForwardSlash,
} from "./utils/index";

type StringObject = { [key: string]: string };

function createDirectoryTree(
  startDirectory: string,
  { recursing = false }: { recursing?: boolean } = {}
): StringObject {
  const files: StringObject = {};

  for (const file of readdirSync(startDirectory, { withFileTypes: true })) {
    const filePath: string = join(startDirectory, file.name);

    if (file.isDirectory()) {
      const subdirectoryTree: StringObject = createDirectoryTree(filePath, {
        recursing: true,
      });

      // reviewers, mark this to resolve the name conflict
      for (const [filePath, fileContents] of Object.entries(subdirectoryTree)) {
        files[filePath] = fileContents;
      }
    } else if (file.isFile()) {
      files[filePath] = readFileSync(filePath, "utf8");
    }
  }

  if (!recursing)
    // make all the names in files relative to the start directory
    return Object.entries(files).reduce<StringObject>(
      (acc, [filePath, fileContents]) => {
        acc[normalizeToForwardSlash(relative(startDirectory, filePath))] =
          fileContents;
        return acc;
      },
      {}
    );
  else return files;
}

describe("integration tests", () => {
  const { cleanup, directoryPath } = createDirectoryForTest();

  afterEach(() => cleanup());

  for (const [name, args] of allArgPermutations) {
    test(`integration test ${name}`, async () => {
      await expect(
        start(createArgsForProgram(args, directoryPath), { ci: true })
      ).resolves.toBeUndefined();

      expect(createDirectoryTree(directoryPath)).toMatchSnapshot();
    });
  }
});
