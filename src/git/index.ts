import type { Config } from "../types";

export default async function gitInit(config: Config): Promise<void> {
  if (!config.gitInit) return;
  // TODO init git repo at config.destination
}
