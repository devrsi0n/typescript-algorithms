import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The `MergeBU` class provides static methods for sorting an
 * array using bottom-up mergesort.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/21elementary">Section 2.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class MergeBU {
  private static merge(
    a: java.lang.Comparable<any>[],
    aux: java.lang.Comparable<any>[],
    lo: number,
    mid: number,
    hi: number
  ) {
    for (let k: number = lo; k <= hi; k++) {
      {
        aux[k] = a[k];
      }
    }
    let i: number = lo;
    let j: number = mid + 1;
    for (let k: number = lo; k <= hi; k++) {
      {
        if (i > mid) a[k] = aux[j++];
        else if (j > hi) a[k] = aux[i++];
        else if (MergeBU.less(aux[j], aux[i])) a[k] = aux[j++];
        else a[k] = aux[i++];
      }
    }
  }

  /**
   * Rearranges the array in ascending order, using the natural order.
   * @param  a the array to be sorted
   */
  public static sort(a: java.lang.Comparable<any>[]) {
    const n: number = a.length;
    const aux: java.lang.Comparable<any>[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let len = 1; len < n; len *= 2) {
      {
        for (let lo = 0; lo < n - len; lo += len + len) {
          {
            const mid: number = lo + len - 1;
            const hi: number = Math.min(lo + len + len - 1, n - 1);
            MergeBU.merge(a, aux, lo, mid, hi);
          }
        }
      }
    }
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

  /**
   * Check if array is sorted - useful for debugging.
   * @param  a
   * @return
   * @private
   */
  private static isSorted(a: java.lang.Comparable<any>[]): boolean {
    for (let i = 1; i < a.length; i++) {
      if (MergeBU.less(a[i], a[i - 1])) return false;
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
   * Reads in a sequence of strings from standard input; bottom-up
   * mergesorts them; and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    MergeBU.sort(a);
    MergeBU.show(a);
  }
}
MergeBU.__class = 'edu.princeton.cs.algs4.MergeBU';

MergeBU.main(null);
