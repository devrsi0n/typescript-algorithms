import { Insertion } from './Insertion';
import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The `QuickX` class provides static methods for sorting an array
 * using an optimized version of quicksort (using Hoare's 2-way partitioning
 * algorithm, median-of-3 to choose the partitioning element, and cutoff
 * to insertion sort).
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/23quick">Section 2.3</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class QuickX {
  static INSERTION_SORT_CUTOFF = 8;

  public static sort$java_lang_Comparable_A(a: java.lang.Comparable<any>[]) {
    QuickX.sort$java_lang_Comparable_A$int$int(a, 0, a.length - 1);
  }

  public static sort$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ) {
    if (hi <= lo) return;
    const n: number = hi - lo + 1;
    if (n <= QuickX.INSERTION_SORT_CUTOFF) {
      Insertion.sort$java_lang_Comparable_A$int$int(a, lo, hi + 1);
      return;
    }
    const j: number = QuickX.partition(a, lo, hi);
    QuickX.sort$java_lang_Comparable_A$int$int(a, lo, j - 1);
    QuickX.sort$java_lang_Comparable_A$int$int(a, j + 1, hi);
  }

  public static sort(a?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 ||
          a[0] == null ||
          (a[0] != null &&
            ((a[0].__interfaces != null &&
              a[0].__interfaces.indexOf('java.lang.Comparable') >= 0) ||
              (a[0].constructor != null &&
                a[0].constructor.__interfaces != null &&
                a[0].constructor.__interfaces.indexOf('java.lang.Comparable') >=
                  0))))) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>QuickX.sort$java_lang_Comparable_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 ||
          a[0] == null ||
          (a[0] != null &&
            ((a[0].__interfaces != null &&
              a[0].__interfaces.indexOf('java.lang.Comparable') >= 0) ||
              (a[0].constructor != null &&
                a[0].constructor.__interfaces != null &&
                a[0].constructor.__interfaces.indexOf('java.lang.Comparable') >=
                  0))))) ||
        a === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>QuickX.sort$java_lang_Comparable_A(a);
    }
    throw new Error('invalid overload');
  }

  private static partition(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ): number {
    const n: number = hi - lo + 1;
    const m: number = QuickX.median3(a, lo, lo + ((n / 2) | 0), hi);
    QuickX.exch(a, m, lo);
    let i: number = lo;
    let j: number = hi + 1;
    const v: java.lang.Comparable<any> = a[lo];
    while (QuickX.less(a[++i], v)) {
      {
        if (i === hi) {
          QuickX.exch(a, lo, hi);
          return hi;
        }
      }
    }
    while (QuickX.less(v, a[--j])) {
      {
        if (j === lo + 1) return lo;
      }
    }
    while (i < j) {
      {
        QuickX.exch(a, i, j);
        while (QuickX.less(a[++i], v)) {}
        while (QuickX.less(v, a[--j])) {}
      }
    }
    QuickX.exch(a, lo, j);
    return j;
  }

  private static median3(
    a: java.lang.Comparable<any>[],
    i: number,
    j: number,
    k: number
  ): number {
    return QuickX.less(a[i], a[j])
      ? QuickX.less(a[j], a[k])
        ? j
        : QuickX.less(a[i], a[k])
        ? k
        : i
      : QuickX.less(a[k], a[j])
      ? j
      : QuickX.less(a[k], a[i])
      ? k
      : i;
  }

  /**
   * Helper sorting functions.
   * @param  v
   * @param  w
   * @return
   * @private
   */
  private static less(
    v: java.lang.Comparable<any>,
    w: java.lang.Comparable<any>
  ): boolean {
    return v.compareTo(w) < 0;
  }

  private static exch(a: any[], i: number, j: number) {
    const swap: any = a[i];
    a[i] = a[j];
    a[j] = swap;
  }

  /**
   * Check if array is sorted - useful for debugging.
   * @param  a
   * @return
   * @private
   */
  private static isSorted(a: java.lang.Comparable<any>[]): boolean {
    for (let i = 1; i < a.length; i++) {
      if (QuickX.less(a[i], a[i - 1])) return false;
    }
    return true;
  }

  private static show(a: java.lang.Comparable<any>[]) {
    for (let i = 0; i < a.length; i++) {
      {
        StdOut.println$java_lang_Object(a[i]);
      }
    }
  }

  /**
   * Reads in a sequence of strings from standard input; quicksorts them
   * (using an optimized version of 2-way quicksort);
   * and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const a: string[] = StdIn.readAllStrings();
    QuickX.sort$java_lang_Comparable_A(a);
    QuickX.show(a);
  }
}
QuickX.__class = 'edu.princeton.cs.algs4.QuickX';

QuickX.main(null);
