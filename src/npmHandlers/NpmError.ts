import { bold } from "../chalkTypes";

export default class NpmError extends Error {
  constructor(msg: string, command: string) {
    const message = `

Could not ${msg}.
Try running ${bold("npm " + command)} yourself.

`;
    super(message);
  }
}
