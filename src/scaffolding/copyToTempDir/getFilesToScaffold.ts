import type { FileInfo } from "./getAllPossibleFiles";
import separatePossibleFiles from "./separatePossibleFiles";

/**
 * @param possibleFiles The result from getAllPossibleFiles().
 * @returns An array of all the paths of the files to scaffold.
 */
export default function getFilesToScaffold(
  possibleFiles: FileInfo[]
): string[] {
  const filesToScaffold: string[] = [];

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
        filesToScaffold.push(file.fullPath);
    });
  }

  return filesToScaffold;
}
