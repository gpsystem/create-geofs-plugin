import execPromise from "./execPromise";
import NpmError from "./NpmError";

export default async function installAndBuild(
  destination: string
): Promise<void> {
  await execPromise("npm install", destination).catch(() => {
    throw new NpmError("install dependencies", "install");
  });
  await execPromise("npm run build", destination).catch(() => {
    throw new NpmError("build plugin", "run build");
  });
}
