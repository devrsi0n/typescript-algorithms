import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The `QuickBentleyMcIlroy` class provides static methods for sorting
 * an array using an optimized version of quicksort (using Bentley-McIlroy
 * 3-way partitioning, Tukey's ninther, and cutoff to insertion sort).
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/23quick">Section 2.3</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class QuickBentleyMcIlroy {
  static INSERTION_SORT_CUTOFF = 8;

  static MEDIAN_OF_3_CUTOFF = 40;

  public static sort$java_lang_Comparable_A(a: java.lang.Comparable<any>[]) {
    QuickBentleyMcIlroy.sort$java_lang_Comparable_A$int$int(a, 0, a.length - 1);
  }

  public static sort$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ) {
    const n: number = hi - lo + 1;
    if (n <= QuickBentleyMcIlroy.INSERTION_SORT_CUTOFF) {
      QuickBentleyMcIlroy.insertionSort(a, lo, hi);
      return;
    }
    if (n <= QuickBentleyMcIlroy.MEDIAN_OF_3_CUTOFF) {
      const m: number = QuickBentleyMcIlroy.median3(
        a,
        lo,
        lo + ((n / 2) | 0),
        hi
      );
      QuickBentleyMcIlroy.exch(a, m, lo);
    } else {
      const eps: number = (n / 8) | 0;
      const mid: number = lo + ((n / 2) | 0);
      const m1: number = QuickBentleyMcIlroy.median3(
        a,
        lo,
        lo + eps,
        lo + eps + eps
      );
      const m2: number = QuickBentleyMcIlroy.median3(
        a,
        mid - eps,
        mid,
        mid + eps
      );
      const m3: number = QuickBentleyMcIlroy.median3(
        a,
        hi - eps - eps,
        hi - eps,
        hi
      );
      const ninther: number = QuickBentleyMcIlroy.median3(a, m1, m2, m3);
      QuickBentleyMcIlroy.exch(a, ninther, lo);
    }
    let i: number = lo;
    let j: number = hi + 1;
    let p: number = lo;
    let q: number = hi + 1;
    const v: java.lang.Comparable<any> = a[lo];
    while (true) {
      {
        while (QuickBentleyMcIlroy.less(a[++i], v)) {
          if (i === hi) break;
        }
        while (QuickBentleyMcIlroy.less(v, a[--j])) {
          if (j === lo) break;
        }
        if (i === j && QuickBentleyMcIlroy.eq(a[i], v))
          QuickBentleyMcIlroy.exch(a, ++p, i);
        if (i >= j) break;
        QuickBentleyMcIlroy.exch(a, i, j);
        if (QuickBentleyMcIlroy.eq(a[i], v))
          QuickBentleyMcIlroy.exch(a, ++p, i);
        if (QuickBentleyMcIlroy.eq(a[j], v))
          QuickBentleyMcIlroy.exch(a, --q, j);
      }
    }
    i = j + 1;
    for (let k: number = lo; k <= p; k++) {
      QuickBentleyMcIlroy.exch(a, k, j--);
    }
    for (let k: number = hi; k >= q; k--) {
      QuickBentleyMcIlroy.exch(a, k, i++);
    }
    QuickBentleyMcIlroy.sort$java_lang_Comparable_A$int$int(a, lo, j);
    QuickBentleyMcIlroy.sort$java_lang_Comparable_A$int$int(a, i, hi);
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
      return <any>(
        QuickBentleyMcIlroy.sort$java_lang_Comparable_A$int$int(a, lo, hi)
      );
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
      return <any>QuickBentleyMcIlroy.sort$java_lang_Comparable_A(a);
    }
    throw new Error('invalid overload');
  }

  private static insertionSort(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ) {
    for (let i: number = lo; i <= hi; i++) {
      for (
        let j: number = i;
        j > lo && QuickBentleyMcIlroy.less(a[j], a[j - 1]);
        j--
      ) {
        QuickBentleyMcIlroy.exch(a, j, j - 1);
      }
    }
  }

  private static median3(
    a: java.lang.Comparable<any>[],
    i: number,
    j: number,
    k: number
  ): number {
    return QuickBentleyMcIlroy.less(a[i], a[j])
      ? QuickBentleyMcIlroy.less(a[j], a[k])
        ? j
        : QuickBentleyMcIlroy.less(a[i], a[k])
        ? k
        : i
      : QuickBentleyMcIlroy.less(a[k], a[j])
      ? j
      : QuickBentleyMcIlroy.less(a[k], a[i])
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
    if (v === w) return false;
    return v.compareTo(w) < 0;
  }

  private static eq(
    v: java.lang.Comparable<any>,
    w: java.lang.Comparable<any>
  ): boolean {
    if (v === w) return true;
    return v.compareTo(w) === 0;
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
      if (QuickBentleyMcIlroy.less(a[i], a[i - 1])) return false;
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
   * (using an optimized version of quicksort);
   * and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    QuickBentleyMcIlroy.sort$java_lang_Comparable_A(a);
    QuickBentleyMcIlroy.show(a);
  }
}
QuickBentleyMcIlroy.__class = 'edu.princeton.cs.algs4.QuickBentleyMcIlroy';

QuickBentleyMcIlroy.main(null);
