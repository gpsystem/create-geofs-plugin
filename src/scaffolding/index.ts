import { green, yellow } from "../chalkTypes";
import { mkdtemp, rmSync } from "fs-extra";
import type { Config } from "../types";
import copyToFinalDir from "./copyToFinalDir";
import copyToTempDir from "./copyToTempDir";
import { join } from "node:path";
import { tmpdir } from "node:os";

export default async function scaffold(config: Config): Promise<void> {
  const tempDirPath = await mkdtemp(join(tmpdir(), "__create_geofs_plugin__"));

  const tempDirFilePaths = await copyToTempDir(config, tempDirPath);

  // copy to the final directory
  const results = await copyToFinalDir(
    tempDirFilePaths,
    tempDirPath,
    config.destination,
    config.overwrite
  );

  // output results of copying
  results.forEach((fileInfo) => {
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
