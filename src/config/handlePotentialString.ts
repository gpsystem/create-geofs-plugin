import isNil from "lodash/isNil";

export default function handlePotentialString(possibleString: unknown) {
  return !isNil(possibleString) ? String(possibleString) : undefined;
}
