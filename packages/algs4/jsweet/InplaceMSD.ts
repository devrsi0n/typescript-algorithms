import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The `InplaceMSD` class provides static methods for sorting an
 * array of extended ASCII strings using in-place MSD radix sort.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/51radix">Section 5.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Ivan Pesin
 * @class
 */
export class InplaceMSD {
  static R = 256;

  static CUTOFF = 15;

  public static sort$java_lang_String_A(a: string[]) {
    const n: number = a.length;
    InplaceMSD.sort$java_lang_String_A$int$int$int(a, 0, n - 1, 0);
  }

  private static charAt(s: string, d: number): number {
    if (d === s.length) return -1;
    return s.charAt(d).charCodeAt(0);
  }

  public static sort$java_lang_String_A$int$int$int(
    a: string[],
    lo: number,
    hi: number,
    d: number
  ) {
    if (hi <= lo + InplaceMSD.CUTOFF) {
      InplaceMSD.insertion(a, lo, hi, d);
      return;
    }
    const heads: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(InplaceMSD.R + 2);
    const tails: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(InplaceMSD.R + 1);
    for (let i: number = lo; i <= hi; i++) {
      {
        const c: number = InplaceMSD.charAt(a[i], d);
        heads[c + 2]++;
      }
    }
    heads[0] = lo;
    for (let r = 0; r < InplaceMSD.R + 1; r++) {
      {
        heads[r + 1] += heads[r];
        tails[r] = heads[r + 1];
      }
    }
    for (let r = 0; r < InplaceMSD.R + 1; r++) {
      {
        while (heads[r] < tails[r]) {
          {
            let c: number = InplaceMSD.charAt(a[heads[r]], d);
            while (c + 1 !== r) {
              {
                InplaceMSD.exch(a, heads[r], heads[c + 1]++);
                c = InplaceMSD.charAt(a[heads[r]], d);
              }
            }
            heads[r]++;
          }
        }
      }
    }
    for (let r = 0; r < InplaceMSD.R; r++) {
      InplaceMSD.sort$java_lang_String_A$int$int$int(
        a,
        tails[r],
        tails[r + 1] - 1,
        d + 1
      );
    }
  }

  public static sort(a?: any, lo?: any, hi?: any, d?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'string')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null) &&
      (typeof d === 'number' || d === null)
    ) {
      return <any>InplaceMSD.sort$java_lang_String_A$int$int$int(a, lo, hi, d);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'string')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined &&
      d === undefined
    ) {
      return <any>InplaceMSD.sort$java_lang_String_A(a);
    }
    throw new Error('invalid overload');
  }

  private static insertion(a: string[], lo: number, hi: number, d: number) {
    for (let i: number = lo; i <= hi; i++) {
      for (
        let j: number = i;
        j > lo && InplaceMSD.less(a[j], a[j - 1], d);
        j--
      ) {
        InplaceMSD.exch(a, j, j - 1);
      }
    }
  }

  private static exch(a: string[], i: number, j: number) {
    const temp: string = a[i];
    a[i] = a[j];
    a[j] = temp;
  }

  private static less(v: string, w: string, d: number): boolean {
    for (let i: number = d; i < Math.min(v.length, w.length); i++) {
      {
        if (
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            v.charAt(i)
          ) <
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            w.charAt(i)
          )
        )
          return true;
        if (
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            v.charAt(i)
          ) >
          ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            w.charAt(i)
          )
        )
          return false;
      }
    }
    return v.length < w.length;
  }

  /**
   * Reads in a sequence of extended ASCII strings from standard input;
   * in-place MSD radix sorts them;
   * and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    const n: number = a.length;
    InplaceMSD.sort$java_lang_String_A(a);
    for (let i = 0; i < n; i++) {
      StdOut.println$java_lang_Object(a[i]);
    }
  }
}
InplaceMSD.__class = 'edu.princeton.cs.algs4.InplaceMSD';

InplaceMSD.main(null);
