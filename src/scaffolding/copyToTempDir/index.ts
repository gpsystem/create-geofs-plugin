import { basename, dirname, join } from "path";
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
      // handle description files
      if (basename(file) === "__description__.txt") return;

      // handle gitignore files
      if (basename(file).endsWith("gitignore")) {
        copiedFiles.push(
          join(dirname(file), basename(file).replace("gitignore", ".gitignore"))
        );
      }

      let contents = readFileSync(file, "utf-8");
      if (/{{ .+ }}/gm.test(contents)) {
        contents = renderFile(contents, config);
      }
      const fileLocation = join(
        tempDirPath,
        getRelativePathOfFileWhenCopied(file)
      );
      mkdir(dirname(fileLocation), (err) => {
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
