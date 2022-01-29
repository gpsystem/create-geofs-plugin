import type { Config, InitialConfig } from "../types";
import { isAbsolute, resolve } from "path";
import { Command } from "commander";
import getMissingConfig from "./getMissingConfig";
import getTemplates from "../getTemplates";
import handlePotentialString from "./handlePotentialString";
import { version } from "../version.json";

/**
 * Parses, sanitizes, and acquires all configuration.
 */
export default async function getConfig(): Promise<Config> {
  let destination = "";

  const program = new Command("create-geofs-plugin")
    .argument("<destination>")
    .action((dest: string | undefined) => {
      if (dest) destination = isAbsolute(dest) ? dest : resolve(dest);
      else destination = resolve("./geofs-plugin");
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

  const directOptions = program.parse().opts<InitialConfig>();

  if (directOptions.showTemplates) {
    getTemplates().forEach(({ name }) => console.log(name));
    process.exit(0);
  }

  return await getMissingConfig({
    destination,
    gitInit: directOptions.gitInit,
    overwrite: directOptions.overwrite,
    appName: handlePotentialString(directOptions.appName),
    author: handlePotentialString(directOptions.author),
    description: handlePotentialString(directOptions.description),
    email: handlePotentialString(directOptions.email),
    repo: handlePotentialString(directOptions.repo),
    template: handlePotentialString(directOptions.template),
    user: handlePotentialString(directOptions.user),
  });
}
