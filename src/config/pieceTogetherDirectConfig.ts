import type { DirectConfig, InitialConfig } from "../types";

export default function pieceTogetherDirectConfig(
  destination: string,
  directOptions: InitialConfig
): DirectConfig {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { showTemplates: _, ...optionsWithoutDestination } = directOptions;
  return { destination, ...optionsWithoutDestination };
}
