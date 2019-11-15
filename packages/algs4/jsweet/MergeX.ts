import { StdOut } from './StdOut';
import { StdIn } from './StdIn';

/**
 * The `MergeX` class provides static methods for sorting an
 * array using an optimized version of mergesort.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/22mergesort">Section 2.2</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class MergeX {
  static CUTOFF = 7;

  private static merge$java_lang_Comparable_A$java_lang_Comparable_A$int$int$int(
    src: java.lang.Comparable<any>[],
    dst: java.lang.Comparable<any>[],
    lo: number,
    mid: number,
    hi: number
  ) {
    let i: number = lo;
    let j: number = mid + 1;
    for (let k: number = lo; k <= hi; k++) {
      {
        if (i > mid) dst[k] = src[j++];
        else if (j > hi) dst[k] = src[i++];
        else if (
          MergeX.less$java_lang_Comparable$java_lang_Comparable(src[j], src[i])
        )
          dst[k] = src[j++];
        else dst[k] = src[i++];
      }
    }
  }

  private static sort$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
    src: java.lang.Comparable<any>[],
    dst: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ) {
    if (hi <= lo + MergeX.CUTOFF) {
      MergeX.insertionSort$java_lang_Comparable_A$int$int(dst, lo, hi);
      return;
    }
    const mid: number = lo + (((hi - lo) / 2) | 0);
    MergeX.sort$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
      dst,
      src,
      lo,
      mid
    );
    MergeX.sort$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
      dst,
      src,
      mid + 1,
      hi
    );
    if (
      !MergeX.less$java_lang_Comparable$java_lang_Comparable(
        src[mid + 1],
        src[mid]
      )
    ) {
      java.lang.System.arraycopy(src, lo, dst, lo, hi - lo + 1);
      return;
    }
    MergeX.merge$java_lang_Comparable_A$java_lang_Comparable_A$int$int$int(
      src,
      dst,
      lo,
      mid,
      hi
    );
  }

  public static sort$java_lang_Comparable_A(a: java.lang.Comparable<any>[]) {
    const aux: java.lang.Comparable<any>[] = /* clone */ ((o: any) => {
      if (o.clone != undefined) {
        return (<any>o).clone();
      }
      const clone = Object.create(o);
      for (const p in o) {
        if (o.hasOwnProperty(p)) clone[p] = o[p];
      }
      return clone;
    })(a);
    MergeX.sort$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
      aux,
      a,
      0,
      a.length - 1
    );
  }

  private static insertionSort$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ) {
    for (let i: number = lo; i <= hi; i++) {
      for (
        let j: number = i;
        j > lo &&
        MergeX.less$java_lang_Comparable$java_lang_Comparable(a[j], a[j - 1]);
        j--
      ) {
        MergeX.exch(a, j, j - 1);
      }
    }
  }

  /**
   * Utility methods.
   * @param  a
   * @param  i
   * @param  j
   * @private
   */
  private static exch(a: any[], i: number, j: number) {
    const swap: any = a[i];
    a[i] = a[j];
    a[j] = swap;
  }

  private static less$java_lang_Comparable$java_lang_Comparable(
    a: java.lang.Comparable<any>,
    b: java.lang.Comparable<any>
  ): boolean {
    return a.compareTo(b) < 0;
  }

  public static less$java_lang_Object$java_lang_Object$java_util_Comparator(
    a: any,
    b: any,
    comparator: Comparator<any>
  ): boolean {
    return comparator(a, b) < 0;
  }

  public static less(a?: any, b?: any, comparator?: any): any {
    if (
      (a != null || a === null) &&
      (b != null || b === null) &&
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null)
    ) {
      return <any>(
        MergeX.less$java_lang_Object$java_lang_Object$java_util_Comparator(
          a,
          b,
          comparator
        )
      );
    }
    if (
      ((a != null &&
        ((a.__interfaces != null &&
          a.__interfaces.indexOf('java.lang.Comparable') >= 0) ||
          (a.constructor != null &&
            a.constructor.__interfaces != null &&
            a.constructor.__interfaces.indexOf('java.lang.Comparable') >=
              0))) ||
        a === null) &&
      ((b != null &&
        ((b.__interfaces != null &&
          b.__interfaces.indexOf('java.lang.Comparable') >= 0) ||
          (b.constructor != null &&
            b.constructor.__interfaces != null &&
            b.constructor.__interfaces.indexOf('java.lang.Comparable') >=
              0))) ||
        b === null) &&
      comparator === undefined
    ) {
      return <any>MergeX.less$java_lang_Comparable$java_lang_Comparable(a, b);
    }
    throw new Error('invalid overload');
  }

  public static sort$java_lang_Object_A$java_util_Comparator(
    a: any[],
    comparator: Comparator<any>
  ) {
    const aux: any[] = /* clone */ ((o: any) => {
      if (o.clone != undefined) {
        return (<any>o).clone();
      }
      const clone = Object.create(o);
      for (const p in o) {
        if (o.hasOwnProperty(p)) clone[p] = o[p];
      }
      return clone;
    })(a);
    MergeX.sort$java_lang_Object_A$java_lang_Object_A$int$int$java_util_Comparator(
      aux,
      a,
      0,
      a.length - 1,
      <any>comparator
    );
  }

  public static merge$java_lang_Object_A$java_lang_Object_A$int$int$int$java_util_Comparator(
    src: any[],
    dst: any[],
    lo: number,
    mid: number,
    hi: number,
    comparator: Comparator<any>
  ) {
    let i: number = lo;
    let j: number = mid + 1;
    for (let k: number = lo; k <= hi; k++) {
      {
        if (i > mid) dst[k] = src[j++];
        else if (j > hi) dst[k] = src[i++];
        else if (
          MergeX.less$java_lang_Object$java_lang_Object$java_util_Comparator(
            src[j],
            src[i],
            <any>comparator
          )
        )
          dst[k] = src[j++];
        else dst[k] = src[i++];
      }
    }
  }

  public static merge(
    src?: any,
    dst?: any,
    lo?: any,
    mid?: any,
    hi?: any,
    comparator?: any
  ): any {
    if (
      ((src != null &&
        src instanceof <any>Array &&
        (src.length == 0 || src[0] == null || src[0] != null)) ||
        src === null) &&
      ((dst != null &&
        dst instanceof <any>Array &&
        (dst.length == 0 || dst[0] == null || dst[0] != null)) ||
        dst === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof mid === 'number' || mid === null) &&
      (typeof hi === 'number' || hi === null) &&
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null)
    ) {
      return <any>(
        MergeX.merge$java_lang_Object_A$java_lang_Object_A$int$int$int$java_util_Comparator(
          src,
          dst,
          lo,
          mid,
          hi,
          comparator
        )
      );
    }
    if (
      ((src != null &&
        src instanceof <any>Array &&
        (src.length == 0 ||
          src[0] == null ||
          (src[0] != null &&
            ((src[0].__interfaces != null &&
              src[0].__interfaces.indexOf('java.lang.Comparable') >= 0) ||
              (src[0].constructor != null &&
                src[0].constructor.__interfaces != null &&
                src[0].constructor.__interfaces.indexOf(
                  'java.lang.Comparable'
                ) >= 0))))) ||
        src === null) &&
      ((dst != null &&
        dst instanceof <any>Array &&
        (dst.length == 0 ||
          dst[0] == null ||
          (dst[0] != null &&
            ((dst[0].__interfaces != null &&
              dst[0].__interfaces.indexOf('java.lang.Comparable') >= 0) ||
              (dst[0].constructor != null &&
                dst[0].constructor.__interfaces != null &&
                dst[0].constructor.__interfaces.indexOf(
                  'java.lang.Comparable'
                ) >= 0))))) ||
        dst === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof mid === 'number' || mid === null) &&
      (typeof hi === 'number' || hi === null) &&
      comparator === undefined
    ) {
      return <any>(
        MergeX.merge$java_lang_Comparable_A$java_lang_Comparable_A$int$int$int(
          src,
          dst,
          lo,
          mid,
          hi
        )
      );
    }
    throw new Error('invalid overload');
  }

  public static sort$java_lang_Object_A$java_lang_Object_A$int$int$java_util_Comparator(
    src: any[],
    dst: any[],
    lo: number,
    hi: number,
    comparator: Comparator<any>
  ) {
    if (hi <= lo + MergeX.CUTOFF) {
      MergeX.insertionSort$java_lang_Object_A$int$int$java_util_Comparator(
        dst,
        lo,
        hi,
        <any>comparator
      );
      return;
    }
    const mid: number = lo + (((hi - lo) / 2) | 0);
    MergeX.sort$java_lang_Object_A$java_lang_Object_A$int$int$java_util_Comparator(
      dst,
      src,
      lo,
      mid,
      <any>comparator
    );
    MergeX.sort$java_lang_Object_A$java_lang_Object_A$int$int$java_util_Comparator(
      dst,
      src,
      mid + 1,
      hi,
      <any>comparator
    );
    if (
      !MergeX.less$java_lang_Object$java_lang_Object$java_util_Comparator(
        src[mid + 1],
        src[mid],
        <any>comparator
      )
    ) {
      java.lang.System.arraycopy(src, lo, dst, lo, hi - lo + 1);
      return;
    }
    MergeX.merge$java_lang_Object_A$java_lang_Object_A$int$int$int$java_util_Comparator(
      src,
      dst,
      lo,
      mid,
      hi,
      <any>comparator
    );
  }

  public static sort(
    src?: any,
    dst?: any,
    lo?: any,
    hi?: any,
    comparator?: any
  ): any {
    if (
      ((src != null &&
        src instanceof <any>Array &&
        (src.length == 0 || src[0] == null || src[0] != null)) ||
        src === null) &&
      ((dst != null &&
        dst instanceof <any>Array &&
        (dst.length == 0 || dst[0] == null || dst[0] != null)) ||
        dst === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null) &&
      ((typeof comparator === 'function' && (<any>comparator).length == 2) ||
        comparator === null)
    ) {
      return <any>(
        MergeX.sort$java_lang_Object_A$java_lang_Object_A$int$int$java_util_Comparator(
          src,
          dst,
          lo,
          hi,
          comparator
        )
      );
    }
    if (
      ((src != null &&
        src instanceof <any>Array &&
        (src.length == 0 ||
          src[0] == null ||
          (src[0] != null &&
            ((src[0].__interfaces != null &&
              src[0].__interfaces.indexOf('java.lang.Comparable') >= 0) ||
              (src[0].constructor != null &&
                src[0].constructor.__interfaces != null &&
                src[0].constructor.__interfaces.indexOf(
                  'java.lang.Comparable'
                ) >= 0))))) ||
        src === null) &&
      ((dst != null &&
        dst instanceof <any>Array &&
        (dst.length == 0 ||
          dst[0] == null ||
          (dst[0] != null &&
            ((dst[0].__interfaces != null &&
              dst[0].__interfaces.indexOf('java.lang.Comparable') >= 0) ||
              (dst[0].constructor != null &&
                dst[0].constructor.__interfaces != null &&
                dst[0].constructor.__interfaces.indexOf(
                  'java.lang.Comparable'
                ) >= 0))))) ||
        dst === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null) &&
      comparator === undefined
    ) {
      return <any>(
        MergeX.sort$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
          src,
          dst,
          lo,
          hi
        )
      );
    }
    if (
      ((src != null &&
        src instanceof <any>Array &&
        (src.length == 0 || src[0] == null || src[0] != null)) ||
        src === null) &&
      ((typeof dst === 'function' && (<any>dst).length == 2) || dst === null) &&
      lo === undefined &&
      hi === undefined &&
      comparator === undefined
    ) {
      return <any>MergeX.sort$java_lang_Object_A$java_util_Comparator(src, dst);
    }
    if (
      ((src != null &&
        src instanceof <any>Array &&
        (src.length == 0 ||
          src[0] == null ||
          (src[0] != null &&
            ((src[0].__interfaces != null &&
              src[0].__interfaces.indexOf('java.lang.Comparable') >= 0) ||
              (src[0].constructor != null &&
                src[0].constructor.__interfaces != null &&
                src[0].constructor.__interfaces.indexOf(
                  'java.lang.Comparable'
                ) >= 0))))) ||
        src === null) &&
      dst === undefined &&
      lo === undefined &&
      hi === undefined &&
      comparator === undefined
    ) {
      return <any>MergeX.sort$java_lang_Comparable_A(src);
    }
    throw new Error('invalid overload');
  }

  public static insertionSort$java_lang_Object_A$int$int$java_util_Comparator(
    a: any[],
    lo: number,
    hi: number,
    comparator: Comparator<any>
  ) {
    for (let i: number = lo; i <= hi; i++) {
      for (
        let j: number = i;
        j > lo &&
        MergeX.less$java_lang_Object$java_lang_Object$java_util_Comparator(
          a[j],
          a[j - 1],
          <any>comparator
        );
        j--
      ) {
        MergeX.exch(a, j, j - 1);
      }
    }
  }

  public static insertionSort(
    a?: any,
    lo?: any,
    hi?: any,
    comparator?: any
  ): any {
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
        MergeX.insertionSort$java_lang_Object_A$int$int$java_util_Comparator(
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
      return <any>(
        MergeX.insertionSort$java_lang_Comparable_A$int$int(a, lo, hi)
      );
    }
    throw new Error('invalid overload');
  }

  private static isSorted$java_lang_Comparable_A(
    a: java.lang.Comparable<any>[]
  ): boolean {
    return MergeX.isSorted$java_lang_Comparable_A$int$int(a, 0, a.length - 1);
  }

  private static isSorted$java_lang_Comparable_A$int$int(
    a: java.lang.Comparable<any>[],
    lo: number,
    hi: number
  ): boolean {
    for (let i: number = lo + 1; i <= hi; i++) {
      if (MergeX.less$java_lang_Comparable$java_lang_Comparable(a[i], a[i - 1]))
        return false;
    }
    return true;
  }

  private static isSorted$java_lang_Object_A$java_util_Comparator(
    a: any[],
    comparator: Comparator<any>
  ): boolean {
    return MergeX.isSorted$java_lang_Object_A$int$int$java_util_Comparator(
      a,
      0,
      a.length - 1,
      <any>comparator
    );
  }

  public static isSorted$java_lang_Object_A$int$int$java_util_Comparator(
    a: any[],
    lo: number,
    hi: number,
    comparator: Comparator<any>
  ): boolean {
    for (let i: number = lo + 1; i <= hi; i++) {
      if (
        MergeX.less$java_lang_Object$java_lang_Object$java_util_Comparator(
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
        MergeX.isSorted$java_lang_Object_A$int$int$java_util_Comparator(
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
      return <any>MergeX.isSorted$java_lang_Comparable_A$int$int(a, lo, hi);
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
        MergeX.isSorted$java_lang_Object_A$java_util_Comparator(a, lo)
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
      return <any>MergeX.isSorted$java_lang_Comparable_A(a);
    }
    throw new Error('invalid overload');
  }

  private static show(a: any[]) {
    for (let i = 0; i < a.length; i++) {
      {
        StdOut.println$java_lang_Object(a[i]);
      }
    }
  }

  /**
   * Reads in a sequence of strings from standard input; mergesorts them
   * (using an optimized version of mergesort);
   * and prints them to standard output in ascending order.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    MergeX.sort$java_lang_Comparable_A(a);
    MergeX.show(a);
  }
}
MergeX.__class = 'edu.princeton.cs.algs4.MergeX';

MergeX.main(null);
