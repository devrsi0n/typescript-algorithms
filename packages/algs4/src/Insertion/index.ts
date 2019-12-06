import assert from 'assert';
// import StdIn from '../StdIn';
import StdRandom from '../StdRandom';
import SortBase from '../SortBase';

import { Comparator, StringComparator, NumberComparator } from '../types';

/**
 *  The `Insertion` class provides static methods for sorting an
 *  array using insertion sort.
 *  <p>
 *  In the worst case, this implementation makes ~ &frac12; <em>n</em><sup>2</sup>
 *  compares and ~ &frac12; <em>n</em><sup>2</sup> exchanges to sort an array
 *  of length <em>n</em>. So, it is not suitable for sorting large arbitrary
 *  arrays. More precisely, the number of exchanges is exactly equal to the
 *  number of inversions. So, for example, it sorts a partially-sorted array
 *  in linear time.
 *  <p>
 *  This sorting algorithm is stable.
 *  It uses &Theta;(1) extra memory (not including the input array).
 *  <p>
 *  See <a href="https://algs4.cs.princeton.edu/21elementary/InsertionPedantic.java.html">InsertionPedantic.java</a>
 *  for a version that eliminates the compiler warning.
 *  <p>
 *  For additional documentation, see <a href="https://algs4.cs.princeton.edu/21elementary">Section 2.1</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export default class Insertion extends SortBase {
  // This class should not be instantiated.
  // private constructor() { }

  /**
   * Rearranges the subarray a[lo..hi) in ascending order, using a comparator.
   * @param a the array
   * @param lo left endpoint (inclusive)
   * @param hi right endpoint (exclusive)
   * @param comparator the comparator specifying the order
   */
  public static sort<T>(
    a: any[],
    comparator?: Comparator<any>,
    lo = 0,
    hi = a.length
  ): void {
    const { exch, less } = Insertion;

    for (let i = lo + 1; i < hi; i++) {
      for (let j = i; j > lo; j--) {
        if (less(a[j], a[j - 1], comparator)) {
          exch(a, j, j - 1);
        }
      }
    }
    // assert(Insertion.isSorted(a, comparator, lo, hi));
  }

  // return a permutation that gives the elements in a[] in ascending order
  // do not change the original array a[]
  /**
   * Returns a permutation that gives the elements in the array in ascending order.
   * @param a the array
   * @return a permutation {@code p[]} such that {@code a[p[0]]}, {@code a[p[1]]},
   *    ..., {@code a[p[n-1]]} are in ascending order
   */
  public static indexSort(a: any[]) {
    const n = a.length;
    const index = [...Array(n).keys()];

    const { less, exch } = Insertion;
    for (let i = 1; i < n; i++) {
      for (let j = i; j > 0; j--) {
        if (less(a[index[j]], a[index[j - 1]])) {
          exch(index, j, j - 1);
        }
      }
    }

    return index;
  }

  /**
   * `sort` method implemented `StringComparator`
   * @param a
   */
  public static sortString(a: any[]) {
    return Insertion.sort(a, new StringComparator());
  }

  /**
   * `sort` method implemented `NumberComparator`
   * @param a
   */
  public static sortNumber(a: any[]) {
    return Insertion.sort(a, new NumberComparator());
  }

  /**
   * Reads in a sequence of strings from standard input; selection sorts them;
   * and prints them to standard output in ascending order.
   *
   * @param args the command-line arguments
   */
  public static main(/* String[] args */) {
    const a = [];
    for (let index = 0; index < 10000; index++) {
      a.push(
        StdRandom.uniform(10, 100)
          .toFixed(2)
          .toString()
      );
    }
    // const a = 'EXAMPLE'.split('');
    console.log('Input:');
    console.log(`${a.join(' ')}\n`);
    Insertion.sort(a, new StringComparator());
    console.log('Output:');
    Insertion.show(a as any);
  }
}
