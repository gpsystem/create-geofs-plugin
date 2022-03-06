import { bold } from "../chalkTypes";

export default function NpmError(msg: string, command: string): Error {
  return new Error(`

  Could not ${msg}.
  Try running ${bold(`npm ` + command)} yourself.

  `);
}
