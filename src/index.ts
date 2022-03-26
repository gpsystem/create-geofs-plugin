import getConfig from "./config";
import gitInit from "./git";
import installPackages from "./npmHandlers";
import printSuccess from "./printSuccess";
import { red } from "./chalkTypes";
import scaffold from "./scaffolding";

export async function start(argv: string[]): Promise<void> {
  try {
    const config = await getConfig(argv);
    await scaffold(config);
    if (config.gitInit) await gitInit(config.destination);
    await installPackages(config.destination);
    printSuccess(config.appName, config.destination);
  } catch (err: unknown) {
    console.log(red("Creation failed, see error below:"));
    throw err;
  }
}
