import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The {@code Merge} class provides static methods for sorting an
 * array using mergesort.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/22mergesort">Section 2.2</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 * For an optimized version, see {@link MergeX}.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Merge {


  private static merge$java_lang_Comparable_A$java_lang_Comparable_A$int$int$int(
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
        else if (Merge.less(aux[j], aux[i])) a[k] = aux[j++];
        else a[k] = aux[i++];
      }
    }
  }

  private static sort$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    aux: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ) {
    if (hi <= lo) return;
    const mid: number = lo + (((hi - lo) / 2) | 0);
    Merge.sort$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
      a,
      aux,
      lo,
      mid
    );
    Merge.sort$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
      a,
      aux,
      mid + 1,
      hi
    );
    Merge.merge$java_lang_Comparable_A$java_lang_Comparable_A$int$int$int(
      a,
      aux,
      lo,
      mid,
      hi
    );
  }

  public static sort$java_lang_Comparable_A(a: java.lang.Comparable<any>[]) {
    const aux: java.lang.Comparable<any>[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(a.length);
    Merge.sort$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
      a,
      aux,
      0,
      a.length - 1
    );
  }

  /**
   * Helper sorting function.
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

  private static isSorted$java_lang_Comparable_A(
    a: java.lang.Comparable<any>[]
  ): boolean {
    return Merge.isSorted$java_lang_Comparable_A$int$int(a, 0, a.length - 1);
  }

  public static isSorted$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ): boolean {
    for (let i: number = lo + 1; i <= hi; i++) {
      if (Merge.less(a[i], a[i - 1])) return false;
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
      return <any>Merge.isSorted$java_lang_Comparable_A$int$int(a, lo, hi);
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
      return <any>Merge.isSorted$java_lang_Comparable_A(a);
    }
    throw new Error('invalid overload');
  }

  public static merge$java_lang_Comparable_A$int_A$int_A$int$int$int(
    a: java.lang.Comparable<any>[],
    index: number[],
    aux: number[],
    lo: number,
    mid: number,
    hi: number
  ) {
    for (let k: number = lo; k <= hi; k++) {
      {
        aux[k] = index[k];
      }
    }
    let i: number = lo;
    let j: number = mid + 1;
    for (let k: number = lo; k <= hi; k++) {
      {
        if (i > mid) index[k] = aux[j++];
        else if (j > hi) index[k] = aux[i++];
        else if (Merge.less(a[aux[j]], a[aux[i]])) index[k] = aux[j++];
        else index[k] = aux[i++];
      }
    }
  }

  /**
   * Index mergesort.
   * @param  a
   * @param  index
   * @param  aux
   * @param  lo
   * @param  mid
   * @param  hi
   * @private
   */
  public static merge(
    a?: any,
    index?: any,
    aux?: any,
    lo?: any,
    mid?: any,
    hi?: any
  ): any {
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
      ((index != null &&
        index instanceof <any>Array &&
        (index.length == 0 ||
          index[0] == null ||
          typeof index[0] === 'number')) ||
        index === null) &&
      ((aux != null &&
        aux instanceof <any>Array &&
        (aux.length == 0 || aux[0] == null || typeof aux[0] === 'number')) ||
        aux === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof mid === 'number' || mid === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>(
        Merge.merge$java_lang_Comparable_A$int_A$int_A$int$int$int(
          a,
          index,
          aux,
          lo,
          mid,
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
      ((index != null &&
        index instanceof <any>Array &&
        (index.length == 0 ||
          index[0] == null ||
          (index[0] != null &&
            ((index[0].__interfaces != null &&
              index[0].__interfaces.indexOf('java.lang.Comparable') >= 0) ||
              (index[0].constructor != null &&
                index[0].constructor.__interfaces != null &&
                index[0].constructor.__interfaces.indexOf(
                  'java.lang.Comparable'
                ) >= 0))))) ||
        index === null) &&
      (typeof aux === 'number' || aux === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof mid === 'number' || mid === null) &&
      hi === undefined
    ) {
      return <any>(
        Merge.merge$java_lang_Comparable_A$java_lang_Comparable_A$int$int$int(
          a,
          index,
          aux,
          lo,
          mid
        )
      );
    }
    throw new Error('invalid overload');
  }

  /**
   * Returns a permutation that gives the elements in the array in ascending order.
   * @param  a the array
   * @return  a permutation {@code p[]} such that {@code a[p[0]]}, {@code a[p[1]]},
   * ..., {@code a[p[N-1]]} are in ascending order
   */
  public static indexSort(a: java.lang.Comparable<any>[]): number[] {
    const n: number = a.length;
    const index: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      index[i] = i;
    }
    const aux: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    Merge.sort$java_lang_Comparable_A$int_A$int_A$int$int(
      a,
      index,
      aux,
      0,
      n - 1
    );
    return index;
  }

  public static sort$java_lang_Comparable_A$int_A$int_A$int$int(
    a: java.lang.Comparable<any>[],
    index: number[],
    aux: number[],
    lo: number,
    hi: number
  ) {
    if (hi <= lo) return;
    const mid: number = lo + (((hi - lo) / 2) | 0);
    Merge.sort$java_lang_Comparable_A$int_A$int_A$int$int(
      a,
      index,
      aux,
      lo,
      mid
    );
    Merge.sort$java_lang_Comparable_A$int_A$int_A$int$int(
      a,
      index,
      aux,
      mid + 1,
      hi
    );
    Merge.merge$java_lang_Comparable_A$int_A$int_A$int$int$int(
      a,
      index,
      aux,
      lo,
      mid,
      hi
    );
  }

  public static sort(a?: any, index?: any, aux?: any, lo?: any, hi?: any): any {
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
      ((index != null &&
        index instanceof <any>Array &&
        (index.length == 0 ||
          index[0] == null ||
          typeof index[0] === 'number')) ||
        index === null) &&
      ((aux != null &&
        aux instanceof <any>Array &&
        (aux.length == 0 || aux[0] == null || typeof aux[0] === 'number')) ||
        aux === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>(
        Merge.sort$java_lang_Comparable_A$int_A$int_A$int$int(
          a,
          index,
          aux,
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
      ((index != null &&
        index instanceof <any>Array &&
        (index.length == 0 ||
          index[0] == null ||
          (index[0] != null &&
            ((index[0].__interfaces != null &&
              index[0].__interfaces.indexOf('java.lang.Comparable') >= 0) ||
              (index[0].constructor != null &&
                index[0].constructor.__interfaces != null &&
                index[0].constructor.__interfaces.indexOf(
                  'java.lang.Comparable'
                ) >= 0))))) ||
        index === null) &&
      (typeof aux === 'number' || aux === null) &&
      (typeof lo === 'number' || lo === null) &&
      hi === undefined
    ) {
      return <any>(
        Merge.sort$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
          a,
          index,
          aux,
          lo
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
      index === undefined &&
      aux === undefined &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>Merge.sort$java_lang_Comparable_A(a);
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
   * Reads in a sequence of strings from standard input; mergesorts them;
   * and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    Merge.sort$java_lang_Comparable_A(a);
    Merge.show(a);
  }
}
Merge.__class = 'edu.princeton.cs.algs4.Merge';

Merge.main(null);
