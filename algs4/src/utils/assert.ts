export default function assert(x: boolean, message: string) {
  if (!x) {
    throw new Error(message);
  }
}

export function assertSafeNumber(
  x: number | number[],
  message = 'Must be valid number'
) {
  if (!Array.isArray(x) && (!x || !Number.isFinite(x) || Number.isNaN(x))) {
    throw new Error(message);
  }
  if (Array.isArray(x)) {
    for (const item of x as number[]) {
      if (!item || !Number.isFinite(item) || Number.isNaN(item)) {
        throw new Error(message);
      }
    }
  }
}
