import { isNil } from "lodash";

export default function handlePotentialString(possibleString: unknown) {
  return !isNil(possibleString) ? String(possibleString) : undefined;
}
