import { join } from "node:path";
import { dump } from "js-yaml";
import { dir, DirectoryResult } from "tmp-promise";
import { Configuration, parseConfig } from "./config";
import { copyDir, outputFile } from "./fsHelpers";
import { initializeNpm } from "./npmHelpers";
import removePrivateFiles from "./removePrivateFiles";
import expandTemplateJson from "./template";

export async function start(
  argv: string[],
  { ci = false } = {}
): Promise<void> {
  const config: Configuration = parseConfig(argv);
  const { path: tmpDirPath, cleanup: cleanupTempDir }: DirectoryResult =
    await dir({
      unsafeCleanup: true,
    });

  // config.templateDir is the top level of the template package
  copyDir(join(config.templateDir, "template"), tmpDirPath);
  const {
    dependencies: templateDeps,
    eslintConfig,
  }: { dependencies: string[]; eslintConfig: Record<string, unknown> } =
    expandTemplateJson(join(config.templateDir, "template.json"));

  removePrivateFiles(tmpDirPath);
  outputFile(join(tmpDirPath, ".eslintrc.yml"), dump(eslintConfig));
  copyDir(tmpDirPath, config.targetDir, { overwrite: config.overwrite });
  initializeNpm(config.targetDir, templateDeps, { ci });

  await cleanupTempDir();
}
