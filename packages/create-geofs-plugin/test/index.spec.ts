import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { start } from "../src/index";
import {
  allArgPermutations,
  createArgsForProgram,
  createTestDirectory__RENAME_LATER,
  TestDirectoryResults,
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

  // make all the names in files relative to the start directory
  if (!recursing)
    return Object.entries(files).reduce<StringObject>(
      (acc, [filePath, fileContents]) => {
        acc[relative(startDirectory, filePath).split(sep).join("/")] =
          fileContents;
        return acc;
      },
      {}
    );
  else return files;
}

describe("integration tests", () => {
  const { cleanup, directoryPath }: TestDirectoryResults =
    createTestDirectory__RENAME_LATER();

  afterEach(() => cleanup());

  for (const [name, args] of allArgPermutations) {
    test(`integration test ${name}`, async () => {
      await expect(
        start(createArgsForProgram(args, directoryPath), true)
      ).resolves.toBeUndefined();

      expect(createDirectoryTree(directoryPath)).toMatchSnapshot();
    });
  }
});
