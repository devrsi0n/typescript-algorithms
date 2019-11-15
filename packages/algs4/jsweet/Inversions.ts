import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The `Inversions` class provides static methods to count the
 * number of <em>inversions</em> in either an array of integers or comparables.
 * An inversion in an array `a[]` is a pair of indicies `i` and
 * `j` such that `i < j` and `a[i] > a[j]`.
 * <p>
 * This implementation uses a generalization of mergesort. The <em>count</em>
 * operation takes time proportional to <em>n</em> log <em>n</em>,
 * where <em>n</em> is the number of keys in the array.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/22mergesort">Section 2.2</a>
 * of <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Inversions {
  public static merge$int_A$int_A$int$int$int(
    a: number[],
    aux: number[],
    lo: number,
    mid: number,
    hi: number
  ): number {
    let inversions = 0;
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
        else if (aux[j] < aux[i]) {
          a[k] = aux[j++];
          inversions += mid - i + 1;
        } else a[k] = aux[i++];
      }
    }
    return inversions;
  }

  public static merge(a?: any, aux?: any, lo?: any, mid?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      ((aux != null &&
        aux instanceof <any>Array &&
        (aux.length == 0 || aux[0] == null || typeof aux[0] === 'number')) ||
        aux === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof mid === 'number' || mid === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>Inversions.merge$int_A$int_A$int$int$int(a, aux, lo, mid, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      ((aux != null &&
        aux instanceof <any>Array &&
        (aux.length == 0 || aux[0] == null || aux[0] != null)) ||
        aux === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof mid === 'number' || mid === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>(
        Inversions.merge$java_lang_Comparable_A$java_lang_Comparable_A$int$int$int(
          a,
          aux,
          lo,
          mid,
          hi
        )
      );
    }
    throw new Error('invalid overload');
  }

  public static count$int_A$int_A$int_A$int$int(
    a: number[],
    b: number[],
    aux: number[],
    lo: number,
    hi: number
  ): number {
    let inversions = 0;
    if (hi <= lo) return 0;
    const mid: number = lo + (((hi - lo) / 2) | 0);
    inversions += Inversions.count$int_A$int_A$int_A$int$int(
      a,
      b,
      aux,
      lo,
      mid
    );
    inversions += Inversions.count$int_A$int_A$int_A$int$int(
      a,
      b,
      aux,
      mid + 1,
      hi
    );
    inversions += Inversions.merge$int_A$int_A$int$int$int(b, aux, lo, mid, hi);
    return inversions;
  }

  public static count(a?: any, b?: any, aux?: any, lo?: any, hi?: any): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      ((b != null &&
        b instanceof <any>Array &&
        (b.length == 0 || b[0] == null || typeof b[0] === 'number')) ||
        b === null) &&
      ((aux != null &&
        aux instanceof <any>Array &&
        (aux.length == 0 || aux[0] == null || typeof aux[0] === 'number')) ||
        aux === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>Inversions.count$int_A$int_A$int_A$int$int(a, b, aux, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      ((b != null &&
        b instanceof <any>Array &&
        (b.length == 0 || b[0] == null || b[0] != null)) ||
        b === null) &&
      ((aux != null &&
        aux instanceof <any>Array &&
        (aux.length == 0 || aux[0] == null || aux[0] != null)) ||
        aux === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>(
        Inversions.count$java_lang_Comparable_A$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
          a,
          b,
          aux,
          lo,
          hi
        )
      );
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      b === undefined &&
      aux === undefined &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>Inversions.count$int_A(a);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      b === undefined &&
      aux === undefined &&
      lo === undefined &&
      hi === undefined
    ) {
      return <any>Inversions.count$java_lang_Comparable_A(a);
    }
    throw new Error('invalid overload');
  }

  public static count$int_A(a: number[]): number {
    const b: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(a.length);
    const aux: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(a.length);
    for (let i = 0; i < a.length; i++) {
      b[i] = a[i];
    }
    const inversions: number = Inversions.count$int_A$int_A$int_A$int$int(
      a,
      b,
      aux,
      0,
      a.length - 1
    );
    return inversions;
  }

  private static merge$java_lang_Comparable_A$java_lang_Comparable_A$int$int$int<
    Key extends java.lang.Comparable<Key>
  >(a: Key[], aux: Key[], lo: number, mid: number, hi: number): number {
    let inversions = 0;
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
        else if (Inversions.less<any>(aux[j], aux[i])) {
          a[k] = aux[j++];
          inversions += mid - i + 1;
        } else a[k] = aux[i++];
      }
    }
    return inversions;
  }

  private static count$java_lang_Comparable_A$java_lang_Comparable_A$java_lang_Comparable_A$int$int<
    Key extends java.lang.Comparable<Key>
  >(a: Key[], b: Key[], aux: Key[], lo: number, hi: number): number {
    let inversions = 0;
    if (hi <= lo) return 0;
    const mid: number = lo + (((hi - lo) / 2) | 0);
    inversions += Inversions.count$java_lang_Comparable_A$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
      a,
      b,
      aux,
      lo,
      mid
    );
    inversions += Inversions.count$java_lang_Comparable_A$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
      a,
      b,
      aux,
      mid + 1,
      hi
    );
    inversions += Inversions.merge$java_lang_Comparable_A$java_lang_Comparable_A$int$int$int(
      b,
      aux,
      lo,
      mid,
      hi
    );
    return inversions;
  }

  public static count$java_lang_Comparable_A<
    Key extends java.lang.Comparable<Key>
  >(a: Key[]): number {
    const b: Key[] = /* clone */ ((o: any) => {
      if (o.clone != undefined) {
        return (<any>o).clone();
      }
      const clone = Object.create(o);
      for (const p in o) {
        if (o.hasOwnProperty(p)) clone[p] = o[p];
      }
      return clone;
    })(a);
    const aux: Key[] = /* clone */ ((o: any) => {
      if (o.clone != undefined) {
        return (<any>o).clone();
      }
      const clone = Object.create(o);
      for (const p in o) {
        if (o.hasOwnProperty(p)) clone[p] = o[p];
      }
      return clone;
    })(a);
    const inversions: number = Inversions.count$java_lang_Comparable_A$java_lang_Comparable_A$java_lang_Comparable_A$int$int(
      a,
      b,
      aux,
      0,
      a.length - 1
    );
    return inversions;
  }

  private static less<Key extends java.lang.Comparable<Key>>(
    v: Key,
    w: Key
  ): boolean {
    return v.compareTo(w) < 0;
  }

  public static brute$java_lang_Comparable_A$int$int<
    Key extends java.lang.Comparable<Key>
  >(a: Key[], lo: number, hi: number): number {
    let inversions = 0;
    for (let i: number = lo; i <= hi; i++) {
      for (let j: number = i + 1; j <= hi; j++) {
        if (Inversions.less<any>(a[j], a[i])) inversions++;
      }
    }
    return inversions;
  }

  public static brute<Key extends java.lang.Comparable<Key>>(
    a?: any,
    lo?: any,
    hi?: any
  ): any {
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] != null)) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>Inversions.brute$java_lang_Comparable_A$int$int(a, lo, hi);
    }
    if (
      ((a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
        a === null) &&
      (typeof lo === 'number' || lo === null) &&
      (typeof hi === 'number' || hi === null)
    ) {
      return <any>Inversions.brute$int_A$int$int(a, lo, hi);
    }
    throw new Error('invalid overload');
  }

  private static brute$int_A$int$int(
    a: number[],
    lo: number,
    hi: number
  ): number {
    let inversions = 0;
    for (let i: number = lo; i <= hi; i++) {
      for (let j: number = i + 1; j <= hi; j++) {
        if (a[j] < a[i]) inversions++;
      }
    }
    return inversions;
  }

  /**
   * Reads a sequence of integers from standard input and
   * prints the number of inversions to standard output.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const a: number[] = StdIn.readAllInts();
    const n: number = a.length;
    const b: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      b[i] = a[i];
    }
    StdOut.println$long(Inversions.count$int_A(a));
    StdOut.println$long(Inversions.count$java_lang_Comparable_A(b));
  }
}
Inversions.__class = 'edu.princeton.cs.algs4.Inversions';

Inversions.main(null);
