import { join } from "node:path";
import { dump } from "js-yaml";
import { dir, DirectoryResult } from "tmp-promise";
import { Configuration, parseConfig } from "./config";
import { copyDir, outputFile } from "./fsHelpers";
import { initializeNpm } from "./npmHelpers";
import removePrivateFiles from "./removePrivateFiles";
import expandTemplateJson, { ExpandedTemplateJson } from "./template";

/**
 * Bootstraps a new GeoFS plugin.
 *
 * @param argv The command line arguments. Should always be process.argv.
 * @param options Options to use. These options determine the behavior of the bootstrapper.
 * User options should be passed in the argv array for processing by commander.
 * @param options.ci Whether to run in CI mode. CI mode will not install npm dependencies to save on time.
 * It will, however, inject the dependencies into the package.json file as an array for snapshotting.
 */
export async function start(
  argv: string[],
  { ci = false }: { ci?: boolean } = {}
): Promise<void> {
  const config: Configuration = parseConfig(argv);
  const { path: tmpDirPath, cleanup: cleanupTempDir }: DirectoryResult =
    await dir({
      unsafeCleanup: true,
    });

  copyDir(config.templateDir, tmpDirPath);
  const { dependencies: templateDeps, eslintConfig }: ExpandedTemplateJson =
    expandTemplateJson(join(config.templateTopLevelDir, "template.json"));

  removePrivateFiles(tmpDirPath);
  outputFile(
    join(tmpDirPath, ".eslintrc.yml"),
    dump(eslintConfig, {
      sortKeys: true,
    })
  );
  copyDir(tmpDirPath, config.targetDir, { overwrite: config.overwrite });
  initializeNpm(config.targetDir, templateDeps, { ci });

  await cleanupTempDir();
}
