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

  let name = "";

  for (const argName of Object.keys(args) as (keyof CommandLineArgs)[]) {
    if (Object.prototype.hasOwnProperty.call(args, argName)) {
      const element = args[argName] as CommandLineArgs[keyof CommandLineArgs];
      if (element === undefined) continue;

      name += `${argName}:${element}/`;
    }
  }

  // there will be an extra colon at the end, trim that off
  return name.slice(0, -1);
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
  Object.entries(possibleValues).forEach(([key, values]) => {
    const tempStorage: CommandLineArgs[] = [];
    values.forEach((value) => {
      allArgPermutations.forEach((combo) => {
        tempStorage.push({ ...combo, [key]: value });
      });
    });
    allArgPermutations = tempStorage;
  });

  console.log(allArgPermutations);
  return allArgPermutations.map<ArgPermutation>((args) => [
    getNameFromArgs(args),
    args,
  ]);
}

export const allArgPermutations = createAllArgPermutations();
