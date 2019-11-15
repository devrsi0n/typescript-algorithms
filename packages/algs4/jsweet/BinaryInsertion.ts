import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The `BinaryInsertion` class provides a static method for sorting an
 * array using an optimized binary insertion sort with half exchanges.
 * <p>
 * This implementation makes ~ n lg n compares for any array of length n.
 * However, in the worst case, the running time is quadratic because the
 * number of array accesses can be proportional to n^2 (e.g, if the array
 * is reverse sorted). As such, it is not suitable for sorting large
 * arrays (unless the number of inversions is small).
 * <p>
 * The sorting algorithm is stable and uses O(1) extra memory.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/21elementary">Section 2.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Ivan Pesin
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class BinaryInsertion {
  /**
   * Rearranges the array in ascending order, using the natural order.
   * @param  a the array to be sorted
   */
  public static sort(a: java.lang.Comparable<any>[]) {
    const n: number = a.length;
    for (let i = 1; i < n; i++) {
      {
        const v: java.lang.Comparable<any> = a[i];
        let lo = 0;
        let hi: number = i;
        while (lo < hi) {
          {
            const mid: number = lo + (((hi - lo) / 2) | 0);
            if (BinaryInsertion.less(v, a[mid])) hi = mid;
            else lo = mid + 1;
          }
        }
        for (let j: number = i; j > lo; --j) {
          a[j] = a[j - 1];
        }
        a[lo] = v;
      }
    }
  }

  /**
   * Helper sorting function.
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

  private static isSorted$java_lang_Comparable_A(
    a: java.lang.Comparable<any>[]
  ): boolean {
    return BinaryInsertion.isSorted$java_lang_Comparable_A$int$int(
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
      if (BinaryInsertion.less(a[i], a[i - 1])) return false;
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
      return <any>(
        BinaryInsertion.isSorted$java_lang_Comparable_A$int$int(a, lo, hi)
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
      return <any>BinaryInsertion.isSorted$java_lang_Comparable_A(a);
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
   * Reads in a sequence of strings from standard input; insertion sorts them;
   * and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    BinaryInsertion.sort(a);
    BinaryInsertion.show(a);
  }
}
BinaryInsertion.__class = 'edu.princeton.cs.algs4.BinaryInsertion';

BinaryInsertion.main(null);
