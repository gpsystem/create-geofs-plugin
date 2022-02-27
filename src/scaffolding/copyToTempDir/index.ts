import { basename, dirname, join } from "node:path";
import { mkdir, readFileSync, writeFile } from "fs-extra";
import type { Config } from "../../types";
import getAllPossibleFiles from "./getAllPossibleFiles";
import getFilesToCopy from "./getFilesToCopy";
import getRelativePathOfFileWhenCopied from "./getRelativePathOfFileWhenCopied";
import renderFile from "./renderFile";
import { templatesSourcePath } from "../../getTemplates";

export default async function copyToTempDir(
  config: Config,
  tempDirPath: string
): Promise<string[]> {
  const copiedFiles: string[] = [];
  const templatePath = join(templatesSourcePath, config.template);
  const commonTemplatePath = join(templatesSourcePath, "__common__");

  const filesToCopy = getFilesToCopy(
    await getAllPossibleFiles(templatePath, commonTemplatePath)
  );

  await Promise.all(
    filesToCopy.map(async (file) => {
      const fileName = basename(file);
      // handle description files
      if (fileName === "__description__.txt") return;

      let contents = readFileSync(file, "utf-8");
      if (/{{ .+ }}/gm.test(contents)) {
        contents = renderFile(contents, config);
      }
      const fileLocation = join(
        tempDirPath,
        getRelativePathOfFileWhenCopied(file, true)
      );
      mkdir(dirname(fileLocation), { recursive: true }, (err) => {
        if (err) {
          // swallow errors where the directory already exists
          if (err.code === "EEXIST") return;
          throw err;
        }
      });
      await writeFile(fileLocation, contents, "utf-8");
      copiedFiles.push(fileLocation);
    })
  );

  return copiedFiles.sort();
}
