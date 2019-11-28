import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The `InsertionX` class provides static methods for sorting
 * an array using an optimized version of insertion sort (with half exchanges
 * and a sentinel).
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/21elementary">Section 2.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class InsertionX {
  /**
   * Rearranges the array in ascending order, using the natural order.
   * @param  a the array to be sorted
   */
  public static sort(a: java.lang.Comparable<any>[]) {
    const n: number = a.length;
    let exchanges = 0;
    for (let i: number = n - 1; i > 0; i--) {
      {
        if (InsertionX.less(a[i], a[i - 1])) {
          InsertionX.exch(a, i, i - 1);
          exchanges++;
        }
      }
    }
    if (exchanges === 0) return;
    for (let i = 2; i < n; i++) {
      {
        const v: java.lang.Comparable<any> = a[i];
        let j: number = i;
        while (InsertionX.less(v, a[j - 1])) {
          {
            a[j] = a[j - 1];
            j--;
          }
        }
        a[j] = v;
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
      if (InsertionX.less(a[i], a[i - 1])) return false;
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
   * Reads in a sequence of strings from standard input; insertion sorts them;
   * and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const a: string[] = StdIn.readAllStrings();
    InsertionX.sort(a);
    InsertionX.show(a);
  }
}
InsertionX.__class = 'edu.princeton.cs.algs4.InsertionX';

InsertionX.main(null);
