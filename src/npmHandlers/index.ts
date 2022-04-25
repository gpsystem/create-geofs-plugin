import { green, yellow } from "@colors/colors/safe";
import execPromise from "./execPromise";
import NpmError from "./NpmError";

export default async function installAndBuild(
  destination: string
): Promise<void> {
  console.log(
    yellow("Installing dependencies, this can take a few minutes...")
  );

  await execPromise("npm install", destination).catch(() => {
    throw NpmError("install dependencies", "install");
  });
  await execPromise("npm run build", destination).catch(() => {
    throw NpmError("build plugin", "run build");
  });

  console.log(green("Installed dependencies!"));
}
