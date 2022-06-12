import { CommandLineArgs } from "./index";

export type ArgPermutation = [permutationName: string, args: CommandLineArgs];

function isEmpty(obj: Record<string, unknown>): obj is Record<string, never> {
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      obj[key] !== undefined
    )
      return false;
  }
  return true;
}

function getNameFromArgs(args: CommandLineArgs): string {
  if (isEmpty(args as Record<string, unknown>)) return "vanilla";

  return (
    Object.entries(args)
      .reduce<string>(
        (acc, [argName, argValue]) =>
          argValue === undefined ? acc : acc + `${argName}:${argValue}/`,
        ""
      )
      // there will be an extra slash at the end, trim that off
      .slice(0, -1)
  );
}

// heavily inspired by https://dev.to/nas5w/a-12-line-javascript-function-to-get-all-combinations-of-an-object-s-properties-43i8
function createAllArgPermutations(): ArgPermutation[] {
  const possibleValues: Required<{
    [key in keyof CommandLineArgs]: CommandLineArgs[key][];
  }> = {
    template: [undefined, "typescript", "react", "react-ts"],
    overwrite: [undefined, true, false],
  };

  // the initial object is to get the loops started, it gets overwritten
  let allArgPermutations: CommandLineArgs[] = [{}];
  for (const [key, values] of Object.entries(possibleValues)) {
    const tempPermutationStorage: CommandLineArgs[] = [];
    for (const value of values) {
      for (const combo of allArgPermutations) {
        tempPermutationStorage.push({ ...combo, [key]: value });
      }
    }
    allArgPermutations = tempPermutationStorage;
  }

  return allArgPermutations.map<ArgPermutation>((args) => [
    getNameFromArgs(args),
    args,
  ]);
}

export const allArgPermutations = createAllArgPermutations();