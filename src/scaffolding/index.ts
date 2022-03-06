import { green, yellow } from "../chalkTypes";
import { mkdtemp, rmSync } from "fs-extra";
import type { Config } from "../types";
import copyToFinalDir from "./copyToFinalDir";
import copyToTempDir from "./copyToTempDir";
import { join } from "node:path";
import type { Results } from "./copyToFinalDir";
import { tmpdir } from "node:os";

/**
 * Scaffold out the files from the templates.
 *
 * The scaffolding process merges the default template and the user-specified, "specific" template.
 * It does so with preference to the specific template.
 *
 * The scaffolding process contains a replacement step.
 * The step replaces the syntax `{{ config-option-name }}` with the value of the specified config option.
 *
 * @param config The configuration to use while replacing file contents.
 * Also used for folder names when creating the final directory.
 */
export default async function scaffold(config: Config): Promise<void> {
  /** The temporary directory for temporary holding of scaffolded files. */
  const tempDirPath: string = await mkdtemp(
    join(tmpdir(), "__create_geofs_plugin__")
  );

  /** The paths to the files scaffolded in the temporary directory. */
  const tempDirFilePaths: string[] = await copyToTempDir(config, tempDirPath);

  // copy to the final directory
  const results: Results[] = copyToFinalDir(
    tempDirFilePaths,
    tempDirPath,
    config.destination,
    config.overwrite
  );

  // output results of copying
  results.forEach((fileInfo: Results) => {
    console.log(
      `${
        fileInfo.skipped
          ? yellow("skipped existing file")
          : green("created file")
      }: ${fileInfo.path}`
    );
  });

  console.log("\nFinished scaffolding!");

  // forcefully remove the temp directory
  rmSync(tempDirPath, { recursive: true, force: true });
}
