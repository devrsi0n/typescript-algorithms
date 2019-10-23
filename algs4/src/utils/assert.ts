export default function assert(x: boolean, message: string) {
  if (typeof x === 'undefined' || x === null) {
    throw new Error(message);
  }
}

export function assertSafeNumber(
  x: number | number[],
  message = 'Must be valid number'
) {
  if (
    !Array.isArray(x) &&
    (typeof x === 'undefined' ||
      x === null ||
      !Number.isFinite(x) ||
      Number.isNaN(x))
  ) {
    throw new Error(message);
  }
  if (Array.isArray(x)) {
    for (const item of x as number[]) {
      if (
        typeof item === 'undefined' ||
        item === null ||
        !Number.isFinite(item) ||
        Number.isNaN(item)
      ) {
        throw new Error(message);
      }
    }
  }
}
