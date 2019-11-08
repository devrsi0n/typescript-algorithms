import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The {@code MSD} class provides static methods for sorting an
 * array of extended ASCII strings or integers using MSD radix sort.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/51radix">Section 5.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class MSD {
  static BITS_PER_BYTE = 8;

  static BITS_PER_INT = 32;

  static R = 256;

  static CUTOFF = 15;



  public static sort$java_lang_String_A(a: string[]) {
    const n: number = a.length;
    const aux: string[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    MSD.sort$java_lang_String_A$int$int$int$java_lang_String_A(
      a,
      0,
      n - 1,
      0,
      aux
    );
  }

  private static charAt(s: string, d: number): number {
    if (d === s.length) return -1;
    return s.charAt(d).charCodeAt(0);
  }

  public static sort$java_lang_String_A$int$int$int$java_lang_String_A(
    a: string[],
    lo: number,
    hi: number,
    d: number,
    aux: string[]
  ) {
    if (hi <= lo + MSD.CUTOFF) {
      MSD.insertion$java_lang_String_A$int$int$int(a, lo, hi, d);
      return;
    }
    const count: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(MSD.R + 2);
    for (let i: number = lo; i <= hi; i++) {
      {
        const c: number = MSD.charAt(a[i], d);
        count[c + 2]++;
      }
    }
    for (let r = 0; r < MSD.R + 1; r++) {
      count[r + 1] += count[r];
    }
    for (let i: number = lo; i <= hi; i++) {
      {
        const c: number = MSD.charAt(a[i], d);
        aux[count[c + 1]++] = a[i];
      }
    }
    for (let i: number = lo; i <= hi; i++) {
      a[i] = aux[i - lo];
    }
    for (let r = 0; r < MSD.R; r++) {
      MSD.sort$java_lang_String_A$int$int$int$java_lang_String_A(
        a,
        lo + count[r],
        lo + count[r + 1] - 1,
        d + 1,
        aux
      );
    }
  }

  public static sort(a?: any, lo?: any, hi?: any, d?: any, aux?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'string')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null) &&
      (typeof d === 'number' || d === null) &&
      ((aux != null &&
        aux instanceof <any>Array &&
        (aux.length == 0 || aux[0] == null || typeof aux[0] === 'string')) ||
        aux === null)
    ) {
      return <any>(
        MSD.sort$java_lang_String_A$int$int$int$java_lang_String_A(
          a,
          lo,
          hi,
          d,
          aux
        )
      );
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null) &&
      (typeof d === 'number' || d === null) &&
      ((aux != null &&
        aux instanceof <any>Array &&
        (aux.length == 0 || aux[0] == null || typeof aux[0] === 'number')) ||
        aux === null)
    ) {
      return <any>MSD.sort$int_A$int$int$int$int_A(a, lo, hi, d, aux);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'string')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined &&
      d === undefined &&
      aux === undefined
    ) {
      return <any>MSD.sort$java_lang_String_A(a);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      lo === undefined &&
      hi === undefined &&
      d === undefined &&
      aux === undefined
    ) {
      return <any>MSD.sort$int_A(a);
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
      for (let j: number = i; j > lo && MSD.less(a[j], a[j - 1], d); j--) {
        MSD.exch$java_lang_String_A$int$int(a, j, j - 1);
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
      return <any>MSD.insertion$java_lang_String_A$int$int$int(a, lo, hi, d);
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
      return <any>MSD.insertion$int_A$int$int$int(a, lo, hi, d);
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
      return <any>MSD.exch$java_lang_String_A$int$int(a, i, j);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof i === 'number' || i === null) &&
      (typeof j === 'number' || j === null)
    ) {
      return <any>MSD.exch$int_A$int$int(a, i, j);
    }
    throw new Error('invalid overload');
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

  public static sort$int_A(a: number[]) {
    const n: number = a.length;
    const aux: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    MSD.sort$int_A$int$int$int$int_A(a, 0, n - 1, 0, aux);
  }

  private static sort$int_A$int$int$int$int_A(
    a: number[],
    lo: number,
    hi: number,
    d: number,
    aux: number[]
  ) {
    if (hi <= lo + MSD.CUTOFF) {
      MSD.insertion$int_A$int$int$int(a, lo, hi, d);
      return;
    }
    const count: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(MSD.R + 1);
    const mask: number = MSD.R - 1;
    const shift: number =
      MSD.BITS_PER_INT - MSD.BITS_PER_BYTE * d - MSD.BITS_PER_BYTE;
    for (let i: number = lo; i <= hi; i++) {
      {
        const c: number = (a[i] >> shift) & mask;
        count[c + 1]++;
      }
    }
    for (let r = 0; r < MSD.R; r++) {
      count[r + 1] += count[r];
    }
    for (let i: number = lo; i <= hi; i++) {
      {
        const c: number = (a[i] >> shift) & mask;
        aux[count[c]++] = a[i];
      }
    }
    for (let i: number = lo; i <= hi; i++) {
      a[i] = aux[i - lo];
    }
    if (d === 4) return;
    if (count[0] > 0)
      MSD.sort$int_A$int$int$int$int_A(a, lo, lo + count[0] - 1, d + 1, aux);
    for (let r = 0; r < MSD.R; r++) {
      if (count[r + 1] > count[r])
        MSD.sort$int_A$int$int$int$int_A(
          a,
          lo + count[r],
          lo + count[r + 1] - 1,
          d + 1,
          aux
        );
    }
  }

  private static insertion$int_A$int$int$int(
    a: number[],
    lo: number,
    hi: number,
    d: number
  ) {
    for (let i: number = lo; i <= hi; i++) {
      for (let j: number = i; j > lo && a[j] < a[j - 1]; j--) {
        MSD.exch$int_A$int$int(a, j, j - 1);
      }
    }
  }

  private static exch$int_A$int$int(a: number[], i: number, j: number) {
    const temp: number = a[i];
    a[i] = a[j];
    a[j] = temp;
  }

  /**
   * Reads in a sequence of extended ASCII strings from standard input;
   * MSD radix sorts them;
   * and prints them to standard output in ascending order.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    const n: number = a.length;
    MSD.sort$java_lang_String_A(a);
    for (let i = 0; i < n; i++) {
      StdOut.println$java_lang_Object(a[i]);
    }
  }
}
MSD.__class = 'edu.princeton.cs.algs4.MSD';

MSD.main(null);
