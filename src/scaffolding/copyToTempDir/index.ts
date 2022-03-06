import { basename, dirname, join } from "node:path";
import { mkdir, readFileSync, writeFile } from "fs-extra";
import type { Config } from "../../types";
import getAllPossibleFiles from "./getAllPossibleFiles";
import getFilesToCopy from "./getFilesToCopy";
import getRelativePathOfFileWhenCopied from "./getRelativePathOfFileWhenCopied";
import renderFile from "./renderFile";
import { templatesSourcePath } from "../../getTemplates";

/**
 * Copies, scaffolds, and replaces in the temporary directory.
 *
 * @returns A Promise that resolves with an array of the paths to the copied files in the temporary directory.
 */
export default async function copyToTempDir(
  config: Config,
  tempDirPath: string
): Promise<string[]> {
  /** The path of the copied files in the temporary directory. */
  const copiedFiles: string[] = [];
  /** from the top-level, ./templates/`config.template` */
  const templatePath: string = join(templatesSourcePath, config.template);
  // __ is bold, had to escape the first _ characters
  /** from the top-level, ./templates/\_\_common__ */
  const commonTemplatePath: string = join(templatesSourcePath, "__common__");

  // Merge files from the common and specific templates, preferring files from the specific template.
  const filesToCopy: string[] = getFilesToCopy(
    await getAllPossibleFiles(templatePath, commonTemplatePath)
  );

  await Promise.all(
    filesToCopy.map(async (file: string) => {
      // handle description files
      if (basename(file) === "__description__.txt") return;

      // Read the file into a string.
      let contents: string = readFileSync(file, "utf-8");

      // If the file contains `{{ any-string-here }}`,
      if (/{{ .+ }}/gm.test(contents)) {
        // render the file.
        contents = renderFile(contents, config);
      }

      /** The location in the temporary directory to write the file to. */
      const fileLocation: string = join(
        tempDirPath,
        getRelativePathOfFileWhenCopied(file, true)
      );

      // TODO: does this need to be turned into a promise and awaited?
      mkdir(dirname(fileLocation), { recursive: true }, (err) => {
        if (err) {
          // swallow errors where the directory already exists
          // TODO: is this cross-platform compatible?
          if (err.code === "EEXIST") return;
          throw err;
        }
      });

      // write the rendered data to its new location (see fileLocation)
      await writeFile(fileLocation, contents, "utf-8");
      copiedFiles.push(fileLocation);
    })
  );

  // Return an array of the paths to the copied files.
  return copiedFiles.sort();
}
