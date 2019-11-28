import { StdOut } from './StdOut';
import { StdRandom } from './StdRandom';

/**
 * Solves the linear system of equations <em>Ax</em> = <em>b</em>,
 * where <em>A</em> is an <em>m</em>-by-<em>n</em> matrix and <em>b</em>
 * is a length <em>m</em> vector.
 *
 * @param   A the <em>m</em>-by-<em>n</em> constraint matrix
 * @param   b the length <em>m</em> right-hand-side vector
 * @throws IllegalArgumentException if the dimensions disagree, i.e.,
 * the length of `b` does not equal `m`
 * @class
 * @author Robert Sedgewick
 */
export class GaussianElimination {
  static EPSILON = 1.0e-8;

  private m: number;

  private n: number;

  private a: number[][];

  public constructor(A: number[][], b: number[]) {
    if (this.m === undefined) this.m = 0;
    if (this.n === undefined) this.n = 0;
    if (this.a === undefined) this.a = null;
    this.m = A.length;
    this.n = A[0].length;
    if (b.length !== this.m) throw new Error('Dimensions disagree');
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
    })([this.m, this.n + 1]);
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        this.a[i][j] = A[i][j];
      }
    }
    for (let i = 0; i < this.m; i++) {
      this.a[i][this.n] = b[i];
    }
    this.forwardElimination();
  }

  private forwardElimination() {
    for (let p = 0; p < Math.min(this.m, this.n); p++) {
      {
        let max: number = p;
        for (let i: number = p + 1; i < this.m; i++) {
          {
            if (Math.abs(this.a[i][p]) > Math.abs(this.a[max][p])) {
              max = i;
            }
          }
        }
        this.swap(p, max);
        if (Math.abs(this.a[p][p]) <= GaussianElimination.EPSILON) {
          continue;
        }
        this.pivot(p);
      }
    }
  }

  private swap(row1: number, row2: number) {
    const temp: number[] = this.a[row1];
    this.a[row1] = this.a[row2];
    this.a[row2] = temp;
  }

  private pivot(p: number) {
    for (let i: number = p + 1; i < this.m; i++) {
      {
        const alpha: number = this.a[i][p] / this.a[p][p];
        for (let j: number = p; j <= this.n; j++) {
          {
            this.a[i][j] -= alpha * this.a[p][j];
          }
        }
      }
    }
  }

  /**
   * Returns a solution to the linear system of equations <em>Ax</em> = <em>b</em>.
   *
   * @return  a solution <em>x</em> to the linear system of equations
   * <em>Ax</em> = <em>b</em>; `null` if no such solution
   */
  public primal(): number[] {
    const x: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.n);
    for (let i: number = Math.min(this.n - 1, this.m - 1); i >= 0; i--) {
      {
        let sum = 0.0;
        for (let j: number = i + 1; j < this.n; j++) {
          {
            sum += this.a[i][j] * x[j];
          }
        }
        if (Math.abs(this.a[i][i]) > GaussianElimination.EPSILON)
          x[i] = (this.a[i][this.n] - sum) / this.a[i][i];
        else if (
          Math.abs(this.a[i][this.n] - sum) > GaussianElimination.EPSILON
        )
          return null;
      }
    }
    for (let i: number = this.n; i < this.m; i++) {
      {
        let sum = 0.0;
        for (let j = 0; j < this.n; j++) {
          {
            sum += this.a[i][j] * x[j];
          }
        }
        if (Math.abs(this.a[i][this.n] - sum) > GaussianElimination.EPSILON)
          return null;
      }
    }
    return x;
  }

  /**
   * Returns true if there exists a solution to the linear system of
   * equations <em>Ax</em> = <em>b</em>.
   *
   * @return  `true` if there exists a solution to the linear system
   * of equations <em>Ax</em> = <em>b</em>; `false` otherwise
   */
  public isFeasible(): boolean {
    return this.primal() != null;
  }

  private certifySolution(A: number[][], b: number[]): boolean {
    if (!this.isFeasible()) return true;
    const x: number[] = this.primal();
    for (let i = 0; i < this.m; i++) {
      {
        let sum = 0.0;
        for (let j = 0; j < this.n; j++) {
          {
            sum += A[i][j] * x[j];
          }
        }
        if (Math.abs(sum - b[i]) > GaussianElimination.EPSILON) {
          StdOut.println$java_lang_Object('not feasible');
          StdOut.println$java_lang_Object(`b[${i}] = ${b[i]}, sum = ${sum}`);
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Unit tests the `GaussianElimination` data type.
   * @param  name
   * @param  A
   * @param  b
   * @private
   */
  private static test(name: string, A: number[][], b: number[]) {
    StdOut.println$java_lang_Object(
      '----------------------------------------------------'
    );
    StdOut.println$java_lang_Object(name);
    StdOut.println$java_lang_Object(
      '----------------------------------------------------'
    );
    const gaussian: GaussianElimination = new GaussianElimination(A, b);
    const x: number[] = gaussian.primal();
    if (gaussian.isFeasible()) {
      for (let i = 0; i < x.length; i++) {
        {
          StdOut.printf('%.6f\n', x[i]);
        }
      }
    } else {
      StdOut.println$java_lang_Object('System is infeasible');
    }
    StdOut.println();
    StdOut.println();
  }

  private static test1() {
    const A: number[][] = [[0, 1, 1], [2, 4, -2], [0, 3, 15]];
    const b: number[] = [4, 2, 36];
    GaussianElimination.test('test 1 (3-by-3 system, nonsingular)', A, b);
  }

  private static test2() {
    const A: number[][] = [[1, -3, 1], [2, -8, 8], [-6, 3, -15]];
    const b: number[] = [4, -2, 9];
    GaussianElimination.test('test 2 (3-by-3 system, nonsingular)', A, b);
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
    GaussianElimination.test('test 3 (5-by-5 system, no solutions)', A, b);
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
    GaussianElimination.test(
      'test 4 (5-by-5 system, infinitely many solutions)',
      A,
      b
    );
  }

  private static test5() {
    const A: number[][] = [[2, -1, 1], [3, 2, -4], [-6, 3, -3]];
    const b: number[] = [1, 4, 2];
    GaussianElimination.test('test 5 (3-by-3 system, no solutions)', A, b);
  }

  private static test6() {
    const A: number[][] = [[1, -1, 2], [4, 4, -2], [-2, 2, -4]];
    const b: number[] = [-3, 1, 6];
    GaussianElimination.test(
      'test 6 (3-by-3 system, infinitely many solutions)',
      A,
      b
    );
  }

  private static test7() {
    const A: number[][] = [[0, 1, 1], [2, 4, -2], [0, 3, 15], [2, 8, 14]];
    const b: number[] = [4, 2, 36, 42];
    GaussianElimination.test('test 7 (4-by-3 system, full rank)', A, b);
  }

  private static test8() {
    const A: number[][] = [[0, 1, 1], [2, 4, -2], [0, 3, 15], [2, 8, 14]];
    const b: number[] = [4, 2, 36, 40];
    GaussianElimination.test('test 8 (4-by-3 system, no solution)', A, b);
  }

  private static test9() {
    const A: number[][] = [[1, -3, 1, 1], [2, -8, 8, 2], [-6, 3, -15, 3]];
    const b: number[] = [4, -2, 9];
    GaussianElimination.test('test 9 (3-by-4 system, full rank)', A, b);
  }

  /**
   * Unit tests the `GaussianElimination` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    GaussianElimination.test1();
    GaussianElimination.test2();
    GaussianElimination.test3();
    GaussianElimination.test4();
    GaussianElimination.test5();
    GaussianElimination.test6();
    GaussianElimination.test7();
    GaussianElimination.test8();
    GaussianElimination.test9();
    const n: number = parseInt(args[0]);
    const A: number[][] = <any>(function(dims) {
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
    const b: number[] = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      b[i] = StdRandom.uniform$int(1000);
    }
    GaussianElimination.test(`${n}-by-${n} (probably nonsingular)`, A, b);
  }
}
GaussianElimination.__class = 'edu.princeton.cs.algs4.GaussianElimination';

GaussianElimination.main(null);
