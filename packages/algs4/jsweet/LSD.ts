import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The `LSD` class provides static methods for sorting an
 * array of <em>w</em>-character strings or 32-bit integers using LSD radix sort.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/51radix">Section 5.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class LSD {
  static BITS_PER_BYTE = 8;

  public static sort$java_lang_String_A$int(a: string[], w: number) {
    const n: number = a.length;
    const R = 256;
    const aux: string[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let d: number = w - 1; d >= 0; d--) {
      {
        const count: number[] = ((s) => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(R + 1);
        for (let i = 0; i < n; i++) {
          count[
            ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
              a[i].charAt(d)
            ) + 1
          ]++;
        }
        for (let r = 0; r < R; r++) {
          count[r + 1] += count[r];
        }
        for (let i = 0; i < n; i++) {
          aux[count[a[i].charAt(d).charCodeAt(0)]++] = a[i];
        }
        for (let i = 0; i < n; i++) {
          a[i] = aux[i];
        }
      }
    }
  }

  /**
   *
   * Rearranges the array of W-character strings in ascending order.
   *
   * @param  a the array to be sorted
   * @param  w the number of characters per string
   */
  public static sort(a?: any, w?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'string')) ||
        a === null) &&
      (typeof w === 'number' || w === null)
    ) {
      return <any>LSD.sort$java_lang_String_A$int(a, w);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      w === undefined
    ) {
      return <any>LSD.sort$int_A(a);
    }
    throw new Error('invalid overload');
  }

  public static sort$int_A(a: number[]) {
    const BITS = 32;
    const R: number = 1 << LSD.BITS_PER_BYTE;
    const MASK: number = R - 1;
    const w: number = (BITS / LSD.BITS_PER_BYTE) | 0;
    const n: number = a.length;
    const aux: number[] = new Array(n).fill(0);
    for (let d = 0; d < w; d++) {
      {
        const count: number[] = ((s) => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(R + 1);
        for (let i = 0; i < n; i++) {
          {
            const c: number = (a[i] >> (LSD.BITS_PER_BYTE * d)) & MASK;
            count[c + 1]++;
          }
        }
        for (let r = 0; r < R; r++) {
          count[r + 1] += count[r];
        }
        if (d === w - 1) {
          const shift1: number = count[R] - count[(R / 2) | 0];
          const shift2: number = count[(R / 2) | 0];
          for (let r = 0; r < ((R / 2) | 0); r++) {
            count[r] += shift1;
          }
          for (let r: number = (R / 2) | 0; r < R; r++) {
            count[r] -= shift2;
          }
        }
        for (let i = 0; i < n; i++) {
          {
            const c: number = (a[i] >> (LSD.BITS_PER_BYTE * d)) & MASK;
            aux[count[c]++] = a[i];
          }
        }
        for (let i = 0; i < n; i++) {
          a[i] = aux[i];
        }
      }
    }
  }

  /**
   * Reads in a sequence of fixed-length strings from standard input;
   * LSD radix sorts them;
   * and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    const n: number = a.length;
    const w: number = a[0].length;
    for (let i = 0; i < n; i++) {}
    LSD.sort$java_lang_String_A$int(a, w);
    for (let i = 0; i < n; i++) {
      StdOut.println$java_lang_Object(a[i]);
    }
  }
}
LSD.__class = 'edu.princeton.cs.algs4.LSD';

LSD.main(null);
