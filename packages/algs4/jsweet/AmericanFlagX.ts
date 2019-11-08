import { Stack } from './Stack';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The {@code AmericanFlagX} class provides static methods for sorting an
 * array of extended ASCII strings or integers in-place using
 * American Flag sort. This implementation is non-recursive and uses only
 * one auxiliary array.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/51radix">Section 5.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne
 * and <a href = "http://static.usenix.org/publications/compsystems/1993/win_mcilroy.pdf">
 * Engineering Radix Sort</a> by McIlroy and Bostic.
 * For a version that uses two auxilary arrays, see {@link AmericanFlag}.
 *
 * @author Ivan Pesin
 * @class
 */
export class AmericanFlagX {
  static R = 256;

  static CUTOFF = 15;



  private static charAt(s: string, d: number): number {
    if (d === s.length) return -1;
    return s.charAt(d).charCodeAt(0);
  }

  public static sort$java_lang_String_A(a: string[]) {
    AmericanFlagX.sort$java_lang_String_A$int$int(a, 0, a.length - 1);
  }

  public static sort$java_lang_String_A$int$int(
    a: string[],
    lo: number,
    hi: number
  ) {
    const st: Stack<number> = <any>new Stack<number>();
    const count: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(AmericanFlagX.R + 1);
    let d = 0;
    st.push(lo);
    st.push(hi);
    st.push(d);
    while (!st.isEmpty()) {
      {
        d = st.pop();
        hi = st.pop();
        lo = st.pop();
        if (hi <= lo + AmericanFlagX.CUTOFF) {
          AmericanFlagX.insertion(a, lo, hi, d);
          continue;
        }
        for (let i: number = lo; i <= hi; i++) {
          {
            const c: number = AmericanFlagX.charAt(a[i], d) + 1;
            count[c]++;
          }
        }
        count[0] += lo;
        for (let c = 0; c < AmericanFlagX.R; c++) {
          {
            count[c + 1] += count[c];
            if (c > 0 && count[c + 1] - 1 > count[c]) {
              st.push(count[c]);
              st.push(count[c + 1] - 1);
              st.push(d + 1);
            }
          }
        }
        for (let r: number = hi; r >= lo; r--) {
          {
            let c: number = AmericanFlagX.charAt(a[r], d) + 1;
            while (r >= lo && count[c] - 1 <= r) {
              {
                if (count[c] - 1 === r) count[c]--;
                r--;
                if (r >= lo) c = AmericanFlagX.charAt(a[r], d) + 1;
              }
            }
            if (r < lo) break;
            while (--count[c] !== r) {
              {
                AmericanFlagX.exch(a, r, count[c]);
                c = AmericanFlagX.charAt(a[r], d) + 1;
              }
            }
          }
        }
        for (let c = 0; c < AmericanFlagX.R + 1; c++) {
          count[c] = 0;
        }
      }
    }
  }

  public static sort(a?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'string')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>AmericanFlagX.sort$java_lang_String_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'string')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>AmericanFlagX.sort$java_lang_String_A(a);
    }
    throw new Error('invalid overload');
  }

  private static insertion(a: string[], lo: number, hi: number, d: number) {
    for (let i: number = lo; i <= hi; i++) {
      for (
        let j: number = i;
        j > lo && AmericanFlagX.less(a[j], a[j - 1], d);
        j--
      ) {
        AmericanFlagX.exch(a, j, j - 1);
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

  /**
   * Reads in a sequence of extended ASCII strings or non-negative ints from standard input;
   * American flag sorts them;
   * and prints them to standard output in ascending order.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    AmericanFlagX.sort$java_lang_String_A(a);
    for (let i = 0; i < a.length; i++) {
      StdOut.println$java_lang_Object(a[i]);
    }
  }
}
AmericanFlagX.__class = 'edu.princeton.cs.algs4.AmericanFlagX';

AmericanFlagX.main(null);
