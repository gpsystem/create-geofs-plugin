import getRelativePathOfFileWhenCopied from "./getRelativePathOfFileWhenCopied";
import klaw from "klaw";
import { relative } from "node:path";

/** The information of any possible file required to merge and scaffold the file. */
export interface FileInfo {
  /** The full absolute path to the file. */
  fullPath: string;
  /** The relative path from the template to the file. */
  relativePath: string;
  /** Whether the file is in the common template. */
  isPartOfCommonTemplate: boolean;
}

/**
 * @returns A Promise that resolves with the information of every file in the user-specified and common template.
 */
export default async function getAllPossibleFiles(
  templatePath: string,
  commonTemplatePath: string
): Promise<FileInfo[]> {
  const allPossiblePaths: string[] = [];

  await Promise.all(
    [templatePath, commonTemplatePath].map(async (path) => {
      for await (const file of klaw(path)) {
        if (
          // If this item is a file, and
          file.stats.isFile() &&
          // the file is in any node_modules folder besides the root folder of the package,
          relative(__dirname, file.path).indexOf("node_modules") === -1
        )
          // Add this item's absolute path to the possible paths.
          allPossiblePaths.push(file.path);
      }
    })
  );

  // Transform the possible paths into a FileInfo object and return the array of possible paths
  return allPossiblePaths.map(
    (path): FileInfo => ({
      fullPath: path,
      relativePath: getRelativePathOfFileWhenCopied(path),
      // TODO: edge case: the entire npm package is located in a directory that includes the string "__common__"
      // in that case, this will always be true
      isPartOfCommonTemplate: path.indexOf("__common__") !== -1,
    })
  );
}
