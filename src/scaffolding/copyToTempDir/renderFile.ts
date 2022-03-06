import type { Config } from "../../types";

/**
 * Renders the text contents of a file with the stringified values of the configuration.
 * @returns The rendered text of the file.
 */
export default function renderFile(contents: string, config: Config): string {
  const keysOfConfig = Object.keys(config) as (keyof Config)[];

  // This function is called if the file contains the trigger pattern {{ anything }} to save on performance
  // This function is expensive, so return if there is no mention of {{ key-of-config }}
  if (!new RegExp(`{{ (${keysOfConfig.join("|")}) }}`, "gm").test(contents))
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
