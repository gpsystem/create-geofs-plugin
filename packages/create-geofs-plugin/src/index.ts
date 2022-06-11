import { DirectoryResult, dir } from "tmp-promise";
import { Configuration, parseConfig } from "./config";
import { copyDir } from "./fsHelpers";

export async function start(argv: string[]): Promise<void> {
  const config: Configuration = parseConfig(argv);
  const { path: tmpDirName, cleanup: cleanupTempDir }: DirectoryResult =
    await dir({
      unsafeCleanup: true,
    });

  // copyDir(config.templateDir, tmpDirName);
  // expand the template.json into both a .eslintrc.yml, store the deps somewhere
  // remove everything that starts with __
  // copy everything to the target dir
  // install the dependencies
  cleanupTempDir();
}
