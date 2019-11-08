import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The {@code Shell} class provides static methods for sorting an
 * array using Shellsort with Knuth's increment sequence (1, 4, 13, 40, ...).
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/21elementary">Section 2.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Shell {


  /**
   * Rearranges the array in ascending order, using the natural order.
   * @param  a the array to be sorted
   */
  public static sort(a: java.lang.Comparable<any>[]) {
    const n: number = a.length;
    let h = 1;
    while (h < ((n / 3) | 0)) {
      h = 3 * h + 1;
    }
    while (h >= 1) {
      {
        for (let i: number = h; i < n; i++) {
          {
            for (
              let j: number = i;
              j >= h && Shell.less(a[j], a[j - h]);
              j -= h
            ) {
              {
                Shell.exch(a, j, j - h);
              }
            }
          }
        }
        h = (n => (n < 0 ? Math.ceil(n) : Math.floor(n)))(h / 3);
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
      if (Shell.less(a[i], a[i - 1])) return false;
    }
    return true;
  }

  private static isHsorted(a: java.lang.Comparable<any>[], h: number): boolean {
    for (let i: number = h; i < a.length; i++) {
      if (Shell.less(a[i], a[i - h])) return false;
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
   * Reads in a sequence of strings from standard input; Shellsorts them;
   * and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    Shell.sort(a);
    Shell.show(a);
  }
}
Shell.__class = 'edu.princeton.cs.algs4.Shell';

Shell.main(null);
