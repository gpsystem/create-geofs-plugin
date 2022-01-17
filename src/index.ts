import getConfig from "./config";
import printSuccess from "./printSuccess";
import { red } from "./chalkTypes";

async function main(): Promise<void> {
  try {
    const config = await getConfig();
    // merge the common template and the specific template into a temp folder, then copy to the target folder
    // initialize git
    // run npm i, then npm run build
    printSuccess(config.appName, config.destination);
  } catch (err) {
    console.log(red("Creation failed, see error below:"));
    console.error(err);
  }
}

main();
