import debug from 'debug';
import StdOut from '../StdOut';

import { Comparator, Comparable } from '../types';

const d = debug('algs4:SortBase');

export default class SortBase {
  /**
   * Is v < w ?
   * @param v
   * @param w
   * @param comparator
   */
  public static less(
    v: Comparable<any>,
    w: Comparable<any>,
    comparator?: Comparator<any>
  ): boolean {
    if (comparator && typeof comparator.compare === 'function') {
      return comparator.compare(v, w) < 0;
    }
    return v.compareTo(w) < 0;
  }

  /**
   * exchange a[i] and a[j]
   */
  public static exch(a: any[], i: number, j: number): void {
    d(`exchange: ${a[j]} ${a[i]}`);
    const swap = a[i];
    a[i] = a[j];
    a[j] = swap;
  }

  /**
   * Check if array is sorted - useful for debugging.
   * Is the array sorted from a[lo] to a[hi]
   */
  public static isSorted(
    a: Comparable<any>[],
    comparator?: Comparator<any>,
    lo = 0,
    hi = a.length - 1
  ): boolean {
    for (let i = lo + 1; i <= hi; i++) {
      if (SortBase.less(a[i], a[i - 1], comparator)) {
        return false;
      }
    }
    return true;
  }

  /**
   * print array to standard output
   * @param a
   */
  public static show(a: Comparable<any>[]): void {
    for (let i = 0; i < a.length; i++) {
      StdOut.printf('%-2s', `${a[i]} `);
    }
    StdOut.println();
  }
}
