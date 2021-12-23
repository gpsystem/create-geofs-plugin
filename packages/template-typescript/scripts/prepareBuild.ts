import { rmSync, mkdirSync } from "fs";
import { join } from "path";
import { mainDir } from "./mainDir";

export function prepareBuild() {
  const distDirLocation = join(mainDir, "lib");
  // delete the dist directory
  rmSync(distDirLocation, { recursive: true, force: true });
  // create the dist directory
  mkdirSync(distDirLocation);
}
