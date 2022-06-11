import { resolve } from "node:path";
import { cwd } from "node:process";
import { Command } from "commander";
import { sync as packageDirectorySync } from "pkg-dir";
import { version } from "../package.json";

export interface Configuration {
  targetDir: string;
  templateName: "default" | "typescript" | "react" | "react-ts";
  templateDir: string;
  overwrite: boolean;
}

export function parseConfig(argv: string[]): Configuration {
  let destination = "";

  // eslint-disable-next-line prefer-const
  let { overwrite, template } = new Command()
    .name("create-geofs-plugin")
    .version(`Create GeoFS Plugin v${version}`)
    .argument("<destination>")
    .action((dest: string) => {
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

  // TODO: create templates
  const templateDir: string | undefined = require.resolve(
    // `@geps/cgp-template-${template}`
    `@geps/cgp-eslint-config`
  );
  if (!templateDir) throw new Error("template not found");

  return {
    targetDir: destination,
    overwrite: overwrite ?? false,
    templateName: template as "default" | "typescript" | "react" | "react-ts",
    templateDir,
  };
}
