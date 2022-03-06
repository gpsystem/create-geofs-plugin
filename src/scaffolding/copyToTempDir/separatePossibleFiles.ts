import type { FileInfo } from "./getAllPossibleFiles";

// TODO: should this get all the possible files on its own?
// TODO: should we organize by template type instead of content type?
/**
 * @returns An array containing the separated data needed to
 *
 * The returned array has two elements, both formatted in the same way, but with different contents.
 *
 * Ordering of the returned array (outer-most to contents, inclusive):
 * 1. Top level
 * 2. Second level
 * 3. Content array
 * 4. Contents
 *
 * The first content array (index 0) in the second level array pertains to the specific template.
 * The second content array (index 1) in the second level array pertains to the general template.
 */
export default function separatePossibleFiles(
  possibleFiles: FileInfo[]
): [[FileInfo[], FileInfo[]], [string[], string[]]] {
  /** The second level array that contains all the {@link FileInfo}. */
  const separatedFileInfo: [FileInfo[], FileInfo[]] = [[], []];
  /** The second level array that contains all the relative paths. */
  const separatedRelativePathStrings: [string[], string[]] = [[], []];

  possibleFiles.forEach((file) => {
    /** 1 is the current file is in the common template, 0 otherwise. */
    const arrayToPushIndex = file.isPartOfCommonTemplate ? 1 : 0;

    separatedFileInfo[arrayToPushIndex].push(file);
    separatedRelativePathStrings[arrayToPushIndex].push(file.relativePath);
  });

  // Concatenate the second level arrays into the top level array to return.
  return [separatedFileInfo, separatedRelativePathStrings];
}
