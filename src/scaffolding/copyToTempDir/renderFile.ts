import type { Config } from "../../types";

export default function renderFile(contents: string, config: Config): string {
  const keysOfConfig = Object.keys(config) as (keyof Config)[];

  if (!new RegExp(`{{ (${keysOfConfig.join("|")}) }}`).test(contents))
    return contents;

  return keysOfConfig.reduce<string>(
    (currentlyAccumulatedValue, currentArrayValue) =>
      currentlyAccumulatedValue.replace(
        new RegExp(`{{ ${currentArrayValue} }}`, "gm"),
        String(config[currentArrayValue])
      ),
    contents
  );
}
