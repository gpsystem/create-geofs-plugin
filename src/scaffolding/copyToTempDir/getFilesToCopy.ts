import type { FileInfo } from "./getAllPossibleFiles";
import separatePossibleFiles from "./separatePossibleFiles";

/**
 * @param possibleFiles The result from getAllPossibleFiles().
 * @returns An array of all the paths of the files to scaffold.
 */
// TODO: should this be renamed to getFilesToScaffold?
export default function getFilesToCopy(possibleFiles: FileInfo[]): string[] {
  const filesToCopy: string[] = [];

  const [separatedFileInfo, separatedRelativePathStrings] =
    separatePossibleFiles(possibleFiles);

  for (const arr of separatedFileInfo) {
    arr.forEach((file) => {
      // If the file isn't both in the common template,
      // and has the same case insensitive relative path in the specific template,
      if (
        !(
          file.isPartOfCommonTemplate &&
          // TODO: do we need the g flag since we're only looking for one match?
          new RegExp(separatedRelativePathStrings[0].join("|"), "gi").test(
            file.relativePath
          )
        )
      )
        // add the absolute path of the file to the list of files to scaffold into the temporary directory
        filesToCopy.push(file.fullPath);
    });
  }

  return filesToCopy;
}
