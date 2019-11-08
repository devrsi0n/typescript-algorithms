import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The {@code Heap} class provides a static methods for heapsorting
 * an array.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/24pq">Section 2.4</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Heap {


  /**
   * Rearranges the array in ascending order, using the natural order.
   * @param  pq the array to be sorted
   */
  public static sort(pq: java.lang.Comparable<any>[]) {
    let n: number = pq.length;
    for (let k: number = (n / 2) | 0; k >= 1; k--) {
      Heap.sink(pq, k, n);
    }
    while (n > 1) {
      {
        Heap.exch(pq, 1, n--);
        Heap.sink(pq, 1, n);
      }
    }
  }

  /**
   * Helper functions to restore the heap invariant.
   * @param  pq
   * @param  k
   * @param  n
   * @private
   */
  private static sink(pq: java.lang.Comparable<any>[], k: number, n: number) {
    while (2 * k <= n) {
      {
        let j: number = 2 * k;
        if (j < n && Heap.less(pq, j, j + 1)) j++;
        if (!Heap.less(pq, k, j)) break;
        Heap.exch(pq, k, j);
        k = j;
      }
    }
  }

  /**
   * Helper functions for comparisons and swaps.
   * Indices are "off-by-one" to support 1-based indexing.
   * @param  pq
   * @param  i
   * @param  j
   * @return
   * @private
   */
  private static less(
    pq: java.lang.Comparable<any>[],
    i: number,
    j: number
  ): boolean {
    return pq[i - 1].compareTo(pq[j - 1]) < 0;
  }

  private static exch(pq: any[], i: number, j: number) {
    const swap: any = pq[i - 1];
    pq[i - 1] = pq[j - 1];
    pq[j - 1] = swap;
  }

  private static show(a: java.lang.Comparable<any>[]) {
    for (let i = 0; i < a.length; i++) {
      {
        StdOut.println$java_lang_Object(a[i]);
      }
    }
  }

  /**
   * Reads in a sequence of strings from standard input; heapsorts them;
   * and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    Heap.sort(a);
    Heap.show(a);
  }
}
Heap.__class = 'edu.princeton.cs.algs4.Heap';

Heap.main(null);
