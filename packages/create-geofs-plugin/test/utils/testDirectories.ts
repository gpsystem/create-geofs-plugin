import { mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

/**
 * DO NOT USE THIS.
 *
 * The only time this should be used is:
 * - during cleanup after all tests have completed, to clear the test's artifacts, and
 * - creating the subdirectories that tests have free range over.
 */
export const testTargetDirRoot__DO_NOT_USE: string = join(
  __dirname,
  "..",
  "tempForTests/"
);

export interface TestDirectoryResults {
  directoryPath: string;
  directoryName: string;
  cleanup(): void;
}

// declared in setup.ts
declare const GLOBAL_TEST_DIRECTORIES: number[];

export function createTestDirectory__RENAME_LATER(): TestDirectoryResults {
  let workerId = 0;
  const createDirectoryName = () => `test${workerId}`;

  while (GLOBAL_TEST_DIRECTORIES.includes(workerId)) workerId++;

  GLOBAL_TEST_DIRECTORIES.push(workerId);

  const directoryName = createDirectoryName();
  // using the forbidden constant to create the subdirectories
  const directoryPath = join(testTargetDirRoot__DO_NOT_USE, directoryName);

  mkdirSync(directoryPath, { recursive: true });

  return {
    directoryName,
    directoryPath,
    cleanup(): void {
      rmSync(directoryPath, { recursive: true, force: true });
    },
  };
}
