import { join } from "path";
import { zipDirectory } from "./zipDirectory";
import { mainDir } from "../mainDir";

export async function zipTemplate() {
  const templateDirLocation = join(mainDir, "template");
  const templateZipOutputLocation = join(mainDir, "lib", "template.zip");

  await zipDirectory(templateDirLocation, templateZipOutputLocation);
}
