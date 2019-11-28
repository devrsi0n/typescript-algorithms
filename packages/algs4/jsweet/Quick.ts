import { StdRandom } from './StdRandom';
import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The `Quick` class provides static methods for sorting an
 * array and selecting the ith smallest element in an array using quicksort.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/23quick">Section 2.3</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Quick {
  public static sort$java_lang_Comparable_A(a: java.lang.Comparable<any>[]) {
    StdRandom.shuffle$java_lang_Object_A(a);
    Quick.sort$java_lang_Comparable_A$int$int(a, 0, a.length - 1);
  }

  public static sort$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ) {
    if (hi <= lo) return;
    const j: number = Quick.partition(a, lo, hi);
    Quick.sort$java_lang_Comparable_A$int$int(a, lo, j - 1);
    Quick.sort$java_lang_Comparable_A$int$int(a, j + 1, hi);
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
      return <any>Quick.sort$java_lang_Comparable_A$int$int(a, lo, hi);
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
      return <any>Quick.sort$java_lang_Comparable_A(a);
    }
    throw new Error('invalid overload');
  }

  private static partition(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ): number {
    let i: number = lo;
    let j: number = hi + 1;
    const v: java.lang.Comparable<any> = a[lo];
    while (true) {
      {
        while (Quick.less(a[++i], v)) {
          {
            if (i === hi) break;
          }
        }
        while (Quick.less(v, a[--j])) {
          {
            if (j === lo) break;
          }
        }
        if (i >= j) break;
        Quick.exch(a, i, j);
      }
    }
    Quick.exch(a, lo, j);
    return j;
  }

  /**
   * Rearranges the array so that `a[k]` contains the kth smallest key;
   * `a[0]` through `a[k-1]` are less than (or equal to) `a[k]`; and
   * `a[k+1]` through `a[n-1]` are greater than (or equal to) `a[k]`.
   *
   * @param   a the array
   * @param   k the rank of the key
   * @return  the key of rank `k`
   * @throws IllegalArgumentException unless `0 <= k < a.length`
   */
  public static select(
    a: java.lang.Comparable<any>[],
    k: number
  ): java.lang.Comparable<any> {
    if (k < 0 || k >= a.length) {
      throw new Error(`index is not between 0 and ${a.length}: ${k}`);
    }
    StdRandom.shuffle$java_lang_Object_A(a);
    let lo = 0;
    let hi: number = a.length - 1;
    while (hi > lo) {
      {
        const i: number = Quick.partition(a, lo, hi);
        if (i > k) hi = i - 1;
        else if (i < k) lo = i + 1;
        else return a[i];
      }
    }
    return a[lo];
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

  private static exch(a: any[], i: number, j: number) {
    const swap: any = a[i];
    a[i] = a[j];
    a[j] = swap;
  }

  private static isSorted$java_lang_Comparable_A(
    a: java.lang.Comparable<any>[]
  ): boolean {
    return Quick.isSorted$java_lang_Comparable_A$int$int(a, 0, a.length - 1);
  }

  public static isSorted$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ): boolean {
    for (let i: number = lo + 1; i <= hi; i++) {
      if (Quick.less(a[i], a[i - 1])) return false;
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
      return <any>Quick.isSorted$java_lang_Comparable_A$int$int(a, lo, hi);
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
      return <any>Quick.isSorted$java_lang_Comparable_A(a);
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
   * Reads in a sequence of strings from standard input; quicksorts them;
   * and prints them to standard output in ascending order.
   * Shuffles the array and then prints the strings again to
   * standard output, but this time, using the select method.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const a: string[] = StdIn.readAllStrings();
    Quick.sort$java_lang_Comparable_A(a);
    Quick.show(a);
    StdRandom.shuffle$java_lang_Object_A(a);
    StdOut.println();
    for (let i = 0; i < a.length; i++) {
      {
        const ith: string = <string>(<any>Quick.select(a, i));
        StdOut.println$java_lang_Object(ith);
      }
    }
  }
}
Quick.__class = 'edu.princeton.cs.algs4.Quick';

Quick.main(null);
