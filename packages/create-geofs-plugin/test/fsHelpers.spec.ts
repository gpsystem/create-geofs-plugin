import { copyDir, getAllFilesInDir, outputFile } from "../src/fsHelpers";
import { testTargetDir } from "./utils/index";

describe("output file", () => {
  test.todo("throws on already existing file");
  test.todo("doesn't create an already existing directory");
  test.todo("writes correctly");
});

describe("get all files in a directory", () => {
  test.todo("only returns files");
  test.todo("always returns real paths");
  test.todo("gets the correct paths");
});

describe("copy directories", () => {
  test.todo("throws when the passed path isn't a directory");
  test.todo("doesn't modify file contents");
  test.todo("doesn't modify directory structure");
});
