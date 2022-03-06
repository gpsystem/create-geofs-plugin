import { blue, yellow } from "../chalkTypes";
import type { Config, InitialConfig, Template } from "../types";
import { isAbsolute, resolve } from "node:path";
import { Command } from "commander";
import getMissingConfig from "./getMissingConfig";
import getTemplates from "../getTemplates";
import pieceTogetherDirectConfig from "./pieceTogetherDirectConfig";
import { templateLiteralString } from "./getMissingConfig/getQuestions";
import { version } from "../version.json";

/**
 * Parses, sanitizes, and acquires all configuration.
 */
export default function getConfig(): Promise<Config> {
  let destination = "";

  const program = new Command("create-geofs-plugin")
    .argument("<destination>")
    .action((dest: string) => {
      destination = isAbsolute(dest) ? dest : resolve(dest);
    })
    .usage("[options] <destination>")
    .option("-n, --pluginName <plugin-name>", "Plugin name")
    .option('-d, --desc "<description>"', "Description (contain in quotes)")
    .option('-a, --author "<full-name>"', "Author name (contain in quotes)")
    .option("-e, --email <email>", "Author email address")
    .option("-u, --user <username>", "GitHub username or org (repo owner)")
    .option("-r, --repo <repo-name>", "Repository name")
    .option("--overwrite", "Overwrite existing files", false)
    .option("-t, --template <template>", "Name of use case template")
    .option("--show-templates", "Print list of available templates and exit")
    // the default gets piped directly to the config
    .option("--no-git-init", "Skip Git repository initialization", true)
    .version(`Create GeoFS Plugin v${version}`);

  const directOptions: InitialConfig = program.parse().opts<InitialConfig>();

  if (directOptions.showTemplates) {
    console.log(
      getTemplates()
        .reduce<string>(
          (currentlyAccumulatedValue, { name, description }: Template) => {
            return (
              currentlyAccumulatedValue +
              `${blue(name)}${templateLiteralString}${yellow(description)}` +
              "\n"
            );
          },
          ""
        )
        .trimEnd()
    );
    process.exit(0);
  }

  return getMissingConfig(
    pieceTogetherDirectConfig(destination, directOptions)
  );
}
