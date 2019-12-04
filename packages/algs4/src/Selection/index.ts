import assert from 'assert';
// import StdOut from '../StdOut';
// import StdIn from '../StdIn';
import StdRandom from '../StdRandom';
import SortBase from '../SortBase';

import { Comparator, StringComparator, NumberComparator } from '../types';

/**
 *  The `Selection` class provides static methods for sorting an
 *  array using <em>selection sort</em>.
 *  This implementation makes ~ &frac12; <em>n</em><sup>2</sup> compares to sort
 *  any array of length <em>n</em>, so it is not suitable for sorting large arrays.
 *  It performs exactly <em>n</em> exchanges.
 *  <p>
 *  This sorting algorithm is not stable. It uses &Theta;(1) extra memory
 *  (not including the input array).
 *  <p>
 *  For additional documentation, see
 *  <a href="https://algs4.cs.princeton.edu/21elementary">Section 2.1</a>
 *  of <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export default class Selection extends SortBase {
  // This class should not be instantiated.
  // private constructor() { }

  /**
   * Rearranges the array in ascending order, using a comparator.
   * @param a the array
   * @param comparator the comparator specifying the order
   */
  public static sort<T>(a: any[], comparator?: Comparator<any>): void {
    const n = a.length;
    for (let i = 0; i < n; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        if (Selection.less(a[j], a[min], comparator)) {
          min = j;
        }
      }
      Selection.exch(a, i, min);
      assert(Selection.isSorted(a, comparator, 0, i));
    }
    assert(Selection.isSorted(a, comparator));
  }

  /**
   * `sort` method implemented `StringComparator`
   * @param a
   */
  public static sortString(a: any[]) {
    return Selection.sort(a, new StringComparator());
  }

  /**
   * `sort` method implemented `NumberComparator`
   * @param a
   */
  public static sortNumber(a: any[]) {
    return Selection.sort(a, new NumberComparator());
  }

  /**
   * Reads in a sequence of strings from standard input; selection sorts them;
   * and prints them to standard output in ascending order.
   *
   * @param args the command-line arguments
   */
  public static main(/* String[] args */) {
    const a = [];
    for (let index = 0; index < 20; index++) {
      a.push(
        StdRandom.uniform(1, 100)
          .toFixed(0)
          .toString()
      );
    }
    console.log('Input:');
    console.log(`${a.join(' ')}\n`);
    Selection.sort(a, new StringComparator());
    console.log('Output:');
    Selection.show(a as any);
  }
}
