import getConfig from "./config";
import printSuccess from "./printSuccess";
import { red } from "./chalkTypes";
import scaffold from "./scaffolding";

async function main(): Promise<void> {
  try {
    const config = await getConfig();
    await scaffold(config);
    // initialize git
    // run npm i, then npm run build
    printSuccess(config.appName, config.destination);
  } catch (err: unknown) {
    console.log(red("Creation failed, see error below:"));
    throw err;
  }
}

main();
