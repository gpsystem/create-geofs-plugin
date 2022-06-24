export function isObject(obj: unknown): obj is Record<string, unknown> {
  // intentionally allowing a comparison of both undefined and null
  // Object.getPrototypeOf will throw for both undefined and null
  // eslint-disable-next-line eqeqeq
  return obj != null && Object.getPrototypeOf(obj) === Object.prototype;
}
