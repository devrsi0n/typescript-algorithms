import { StdRandom } from './StdRandom';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The {@code Quick3string} class provides static methods for sorting an
 * array of strings using 3-way radix quicksort.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/51radix">Section 5.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Quick3string {
  static CUTOFF = 15;



  public static sort$java_lang_String_A(a: string[]) {
    StdRandom.shuffle$java_lang_Object_A(a);
    Quick3string.sort$java_lang_String_A$int$int$int(a, 0, a.length - 1, 0);
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
    if (hi <= lo + Quick3string.CUTOFF) {
      Quick3string.insertion(a, lo, hi, d);
      return;
    }
    let lt: number = lo;
    let gt: number = hi;
    const v: number = Quick3string.charAt(a[lo], d);
    let i: number = lo + 1;
    while (i <= gt) {
      {
        const t: number = Quick3string.charAt(a[i], d);
        if (t < v) Quick3string.exch(a, lt++, i++);
        else if (t > v) Quick3string.exch(a, i, gt--);
        else i++;
      }
    }
    Quick3string.sort$java_lang_String_A$int$int$int(a, lo, lt - 1, d);
    if (v >= 0)
      Quick3string.sort$java_lang_String_A$int$int$int(a, lt, gt, d + 1);
    Quick3string.sort$java_lang_String_A$int$int$int(a, gt + 1, hi, d);
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
      return <any>(
        Quick3string.sort$java_lang_String_A$int$int$int(a, lo, hi, d)
      );
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
      return <any>Quick3string.sort$java_lang_String_A(a);
    }
    throw new Error('invalid overload');
  }

  private static insertion(a: string[], lo: number, hi: number, d: number) {
    for (let i: number = lo; i <= hi; i++) {
      for (
        let j: number = i;
        j > lo && Quick3string.less(a[j], a[j - 1], d);
        j--
      ) {
        Quick3string.exch(a, j, j - 1);
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
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            v.charAt(i)
          ) <
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(w.charAt(i))
        )
          return true;
        if (
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(
            v.charAt(i)
          ) >
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(w.charAt(i))
        )
          return false;
      }
    }
    return v.length < w.length;
  }

  private static isSorted(a: string[]): boolean {
    for (let i = 1; i < a.length; i++) {
      if (/* compareTo */ a[i].localeCompare(a[i - 1]) < 0) return false;
    }
    return true;
  }

  /**
   * Reads in a sequence of fixed-length strings from standard input;
   * 3-way radix quicksorts them;
   * and prints them to standard output in ascending order.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    const n: number = a.length;
    Quick3string.sort$java_lang_String_A(a);
    for (let i = 0; i < n; i++) {
      StdOut.println$java_lang_Object(a[i]);
    }
  }
}
Quick3string.__class = 'edu.princeton.cs.algs4.Quick3string';

Quick3string.main(null);
