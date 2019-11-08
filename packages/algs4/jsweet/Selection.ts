import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The {@code Selection} class provides static methods for sorting an
 * array using selection sort.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/21elementary">Section 2.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Selection {


  public static sort$java_lang_Comparable_A(a: java.lang.Comparable<any>[]) {
    const n: number = a.length;
    for (let i = 0; i < n; i++) {
      {
        let min: number = i;
        for (let j: number = i + 1; j < n; j++) {
          {
            if (
              Selection.less$java_lang_Comparable$java_lang_Comparable(
                a[j],
                a[min]
              )
            )
              min = j;
          }
        }
        Selection.exch(a, i, min);
      }
    }
  }

  public static sort$java_lang_Object_A$java_util_Comparator(
    a: any[],
    comparator: Comparator<any>
  ) {
    const n: number = a.length;
    for (let i = 0; i < n; i++) {
      {
        let min: number = i;
        for (let j: number = i + 1; j < n; j++) {
          {
            if (
              Selection.less$java_util_Comparator$java_lang_Object$java_lang_Object(
                <any>comparator,
                a[j],
                a[min]
              )
            )
              min = j;
          }
        }
        Selection.exch(a, i, min);
      }
    }
  }

  /**
   * Rearranges the array in ascending order, using a comparator.
   * @param {Array} a the array
   * @param {*} comparator the comparator specifying the order
   */
  public static sort(a?: any, comparator?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null)
    ) {
      return <any>(
        Selection.sort$java_lang_Object_A$java_util_Comparator(a, comparator)
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
      comparator === undefined
    ) {
      return <any>Selection.sort$java_lang_Comparable_A(a);
    }
    throw new Error('invalid overload');
  }

  private static less$java_lang_Comparable$java_lang_Comparable(
    v: java.lang.Comparable<any>,
    w: java.lang.Comparable<any>
  ): boolean {
    return v.compareTo(w) < 0;
  }

  public static less$java_util_Comparator$java_lang_Object$java_lang_Object(
    comparator: Comparator<any>,
    v: any,
    w: any
  ): boolean {
    return comparator(v, w) < 0;
  }

  public static less(comparator?: any, v?: any, w?: any): any {
    if (
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null) &&
      (v != null || v === null) &&
      (w != null || w === null)
    ) {
      return <any>(
        Selection.less$java_util_Comparator$java_lang_Object$java_lang_Object(
          comparator,
          v,
          w
        )
      );
    }
    if (
      ((comparator != null &&
        ((comparator.__interfaces != null &&
          comparator.__interfaces.indexOf('java.lang.Comparable') >= 0) ||
          (comparator.constructor != null &&
            comparator.constructor.__interfaces != null &&
            comparator.constructor.__interfaces.indexOf(
              'java.lang.Comparable'
            ) >= 0))) ||
        comparator === null) &&
      ((v != null &&
        ((v.__interfaces != null &&
          v.__interfaces.indexOf('java.lang.Comparable') >= 0) ||
          (v.constructor != null &&
            v.constructor.__interfaces != null &&
            v.constructor.__interfaces.indexOf('java.lang.Comparable') >=
              0))) ||
        v === null) &&
      w === undefined
    ) {
      return <any>(
        Selection.less$java_lang_Comparable$java_lang_Comparable(comparator, v)
      );
    }
    throw new Error('invalid overload');
  }

  private static exch(a: any[], i: number, j: number) {
    const swap: any = a[i];
    a[i] = a[j];
    a[j] = swap;
  }

  private static isSorted$java_lang_Comparable_A(
    a: java.lang.Comparable<any>[]
  ): boolean {
    return Selection.isSorted$java_lang_Comparable_A$int$int(
      a,
      0,
      a.length - 1
    );
  }

  private static isSorted$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ): boolean {
    for (let i: number = lo + 1; i <= hi; i++) {
      if (
        Selection.less$java_lang_Comparable$java_lang_Comparable(a[i], a[i - 1])
      )
        return false;
    }
    return true;
  }

  private static isSorted$java_lang_Object_A$java_util_Comparator(
    a: any[],
    comparator: Comparator<any>
  ): boolean {
    return Selection.isSorted$java_lang_Object_A$java_util_Comparator$int$int(
      a,
      <any>comparator,
      0,
      a.length - 1
    );
  }

  public static isSorted$java_lang_Object_A$java_util_Comparator$int$int(
    a: any[],
    comparator: Comparator<any>,
    lo: number,
    hi: number
  ): boolean {
    for (let i: number = lo + 1; i <= hi; i++) {
      if (
        Selection.less$java_util_Comparator$java_lang_Object$java_lang_Object(
          <any>comparator,
          a[i],
          a[i - 1]
        )
      )
        return false;
    }
    return true;
  }

  public static isSorted(a?: any, comparator?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>(
        Selection.isSorted$java_lang_Object_A$java_util_Comparator$int$int(
          a,
          comparator,
          lo,
          hi
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
      (typeof comparator === 'number' || comparator === null) &&
      (typeof lo === 'number' || lo === null) &&
      hi === undefined
    ) {
      return <any>(
        Selection.isSorted$java_lang_Comparable_A$int$int(a, comparator, lo)
      );
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null) &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>(
        Selection.isSorted$java_lang_Object_A$java_util_Comparator(
          a,
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
      comparator === undefined &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>Selection.isSorted$java_lang_Comparable_A(a);
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
   * Reads in a sequence of strings from standard input; selection sorts them;
   * and prints them to standard output in ascending order.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    Selection.sort$java_lang_Comparable_A(a);
    Selection.show(a);
  }
}
Selection.__class = 'edu.princeton.cs.algs4.Selection';

Selection.main(null);
