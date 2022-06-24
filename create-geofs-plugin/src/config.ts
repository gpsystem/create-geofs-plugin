import { dirname, join, resolve } from "node:path";
import { cwd } from "node:process";
import { Command } from "commander";
import { version } from "../package.json";

/**
 * The processed configuration. This is the result of parsing the command line arguments.
 */
export interface Configuration {
  targetDir: string;
  templateDir: string;
  templateName: "default" | "typescript" | "react" | "react-ts";
  templateTopLevelDir: string;
  overwrite: boolean;
}

/**
 * Parses the command line arguments and returns the configuration.
 * @param argv The command line arguments. Should always be process.argv.
 * @returns The processed configuration.
 */
export function parseConfig(argv: string[]): Configuration {
  let destination = "";

  let { overwrite, template } = new Command()
    .name("create-geofs-plugin")
    .version(`Create GeoFS Plugin v${version}`)
    .argument("<destination>")
    .action((dest: string) => {
      // TODO: is this check a bit too harsh?
      if (!dest.includes("/"))
        throw new Error("argument <destination> must be a relative path");
      else destination = resolve(cwd(), dest);
    })
    .option("--overwrite", "Overwrite existing files", false)
    .option("-t, --template <template>", "Name of the template to use")
    .parse(argv)
    .opts<{ overwrite?: boolean; template?: string }>();

  if (!["default", "typescript", "react", "react-ts"].includes(template ?? ""))
    template = "default";

  // hack: getting the directory name of a file that will always be in the top-level
  const templateTopLevelDir: string = dirname(
    require.resolve(`@geps/cgp-template-${template}/README.md`)
  );

  return {
    overwrite: overwrite ?? false,
    templateDir: join(templateTopLevelDir, "template"),
    targetDir: destination,
    templateTopLevelDir,
    // template is validated against an array of the possible template names, so this assertion is safe
    templateName: template as "default" | "typescript" | "react" | "react-ts",
  };
}
