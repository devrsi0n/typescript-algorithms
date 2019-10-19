export default function assert(x: boolean, message: string) {
  if (!x) {
    throw new Error(message);
  }
}

export function assertSafeNumber(x: number, message = 'Must be valid number') {
  if (!x || !Number.isFinite(x) || Number.isNaN(x)) {
    throw new Error(message);
  }
}
