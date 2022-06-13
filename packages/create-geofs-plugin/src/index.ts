import { join } from "node:path";
import { dir, DirectoryResult } from "tmp-promise";
import { Configuration, parseConfig } from "./config";
import { copyDir } from "./fsHelpers";
import removePrivateFiles from "./removePrivateFiles";
import expandTemplateJson, { ExpandedTemplateJson } from "./template";

export async function start(argv: string[]): Promise<void> {
  const config: Configuration = parseConfig(argv);
  const { path: tmpDirPath, cleanup: cleanupTempDir }: DirectoryResult =
    await dir({
      unsafeCleanup: true,
    });

  copyDir(config.templateDir, tmpDirPath, { overwrite: config.overwrite });
  const { dependencies: templateDeps, eslintConfig }: ExpandedTemplateJson =
    expandTemplateJson(join(tmpDirPath, "template.json"));

  removePrivateFiles(tmpDirPath);
  // remove everything that starts with __
  // copy everything to the target dir
  // install the dependencies

  await cleanupTempDir();
}
