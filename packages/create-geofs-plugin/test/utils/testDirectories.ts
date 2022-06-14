import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

export const testTargetDirRoot: string = join(__dirname, "..", "tempForTests/");
/**
 * Will only be the names of the directories.
 * Should always be "test" followed by a number not already in the array.
 * e.x. `test3`
 */
const currentlyUsedTestDirs: string[] = [];

export interface TestDirectoryDetails {
  /**
   * The directory to use. The top level has already been created.
   * It is guaranteed that no other test will use this directory until after the teardown function has been called.
   */
  targetDir: string;
  /**
   * Clears the target directory recursively.
   * Should only be called after the test has been completed.
   */
  teardown(): void;
}

export function createTestDirectory(): TestDirectoryDetails {
  let dirNumber = 0;
  const createDirName = () => `test${dirNumber}`;

  // after this loop, the result of createDirName() is now guaranteed to not exist in currentlyUsedTestDirs
  while (currentlyUsedTestDirs.includes(createDirName())) {
    dirNumber++;
  }

  const targetDir: string = createDirName();

  // reserve the directory name
  currentlyUsedTestDirs.push(targetDir);
  mkdirSync(targetDir, { recursive: true });

  return {
    targetDir: join(testTargetDirRoot, targetDir),
    teardown() {
      rmSync(targetDir, { recursive: true, force: true });
    },
  };
}
