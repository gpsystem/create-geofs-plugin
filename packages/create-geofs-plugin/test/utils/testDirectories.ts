import { mkdirSync, rmSync } from "node:fs";
import { join, relative } from "node:path";

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
  cleanup(): void;
  directoryPath: string;
  directoryName: string;
  getRelativePath(childPath: string): string;
}

export function createTestDirectory__RENAME_LATER(): TestDirectoryResults {
  const directoryName = `test-dir-${Math.random().toString().substring(2)}`;
  // using the forbidden constant to create the subdirectories
  const directoryPath = join(testTargetDirRoot__DO_NOT_USE, directoryName);

  mkdirSync(directoryPath, { recursive: true });

  return {
    cleanup(): void {
      rmSync(directoryPath, { force: true, recursive: true });
    },
    directoryName,
    directoryPath,
    getRelativePath(childPath: string): string {
      return relative(directoryPath, childPath);
    },
  };
}
