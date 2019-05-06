/**
 * Calculate 2 nonnegative integers's greatest common divisor(最大公约数)
 * @param p
 * @param q
 */
export default function gcb(p: number, q: number) {
  if (p < 0 || q < 0) {
    throw new Error('Input params must be nonnegative integer');
  }
  if (q === 0) {
    return p;
  }
  const r = p % q;
  return gcb(q, r);
}
