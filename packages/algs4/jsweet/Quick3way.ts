import { StdRandom } from './StdRandom';
import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The `Quick3way` class provides static methods for sorting an
 * array using quicksort with 3-way partitioning.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/23quick">Section 2.3</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Quick3way {
  public static sort$java_lang_Comparable_A(a: java.lang.Comparable<any>[]) {
    StdRandom.shuffle$java_lang_Object_A(a);
    Quick3way.sort$java_lang_Comparable_A$int$int(a, 0, a.length - 1);
  }

  public static sort$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ) {
    if (hi <= lo) return;
    let lt: number = lo;
    let gt: number = hi;
    const v: java.lang.Comparable<any> = a[lo];
    let i: number = lo + 1;
    while (i <= gt) {
      {
        const cmp: number = a[i].compareTo(v);
        if (cmp < 0) Quick3way.exch(a, lt++, i++);
        else if (cmp > 0) Quick3way.exch(a, i, gt--);
        else i++;
      }
    }
    Quick3way.sort$java_lang_Comparable_A$int$int(a, lo, lt - 1);
    Quick3way.sort$java_lang_Comparable_A$int$int(a, gt + 1, hi);
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
      return <any>Quick3way.sort$java_lang_Comparable_A$int$int(a, lo, hi);
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
      return <any>Quick3way.sort$java_lang_Comparable_A(a);
    }
    throw new Error('invalid overload');
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

  private static isSorted$java_lang_Comparable_A(
    a: java.lang.Comparable<any>[]
  ): boolean {
    return Quick3way.isSorted$java_lang_Comparable_A$int$int(
      a,
      0,
      a.length - 1
    );
  }

  public static isSorted$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ): boolean {
    for (let i: number = lo + 1; i <= hi; i++) {
      if (Quick3way.less(a[i], a[i - 1])) return false;
    }
    return true;
  }

  public static isSorted(a?: any, lo?: any, hi?: any): any {
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
      return <any>Quick3way.isSorted$java_lang_Comparable_A$int$int(a, lo, hi);
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
      return <any>Quick3way.isSorted$java_lang_Comparable_A(a);
    }
    throw new Error('invalid overload');
  }

  private static show(a: java.lang.Comparable<any>[]) {
    for (let i = 0; i < a.length; i++) {
      {
        StdOut.println$java_lang_Object(a[i]);
      }
    }
  }

  /**
   * Reads in a sequence of strings from standard input; 3-way
   * quicksorts them; and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const a: string[] = StdIn.readAllStrings();
    Quick3way.sort$java_lang_Comparable_A(a);
    Quick3way.show(a);
  }
}
Quick3way.__class = 'edu.princeton.cs.algs4.Quick3way';

Quick3way.main(null);
