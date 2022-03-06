import execPromise from "./execPromise";
import NpmError from "./NpmError";

export default async function installAndBuild(
  destination: string
): Promise<void> {
  // TODO: inform the user about the install and build

  await execPromise("npm install", destination).catch(() => {
    throw NpmError("install dependencies", "install");
  });
  await execPromise("npm run build", destination).catch(() => {
    throw NpmError("build plugin", "run build");
  });
}
