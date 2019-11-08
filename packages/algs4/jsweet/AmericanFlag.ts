import { Stack } from './Stack';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The {@code AmericanFlag} class provides static methods for sorting an
 * array of extended ASCII strings or integers in-place using
 * American flag sort. This is a non-recursive implementation.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/51radix">Section 5.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne
 * and <a href = "http://static.usenix.org/publications/compsystems/1993/win_mcilroy.pdf">
 * Engineering Radix Sort</a> by McIlroy and Bostic.
 * For a version that uses only one auxilary array, see {@link AmericanFlagX}.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @author Ivan Pesin
 * @class
 */
export class AmericanFlag {
  static BITS_PER_BYTE = 8;

  static BITS_PER_INT = 32;

  static R = 256;

  static CUTOFF = 15;

  private static charAt(s: string, d: number): number {
    if (d === s.length) return -1;
    return s.charAt(d).charCodeAt(0);
  }

  public static sort$java_lang_String_A(a: string[]) {
    AmericanFlag.sort$java_lang_String_A$int$int(a, 0, a.length - 1);
  }

  public static sort$java_lang_String_A$int$int(
    a: string[],
    lo: number,
    hi: number
  ) {
    const st: Stack<number> = <any>new Stack<number>();
    const first: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(AmericanFlag.R + 2);
    const next: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(AmericanFlag.R + 2);
    let d = 0;
    st.push(lo);
    st.push(hi);
    st.push(d);
    while (!st.isEmpty()) {
      {
        d = st.pop();
        hi = st.pop();
        lo = st.pop();
        if (hi <= lo + AmericanFlag.CUTOFF) {
          AmericanFlag.insertion$java_lang_String_A$int$int$int(a, lo, hi, d);
          continue;
        }
        for (let i: number = lo; i <= hi; i++) {
          {
            const c: number = AmericanFlag.charAt(a[i], d) + 1;
            first[c + 1]++;
          }
        }
        first[0] = lo;
        for (let c = 0; c <= AmericanFlag.R; c++) {
          {
            first[c + 1] += first[c];
            if (c > 0 && first[c + 1] - 1 > first[c]) {
              st.push(first[c]);
              st.push(first[c + 1] - 1);
              st.push(d + 1);
            }
          }
        }
        for (let c = 0; c < AmericanFlag.R + 2; c++) {
          next[c] = first[c];
        }
        for (let k: number = lo; k <= hi; k++) {
          {
            let c: number = AmericanFlag.charAt(a[k], d) + 1;
            while (first[c] > k) {
              {
                AmericanFlag.exch$java_lang_String_A$int$int(a, k, next[c]++);
                c = AmericanFlag.charAt(a[k], d) + 1;
              }
            }
            next[c]++;
          }
        }
        for (let c = 0; c < AmericanFlag.R + 2; c++) {
          {
            first[c] = 0;
            next[c] = 0;
          }
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
      return <any>AmericanFlag.sort$java_lang_String_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>AmericanFlag.sort$int_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'string')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>AmericanFlag.sort$java_lang_String_A(a);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>AmericanFlag.sort$int_A(a);
    }
    throw new Error('invalid overload');
  }

  public static insertion$java_lang_String_A$int$int$int(
    a: string[],
    lo: number,
    hi: number,
    d: number
  ) {
    for (let i: number = lo; i <= hi; i++) {
      for (
        let j: number = i;
        j > lo &&
        AmericanFlag.less$java_lang_String$java_lang_String$int(
          a[j],
          a[j - 1],
          d
        );
        j--
      ) {
        AmericanFlag.exch$java_lang_String_A$int$int(a, j, j - 1);
      }
    }
  }

  public static insertion(a?: any, lo?: any, hi?: any, d?: any): any {
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
        AmericanFlag.insertion$java_lang_String_A$int$int$int(a, lo, hi, d)
      );
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null) &&
      (typeof d === 'number' || d === null)
    ) {
      return <any>AmericanFlag.insertion$int_A$int$int$int(a, lo, hi, d);
    }
    throw new Error('invalid overload');
  }

  public static exch$java_lang_String_A$int$int(
    a: string[],
    i: number,
    j: number
  ) {
    const temp: string = a[i];
    a[i] = a[j];
    a[j] = temp;
  }

  public static exch(a?: any, i?: any, j?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'string')) ||
        a === null) &&
      (typeof i === 'number' || i === null) &&
      (typeof j === 'number' || j === null)
    ) {
      return <any>AmericanFlag.exch$java_lang_String_A$int$int(a, i, j);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof i === 'number' || i === null) &&
      (typeof j === 'number' || j === null)
    ) {
      return <any>AmericanFlag.exch$int_A$int$int(a, i, j);
    }
    throw new Error('invalid overload');
  }

  public static less$java_lang_String$java_lang_String$int(
    v: string,
    w: string,
    d: number
  ): boolean {
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

  public static less(v?: any, w?: any, d?: any): any {
    if (
      (typeof v === 'string' || v === null) &&
      (typeof w === 'string' || w === null) &&
      (typeof d === 'number' || d === null)
    ) {
      return <any>(
        AmericanFlag.less$java_lang_String$java_lang_String$int(v, w, d)
      );
    }
    if (
      (typeof v === 'number' || v === null) &&
      (typeof w === 'number' || w === null) &&
      (typeof d === 'number' || d === null)
    ) {
      return <any>AmericanFlag.less$int$int$int(v, w, d);
    }
    throw new Error('invalid overload');
  }

  public static sort$int_A(a: number[]) {
    AmericanFlag.sort$int_A$int$int(a, 0, a.length - 1);
  }

  private static sort$int_A$int$int(a: number[], lo: number, hi: number) {
    const st: Stack<number> = <any>new Stack<number>();
    const first: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(AmericanFlag.R + 1);
    const next: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(AmericanFlag.R + 1);
    const mask: number = AmericanFlag.R - 1;
    let d = 0;
    st.push(lo);
    st.push(hi);
    st.push(d);
    while (!st.isEmpty()) {
      {
        d = st.pop();
        hi = st.pop();
        lo = st.pop();
        if (hi <= lo + AmericanFlag.CUTOFF) {
          AmericanFlag.insertion$int_A$int$int$int(a, lo, hi, d);
          continue;
        }
        const shift: number =
          AmericanFlag.BITS_PER_INT -
          AmericanFlag.BITS_PER_BYTE * d -
          AmericanFlag.BITS_PER_BYTE;
        for (let i: number = lo; i <= hi; i++) {
          {
            const c: number = (a[i] >> shift) & mask;
            first[c + 1]++;
          }
        }
        first[0] = lo;
        for (let c = 0; c < AmericanFlag.R; c++) {
          {
            first[c + 1] += first[c];
            if (d < 3 && first[c + 1] - 1 > first[c]) {
              st.push(first[c]);
              st.push(first[c + 1] - 1);
              st.push(d + 1);
            }
          }
        }
        for (let c = 0; c < AmericanFlag.R + 1; c++) {
          next[c] = first[c];
        }
        for (let k: number = lo; k <= hi; k++) {
          {
            let c: number = (a[k] >> shift) & mask;
            while (first[c] > k) {
              {
                AmericanFlag.exch$int_A$int$int(a, k, next[c]++);
                c = (a[k] >> shift) & mask;
              }
            }
            next[c]++;
          }
        }
        for (let c = 0; c < AmericanFlag.R + 1; c++) {
          {
            first[c] = 0;
            next[c] = 0;
          }
        }
      }
    }
  }

  private static insertion$int_A$int$int$int(
    a: number[],
    lo: number,
    hi: number,
    d: number
  ) {
    for (let i: number = lo; i <= hi; i++) {
      for (
        let j: number = i;
        j > lo && AmericanFlag.less$int$int$int(a[j], a[j - 1], d);
        j--
      ) {
        AmericanFlag.exch$int_A$int$int(a, j, j - 1);
      }
    }
  }

  private static exch$int_A$int$int(a: number[], i: number, j: number) {
    const temp: number = a[i];
    a[i] = a[j];
    a[j] = temp;
  }

  private static less$int$int$int(v: number, w: number, d: number): boolean {
    const mask: number = AmericanFlag.R - 1;
    for (let i: number = d; i < 4; i++) {
      {
        const shift: number =
          AmericanFlag.BITS_PER_INT -
          AmericanFlag.BITS_PER_BYTE * i -
          AmericanFlag.BITS_PER_BYTE;
        const a: number = (v >> shift) & mask;
        const b: number = (w >> shift) & mask;
        if (a < b) return true;
        if (a > b) return false;
      }
    }
    return false;
  }

  /**
   * Reads in a sequence of extended ASCII strings or non-negative ints from standard input;
   * American flag sorts them;
   * and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments: "int" to read input as non-negative integers
   */
  public static main(args: string[]) {
    if (args.length > 0 && /* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(args[0], 'int')) {
      const a: number[] = StdIn.readAllInts();
      AmericanFlag.sort$int_A(a);
      for (let i = 0; i < a.length; i++) {
        StdOut.println$int(a[i]);
      }
    } else {
      const a: string[] = StdIn.readAllStrings();
      AmericanFlag.sort$java_lang_String_A(a);
      for (let i = 0; i < a.length; i++) {
        StdOut.println$java_lang_Object(a[i]);
      }
    }
  }
}
AmericanFlag.__class = 'edu.princeton.cs.algs4.AmericanFlag';

AmericanFlag.main(null);
