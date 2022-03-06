import { copySync, existsSync } from "fs-extra";
import { join, relative } from "node:path";

/** The information about a file in the final directory. */
export interface Results {
  path: string;
  skipped: boolean;
}

/**
 * Copies everything from the temporary directory to the final directory.
 * @returns A sorted array of the {@link Results} of all the files that were in the temporary directory.
 */
export default function copyToFinalDir(
  tempDirFilePaths: string[],
  tempDirName: string,
  targetDirPath: string,
  overwrite: boolean
): Results[] {
  return (
    tempDirFilePaths
      // copy every file and transform into an array of Results
      .map<Results>((currentTempDirFilePath): Results => {
        let skipped = false;
        const newPath: string = join(
          targetDirPath,
          relative(tempDirName, currentTempDirFilePath)
        );

        if (overwrite) {
          copySync(currentTempDirFilePath, newPath, { overwrite });
        } else {
          existsSync(newPath)
            ? (skipped = true)
            : copySync(currentTempDirFilePath, newPath);
        }

        return { path: newPath, skipped };
      })
      // sort the array of Results by alphabetical order of the path
      .sort((a, b) => (a.path > b.path ? 1 : -1))
  );
}
