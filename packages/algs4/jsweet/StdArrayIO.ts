import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * <i>Standard array IO</i>. This class provides methods for reading
 * in 1D and 2D arrays from standard input and printing out to
 * standard output.
 * <p>
 * For additional documentation, see
 * <a href="https://introcs.cs.princeton.edu/22libary">Section 2.2</a> of
 * <i>Computer Science: An Interdisciplinary Approach</i>
 * by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class StdArrayIO {


  /**
   * Reads a 1D array of doubles from standard input and returns it.
   *
   * @return  the 1D array of doubles
   */
  public static readDouble1D(): number[] {
    const n: number = StdIn.readInt();
    const a: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        a[i] = StdIn.readDouble();
      }
    }
    return a;
  }

  public static print$double_A(a: number[]) {
    const n: number = a.length;
    StdOut.println$int(n);
    for (let i = 0; i < n; i++) {
      {
        StdOut.printf('%9.5f ', a[i]);
      }
    }
    StdOut.println();
  }

  /**
   * Prints an array of doubles to standard output.
   *
   * @param {Array} a the 1D array of doubles
   */
  public static print(a?: any): any {
    if (
      (a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
      a === null
    ) {
      return <any>StdArrayIO.print$double_A(a);
    }
    if (
      (a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] instanceof Array)) ||
      a === null
    ) {
      return <any>StdArrayIO.print$double_A_A(a);
    }
    if (
      (a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'number')) ||
      a === null
    ) {
      return <any>StdArrayIO.print$int_A(a);
    }
    if (
      (a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] instanceof Array)) ||
      a === null
    ) {
      return <any>StdArrayIO.print$int_A_A(a);
    }
    if (
      (a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || typeof a[0] === 'boolean')) ||
      a === null
    ) {
      return <any>StdArrayIO.print$boolean_A(a);
    }
    if (
      (a != null &&
        a instanceof <any>Array &&
        (a.length == 0 || a[0] == null || a[0] instanceof Array)) ||
      a === null
    ) {
      return <any>StdArrayIO.print$boolean_A_A(a);
    }
    throw new Error('invalid overload');
  }

  /**
   * Reads a 2D array of doubles from standard input and returns it.
   *
   * @return  the 2D array of doubles
   */
  public static readDouble2D(): number[][] {
    const m: number = StdIn.readInt();
    const n: number = StdIn.readInt();
    const a: number[][] = <any>(function(dims) {
      const allocate = function(dims) {
        if (dims.length == 0) {
          return 0;
        }
        const array = [];
        for (let i = 0; i < dims[0]; i++) {
          array.push(allocate(dims.slice(1)));
        }
        return array;
      };
      return allocate(dims);
    })([m, n]);
    for (let i = 0; i < m; i++) {
      {
        for (let j = 0; j < n; j++) {
          {
            a[i][j] = StdIn.readDouble();
          }
        }
      }
    }
    return a;
  }

  public static print$double_A_A(a: number[][]) {
    const m: number = a.length;
    const n: number = a[0].length;
    StdOut.println$java_lang_Object(`${m} ${n}`);
    for (let i = 0; i < m; i++) {
      {
        for (let j = 0; j < n; j++) {
          {
            StdOut.printf('%9.5f ', a[i][j]);
          }
        }
        StdOut.println();
      }
    }
  }

  /**
   * Reads a 1D array of integers from standard input and returns it.
   *
   * @return  the 1D array of integers
   */
  public static readInt1D(): number[] {
    const n: number = StdIn.readInt();
    const a: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        a[i] = StdIn.readInt();
      }
    }
    return a;
  }

  public static print$int_A(a: number[]) {
    const n: number = a.length;
    StdOut.println$int(n);
    for (let i = 0; i < n; i++) {
      {
        StdOut.printf('%9d ', a[i]);
      }
    }
    StdOut.println();
  }

  /**
   * Reads a 2D array of integers from standard input and returns it.
   *
   * @return  the 2D array of integers
   */
  public static readInt2D(): number[][] {
    const m: number = StdIn.readInt();
    const n: number = StdIn.readInt();
    const a: number[][] = <any>(function(dims) {
      const allocate = function(dims) {
        if (dims.length == 0) {
          return 0;
        }
        const array = [];
        for (let i = 0; i < dims[0]; i++) {
          array.push(allocate(dims.slice(1)));
        }
        return array;
      };
      return allocate(dims);
    })([m, n]);
    for (let i = 0; i < m; i++) {
      {
        for (let j = 0; j < n; j++) {
          {
            a[i][j] = StdIn.readInt();
          }
        }
      }
    }
    return a;
  }

  public static print$int_A_A(a: number[][]) {
    const m: number = a.length;
    const n: number = a[0].length;
    StdOut.println$java_lang_Object(`${m} ${n}`);
    for (let i = 0; i < m; i++) {
      {
        for (let j = 0; j < n; j++) {
          {
            StdOut.printf('%9d ', a[i][j]);
          }
        }
        StdOut.println();
      }
    }
  }

  /**
   * Reads a 1D array of booleans from standard input and returns it.
   *
   * @return  the 1D array of booleans
   */
  public static readBoolean1D(): boolean[] {
    const n: number = StdIn.readInt();
    const a: boolean[] = (s => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        a[i] = StdIn.readBoolean();
      }
    }
    return a;
  }

  public static print$boolean_A(a: boolean[]) {
    const n: number = a.length;
    StdOut.println$int(n);
    for (let i = 0; i < n; i++) {
      {
        if (a[i]) StdOut.print$java_lang_Object('1 ');
        else StdOut.print$java_lang_Object('0 ');
      }
    }
    StdOut.println();
  }

  /**
   * Reads a 2D array of booleans from standard input and returns it.
   *
   * @return  the 2D array of booleans
   */
  public static readBoolean2D(): boolean[][] {
    const m: number = StdIn.readInt();
    const n: number = StdIn.readInt();
    const a: boolean[][] = <any>(function(dims) {
      const allocate = function(dims) {
        if (dims.length == 0) {
          return false;
        }
        const array = [];
        for (let i = 0; i < dims[0]; i++) {
          array.push(allocate(dims.slice(1)));
        }
        return array;
      };
      return allocate(dims);
    })([m, n]);
    for (let i = 0; i < m; i++) {
      {
        for (let j = 0; j < n; j++) {
          {
            a[i][j] = StdIn.readBoolean();
          }
        }
      }
    }
    return a;
  }

  public static print$boolean_A_A(a: boolean[][]) {
    const m: number = a.length;
    const n: number = a[0].length;
    StdOut.println$java_lang_Object(`${m} ${n}`);
    for (let i = 0; i < m; i++) {
      {
        for (let j = 0; j < n; j++) {
          {
            if (a[i][j]) StdOut.print$java_lang_Object('1 ');
            else StdOut.print$java_lang_Object('0 ');
          }
        }
        StdOut.println();
      }
    }
  }

  /**
   * Unit tests {@code StdArrayIO}.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const a: number[] = StdArrayIO.readDouble1D();
    StdArrayIO.print$double_A(a);
    StdOut.println();
    const b: number[][] = StdArrayIO.readDouble2D();
    StdArrayIO.print$double_A_A(b);
    StdOut.println();
    const d: boolean[][] = StdArrayIO.readBoolean2D();
    StdArrayIO.print$boolean_A_A(d);
    StdOut.println();
  }
}
StdArrayIO.__class = 'edu.princeton.cs.algs4.StdArrayIO';

StdArrayIO.main(null);
