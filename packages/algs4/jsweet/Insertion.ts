import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The `Insertion` class provides static methods for sorting an
 * array using insertion sort.
 * <p>
 * This implementation makes ~ 1/2 n^2 compares and exchanges in
 * the worst case, so it is not suitable for sorting large arbitrary arrays.
 * More precisely, the number of exchanges is exactly equal to the number
 * of inversions. So, for example, it sorts a partially-sorted array
 * in linear time.
 * <p>
 * The sorting algorithm is stable and uses O(1) extra memory.
 * <p>
 * See <a href="https://algs4.cs.princeton.edu/21elementary/InsertionPedantic.java.html">InsertionPedantic.java</a>
 * for a version that eliminates the compiler warning.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/21elementary">Section 2.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Insertion {
  public static sort$java_lang_Comparable_A(a: java.lang.Comparable<any>[]) {
    const n: number = a.length;
    for (let i = 1; i < n; i++) {
      {
        for (
          let j: number = i;
          j > 0 &&
          Insertion.less$java_lang_Comparable$java_lang_Comparable(
            a[j],
            a[j - 1]
          );
          j--
        ) {
          {
            Insertion.exch$java_lang_Object_A$int$int(a, j, j - 1);
          }
        }
      }
    }
  }

  public static sort$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ) {
    for (let i: number = lo + 1; i < hi; i++) {
      {
        for (
          let j: number = i;
          j > lo &&
          Insertion.less$java_lang_Comparable$java_lang_Comparable(
            a[j],
            a[j - 1]
          );
          j--
        ) {
          {
            Insertion.exch$java_lang_Object_A$int$int(a, j, j - 1);
          }
        }
      }
    }
  }

  public static sort$java_lang_Object_A$java_util_Comparator(
    a: any[],
    comparator: Comparator<any>
  ) {
    const n: number = a.length;
    for (let i = 1; i < n; i++) {
      {
        for (
          let j: number = i;
          j > 0 &&
          Insertion.less$java_lang_Object$java_lang_Object$java_util_Comparator(
            a[j],
            a[j - 1],
            <any>comparator
          );
          j--
        ) {
          {
            Insertion.exch$java_lang_Object_A$int$int(a, j, j - 1);
          }
        }
      }
    }
  }

  public static sort$java_lang_Object_A$int$int$java_util_Comparator(
    a: any[],
    lo: number,
    hi: number,
    comparator: Comparator<any>
  ) {
    for (let i: number = lo + 1; i < hi; i++) {
      {
        for (
          let j: number = i;
          j > lo &&
          Insertion.less$java_lang_Object$java_lang_Object$java_util_Comparator(
            a[j],
            a[j - 1],
            <any>comparator
          );
          j--
        ) {
          {
            Insertion.exch$java_lang_Object_A$int$int(a, j, j - 1);
          }
        }
      }
    }
  }

  /**
   * Rearranges the subarray a[lo..hi) in ascending order, using a comparator.
   * @param  a the array
   * @param  lo left endpoint (inclusive)
   * @param  hi right endpoint (exclusive)
   * @param  comparator the comparator specifying the order
   */
  public static sort(a?: any, lo?: any, hi?: any, comparator?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null) &&
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null)
    ) {
      return <any>(
        Insertion.sort$java_lang_Object_A$int$int$java_util_Comparator(
          a,
          lo,
          hi,
          comparator
        )
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
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null) &&
      comparator === undefined
    ) {
      return <any>Insertion.sort$java_lang_Comparable_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      ((typeof lo === 'function' && (<any>lo).length == 2) || lo === null) &&
      hi === undefined &&
      comparator === undefined
    ) {
      return <any>Insertion.sort$java_lang_Object_A$java_util_Comparator(a, lo);
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
      hi === undefined &&
      comparator === undefined
    ) {
      return <any>Insertion.sort$java_lang_Comparable_A(a);
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns a permutation that gives the elements in the array in ascending order.
   * @param  a the array
   * @return  a permutation `p[]` such that `a[p[0]]`, `a[p[1]]`,
   * ..., `a[p[n-1]]` are in ascending order
   */
  public static indexSort(a: java.lang.Comparable<any>[]): number[] {
    const n: number = a.length;
    const index: number[] = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      index[i] = i;
    }
    for (let i = 1; i < n; i++) {
      for (
        let j: number = i;
        j > 0 &&
        Insertion.less$java_lang_Comparable$java_lang_Comparable(
          a[index[j]],
          a[index[j - 1]]
        );
        j--
      ) {
        Insertion.exch$int_A$int$int(index, j, j - 1);
      }
    }
    return index;
  }

  private static less$java_lang_Comparable$java_lang_Comparable(
    v: java.lang.Comparable<any>,
    w: java.lang.Comparable<any>
  ): boolean {
    return v.compareTo(w) < 0;
  }

  public static less$java_lang_Object$java_lang_Object$java_util_Comparator(
    v: any,
    w: any,
    comparator: Comparator<any>
  ): boolean {
    return comparator(v, w) < 0;
  }

  public static less(v?: any, w?: any, comparator?: any): any {
    if (
      (v != null || v === null) &&
      (w != null || w === null) &&
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null)
    ) {
      return <any>(
        Insertion.less$java_lang_Object$java_lang_Object$java_util_Comparator(
          v,
          w,
          comparator
        )
      );
    }
    if (
      ((v != null &&
        ((v.__interfaces != null &&
          v.__interfaces.indexOf('java.lang.Comparable') >= 0) ||
          (v.constructor != null &&
            v.constructor.__interfaces != null &&
            v.constructor.__interfaces.indexOf('java.lang.Comparable') >=
              0))) ||
        v === null) &&
      ((w != null &&
        ((w.__interfaces != null &&
          w.__interfaces.indexOf('java.lang.Comparable') >= 0) ||
          (w.constructor != null &&
            w.constructor.__interfaces != null &&
            w.constructor.__interfaces.indexOf('java.lang.Comparable') >=
              0))) ||
        w === null) &&
      comparator === undefined
    ) {
      return <any>(
        Insertion.less$java_lang_Comparable$java_lang_Comparable(v, w)
      );
    }
    throw new Error('invalid overload');
  }

  public static exch$java_lang_Object_A$int$int(
    a: any[],
    i: number,
    j: number
  ) {
    const swap: any = a[i];
    a[i] = a[j];
    a[j] = swap;
  }

  public static exch(a?: any, i?: any, j?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      (typeof i === 'number' || i === null) &&
      (typeof j === 'number' || j === null)
    ) {
      return <any>Insertion.exch$java_lang_Object_A$int$int(a, i, j);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof i === 'number' || i === null) &&
      (typeof j === 'number' || j === null)
    ) {
      return <any>Insertion.exch$int_A$int$int(a, i, j);
    }
    throw new Error('invalid overload');
  }

  private static exch$int_A$int$int(a: number[], i: number, j: number) {
    const swap: number = a[i];
    a[i] = a[j];
    a[j] = swap;
  }

  private static isSorted$java_lang_Comparable_A(
    a: java.lang.Comparable<any>[]
  ): boolean {
    return Insertion.isSorted$java_lang_Comparable_A$int$int(a, 0, a.length);
  }

  private static isSorted$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ): boolean {
    for (let i: number = lo + 1; i < hi; i++) {
      if (
        Insertion.less$java_lang_Comparable$java_lang_Comparable(a[i], a[i - 1])
      )
        return false;
    }
    return true;
  }

  private static isSorted$java_lang_Object_A$java_util_Comparator(
    a: any[],
    comparator: Comparator<any>
  ): boolean {
    return Insertion.isSorted$java_lang_Object_A$int$int$java_util_Comparator(
      a,
      0,
      a.length,
      <any>comparator
    );
  }

  public static isSorted$java_lang_Object_A$int$int$java_util_Comparator(
    a: any[],
    lo: number,
    hi: number,
    comparator: Comparator<any>
  ): boolean {
    for (let i: number = lo + 1; i < hi; i++) {
      if (
        Insertion.less$java_lang_Object$java_lang_Object$java_util_Comparator(
          a[i],
          a[i - 1],
          <any>comparator
        )
      )
        return false;
    }
    return true;
  }

  public static isSorted(a?: any, lo?: any, hi?: any, comparator?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null) &&
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null)
    ) {
      return <any>(
        Insertion.isSorted$java_lang_Object_A$int$int$java_util_Comparator(
          a,
          lo,
          hi,
          comparator
        )
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
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null) &&
      comparator === undefined
    ) {
      return <any>Insertion.isSorted$java_lang_Comparable_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      ((typeof lo === 'function' && (<any>lo).length == 2) || lo === null) &&
      hi === undefined &&
      comparator === undefined
    ) {
      return <any>(
        Insertion.isSorted$java_lang_Object_A$java_util_Comparator(a, lo)
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
      hi === undefined &&
      comparator === undefined
    ) {
      return <any>Insertion.isSorted$java_lang_Comparable_A(a);
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
  public static main(/* args: string[] */) {
    const a: string[] = StdIn.readAllStrings();
    Insertion.sort$java_lang_Comparable_A(a);
    Insertion.show(a);
  }
}
Insertion.__class = 'edu.princeton.cs.algs4.Insertion';

Insertion.main(null);
