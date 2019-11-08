import { StdOut } from './StdOut';
import { StdRandom } from './StdRandom';

/**
 * Solves the linear system of equations <em>Ax</em> = <em>b</em>,
 * where <em>A</em> is an <em>n</em>-by-<em>n</em> matrix and <em>b</em>
 * is a length <em>n</em> vector.
 *
 * @param   A the <em>n</em>-by-<em>n</em> constraint matrix
 * @param   b the length <em>n</em> right-hand-side vector
 * @class
 * @author Robert Sedgewick
 */
export class GaussJordanElimination {
  static EPSILON = 1.0e-8;

  private n: number;

  private a: number[][];

  public constructor(A: number[][], b: number[]) {
    if (this.n === undefined) this.n = 0;
    if (this.a === undefined) this.a = null;
    this.n = b.length;
    this.a = <any>(function(dims) {
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
    })([this.n, this.n + this.n + 1]);
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        this.a[i][j] = A[i][j];
      }
    }
    for (let i = 0; i < this.n; i++) {
      this.a[i][this.n + i] = 1.0;
    }
    for (let i = 0; i < this.n; i++) {
      this.a[i][this.n + this.n] = b[i];
    }
    this.solve();
  }

  private solve() {
    for (let p = 0; p < this.n; p++) {
      {
        let max: number = p;
        for (let i: number = p + 1; i < this.n; i++) {
          {
            if (Math.abs(this.a[i][p]) > Math.abs(this.a[max][p])) {
              max = i;
            }
          }
        }
        this.swap(p, max);
        if (Math.abs(this.a[p][p]) <= GaussJordanElimination.EPSILON) {
          continue;
        }
        this.pivot(p, p);
      }
    }
  }

  private swap(row1: number, row2: number) {
    const temp: number[] = this.a[row1];
    this.a[row1] = this.a[row2];
    this.a[row2] = temp;
  }

  private pivot(p: number, q: number) {
    for (let i = 0; i < this.n; i++) {
      {
        const alpha: number = this.a[i][q] / this.a[p][q];
        for (let j = 0; j <= this.n + this.n; j++) {
          {
            if (i !== p && j !== q) this.a[i][j] -= alpha * this.a[p][j];
          }
        }
      }
    }
    for (let i = 0; i < this.n; i++) {
      if (i !== p) this.a[i][q] = 0.0;
    }
    for (let j = 0; j <= this.n + this.n; j++) {
      if (j !== q) this.a[p][j] /= this.a[p][q];
    }
    this.a[p][q] = 1.0;
  }

  /**
   * Returns a solution to the linear system of equations <em>Ax</em> = <em>b</em>.
   *
   * @return  a solution <em>x</em> to the linear system of equations
   * <em>Ax</em> = <em>b</em>; {@code null} if no such solution
   */
  public primal(): number[] {
    const x: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.n);
    for (let i = 0; i < this.n; i++) {
      {
        if (Math.abs(this.a[i][i]) > GaussJordanElimination.EPSILON)
          x[i] = this.a[i][this.n + this.n] / this.a[i][i];
        else if (
          Math.abs(this.a[i][this.n + this.n]) > GaussJordanElimination.EPSILON
        )
          return null;
      }
    }
    return x;
  }

  /**
   * Returns a solution to the linear system of equations <em>yA</em> = 0,
   * <em>yb</em> &ne; 0.
   *
   * @return  a solution <em>y</em> to the linear system of equations
   * <em>yA</em> = 0, <em>yb</em> &ne; 0; {@code null} if no such solution
   */
  public dual(): number[] {
    const y: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.n);
    for (let i = 0; i < this.n; i++) {
      {
        if (
          Math.abs(this.a[i][i]) <= GaussJordanElimination.EPSILON &&
          Math.abs(this.a[i][this.n + this.n]) > GaussJordanElimination.EPSILON
        ) {
          for (let j = 0; j < this.n; j++) {
            y[j] = this.a[i][this.n + j];
          }
          return y;
        }
      }
    }
    return null;
  }

  /**
   * Returns true if there exists a solution to the linear system of
   * equations <em>Ax</em> = <em>b</em>.
   *
   * @return  {@code true} if there exists a solution to the linear system
   * of equations <em>Ax</em> = <em>b</em>; {@code false} otherwise
   */
  public isFeasible(): boolean {
    return this.primal() != null;
  }

  private show() {
    for (let i = 0; i < this.n; i++) {
      {
        for (let j = 0; j < this.n; j++) {
          {
            StdOut.printf('%8.3f ', this.a[i][j]);
          }
        }
        StdOut.printf('| ');
        for (let j: number = this.n; j < this.n + this.n; j++) {
          {
            StdOut.printf('%8.3f ', this.a[i][j]);
          }
        }
        StdOut.printf('| %8.3f\n', this.a[i][this.n + this.n]);
      }
    }
    StdOut.println();
  }

  private certifySolution(A: number[][], b: number[]): boolean {
    if (this.isFeasible()) {
      const x: number[] = this.primal();
      for (let i = 0; i < this.n; i++) {
        {
          let sum = 0.0;
          for (let j = 0; j < this.n; j++) {
            {
              sum += A[i][j] * x[j];
            }
          }
          if (Math.abs(sum - b[i]) > GaussJordanElimination.EPSILON) {
            StdOut.println$java_lang_Object('not feasible');
            StdOut.printf('b[%d] = %8.3f, sum = %8.3f\n', i, b[i], sum);
            return false;
          }
        }
      }
      return true;
    }
    const y: number[] = this.dual();
    for (let j = 0; j < this.n; j++) {
      {
        let sum = 0.0;
        for (let i = 0; i < this.n; i++) {
          {
            sum += A[i][j] * y[i];
          }
        }
        if (Math.abs(sum) > GaussJordanElimination.EPSILON) {
          StdOut.println$java_lang_Object(
            'invalid certificate of infeasibility'
          );
          StdOut.printf('sum = %8.3f\n', sum);
          return false;
        }
      }
    }
    let sum = 0.0;
    for (let i = 0; i < this.n; i++) {
      {
        sum += y[i] * b[i];
      }
    }
    if (Math.abs(sum) < GaussJordanElimination.EPSILON) {
      StdOut.println$java_lang_Object('invalid certificate of infeasibility');
      StdOut.printf('yb  = %8.3f\n', sum);
      return false;
    }
    return true;
  }

  private static test(name: string, A: number[][], b: number[]) {
    StdOut.println$java_lang_Object(
      '----------------------------------------------------'
    );
    StdOut.println$java_lang_Object(name);
    StdOut.println$java_lang_Object(
      '----------------------------------------------------'
    );
    const gaussian: GaussJordanElimination = new GaussJordanElimination(A, b);
    if (gaussian.isFeasible()) {
      StdOut.println$java_lang_Object('Solution to Ax = b');
      const x: number[] = gaussian.primal();
      for (let i = 0; i < x.length; i++) {
        {
          StdOut.printf('%10.6f\n', x[i]);
        }
      }
    } else {
      StdOut.println$java_lang_Object('Certificate of infeasibility');
      const y: number[] = gaussian.dual();
      for (let j = 0; j < y.length; j++) {
        {
          StdOut.printf('%10.6f\n', y[j]);
        }
      }
    }
    StdOut.println();
    StdOut.println();
  }

  private static test1() {
    const A: number[][] = [[0, 1, 1], [2, 4, -2], [0, 3, 15]];
    const b: number[] = [4, 2, 36];
    GaussJordanElimination.test('test 1', A, b);
  }

  private static test2() {
    const A: number[][] = [[1, -3, 1], [2, -8, 8], [-6, 3, -15]];
    const b: number[] = [4, -2, 9];
    GaussJordanElimination.test('test 2', A, b);
  }

  private static test3() {
    const A: number[][] = [
      [2, -3, -1, 2, 3],
      [4, -4, -1, 4, 11],
      [2, -5, -2, 2, -1],
      [0, 2, 1, 0, 4],
      [-4, 6, 0, 0, 7],
    ];
    const b: number[] = [4, 4, 9, -6, 5];
    GaussJordanElimination.test('test 3', A, b);
  }

  private static test4() {
    const A: number[][] = [
      [2, -3, -1, 2, 3],
      [4, -4, -1, 4, 11],
      [2, -5, -2, 2, -1],
      [0, 2, 1, 0, 4],
      [-4, 6, 0, 0, 7],
    ];
    const b: number[] = [4, 4, 9, -5, 5];
    GaussJordanElimination.test('test 4', A, b);
  }

  private static test5() {
    const A: number[][] = [[2, -1, 1], [3, 2, -4], [-6, 3, -3]];
    const b: number[] = [1, 4, 2];
    GaussJordanElimination.test('test 5', A, b);
  }

  private static test6() {
    const A: number[][] = [[1, -1, 2], [4, 4, -2], [-2, 2, -4]];
    const b: number[] = [-3, 1, 6];
    GaussJordanElimination.test('test 6 (infinitely many solutions)', A, b);
  }

  /**
   * Unit tests the {@code GaussJordanElimination} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    GaussJordanElimination.test1();
    GaussJordanElimination.test2();
    GaussJordanElimination.test3();
    GaussJordanElimination.test4();
    GaussJordanElimination.test5();
    GaussJordanElimination.test6();
    const n: number = parseInt(args[0]);
    let A: number[][] = <any>(function(dims) {
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
    })([n, n]);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        A[i][j] = StdRandom.uniform$int(1000);
      }
    }
    let b: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      b[i] = StdRandom.uniform$int(1000);
    }
    GaussJordanElimination.test(`random ${n}-by-${n} (likely full rank)`, A, b);
    A = <any>(function(dims) {
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
    })([n, n]);
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n; j++) {
        A[i][j] = StdRandom.uniform$int(1000);
      }
    }
    for (let i = 0; i < n - 1; i++) {
      {
        const alpha: number = StdRandom.uniform$int(11) - 5.0;
        for (let j = 0; j < n; j++) {
          {
            A[n - 1][j] += alpha * A[i][j];
          }
        }
      }
    }
    b = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      b[i] = StdRandom.uniform$int(1000);
    }
    GaussJordanElimination.test(
      `random ${n}-by-${n} (likely infeasible)`,
      A,
      b
    );
  }
}
GaussJordanElimination.__class =
  'edu.princeton.cs.algs4.GaussJordanElimination';

GaussJordanElimination.main(null);
