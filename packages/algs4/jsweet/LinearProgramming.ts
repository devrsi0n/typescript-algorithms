import { StdOut } from './StdOut';
import { StdRandom } from './StdRandom';

/**
 * Determines an optimal solution to the linear program
 * { max cx : Ax &le; b, x &ge; 0 }, where A is a m-by-n
 * matrix, b is an m-length vector, and c is an n-length vector.
 *
 * @param   A the <em>m</em>-by-<em>b</em> matrix
 * @param   b the <em>m</em>-length RHS vector
 * @param   c the <em>n</em>-length cost vector
 * @throws IllegalArgumentException unless {@code b[i] >= 0} for each {@code i}
 * @throws ArithmeticException if the linear program is unbounded
 * @class
 * @author Robert Sedgewick
 */
export class LinearProgramming {
  static EPSILON = 1.0e-10;

  private a: number[][];

  private m: number;

  private n: number;

  private basis: number[];

  public constructor(A: number[][], b: number[], c: number[]) {
    if (this.a === undefined) this.a = null;
    if (this.m === undefined) this.m = 0;
    if (this.n === undefined) this.n = 0;
    if (this.basis === undefined) this.basis = null;
    this.m = b.length;
    this.n = c.length;
    for (let i = 0; i < this.m; i++) {
      if (!(b[i] >= 0)) throw new Error('RHS must be nonnegative');
    }
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
    })([this.m + 1, this.n + this.m + 1]);
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        this.a[i][j] = A[i][j];
      }
    }
    for (let i = 0; i < this.m; i++) {
      this.a[i][this.n + i] = 1.0;
    }
    for (let j = 0; j < this.n; j++) {
      this.a[this.m][j] = c[j];
    }
    for (let i = 0; i < this.m; i++) {
      this.a[i][this.m + this.n] = b[i];
    }
    this.basis = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.m);
    for (let i = 0; i < this.m; i++) {
      this.basis[i] = this.n + i;
    }
    this.solve();
  }

  private solve() {
    while (true) {
      {
        const q: number = this.bland();
        if (q === -1) break;
        const p: number = this.minRatioRule(q);
        if (p === -1)
          throw new Error(
            'Linear program is unbounded'
          );
        this.pivot(p, q);
        this.basis[p] = q;
      }
    }
  }

  private bland(): number {
    for (let j = 0; j < this.m + this.n; j++) {
      if (this.a[this.m][j] > 0) return j;
    }
    return -1;
  }

  private dantzig(): number {
    let q = 0;
    for (let j = 1; j < this.m + this.n; j++) {
      if (this.a[this.m][j] > this.a[this.m][q]) q = j;
    }
    if (this.a[this.m][q] <= 0) return -1;
    return q;
  }

  private minRatioRule(q: number): number {
    let p = -1;
    for (let i = 0; i < this.m; i++) {
      {
        if (this.a[i][q] <= LinearProgramming.EPSILON) continue;
        else if (p === -1) p = i;
        else if (
          this.a[i][this.m + this.n] / this.a[i][q] <
          this.a[p][this.m + this.n] / this.a[p][q]
        )
          p = i;
      }
    }
    return p;
  }

  private pivot(p: number, q: number) {
    for (let i = 0; i <= this.m; i++) {
      for (let j = 0; j <= this.m + this.n; j++) {
        if (i !== p && j !== q)
          this.a[i][j] -= (this.a[p][j] * this.a[i][q]) / this.a[p][q];
      }
    }
    for (let i = 0; i <= this.m; i++) {
      if (i !== p) this.a[i][q] = 0.0;
    }
    for (let j = 0; j <= this.m + this.n; j++) {
      if (j !== q) this.a[p][j] /= this.a[p][q];
    }
    this.a[p][q] = 1.0;
  }

  /**
   * Returns the optimal value of this linear program.
   *
   * @return  the optimal value of this linear program
   */
  public value(): number {
    return -this.a[this.m][this.m + this.n];
  }

  /**
   * Returns the optimal primal solution to this linear program.
   *
   * @return  the optimal primal solution to this linear program
   */
  public primal(): number[] {
    const x: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.n);
    for (let i = 0; i < this.m; i++) {
      if (this.basis[i] < this.n) x[this.basis[i]] = this.a[i][this.m + this.n];
    }
    return x;
  }

  /**
   * Returns the optimal dual solution to this linear program
   *
   * @return  the optimal dual solution to this linear program
   */
  public dual(): number[] {
    const y: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.m);
    for (let i = 0; i < this.m; i++) {
      y[i] = -this.a[this.m][this.n + i];
    }
    return y;
  }

  private isPrimalFeasible(A: number[][], b: number[]): boolean {
    const x: number[] = this.primal();
    for (let j = 0; j < x.length; j++) {
      {
        if (x[j] < 0.0) {
          StdOut.println$java_lang_Object(`x[${j}] = ${x[j]} is negative`);
          return false;
        }
      }
    }
    for (let i = 0; i < this.m; i++) {
      {
        let sum = 0.0;
        for (let j = 0; j < this.n; j++) {
          {
            sum += A[i][j] * x[j];
          }
        }
        if (sum > b[i] + LinearProgramming.EPSILON) {
          StdOut.println$java_lang_Object('not primal feasible');
          StdOut.println$java_lang_Object(`b[${i}] = ${b[i]}, sum = ${sum}`);
          return false;
        }
      }
    }
    return true;
  }

  private isDualFeasible(A: number[][], c: number[]): boolean {
    const y: number[] = this.dual();
    for (let i = 0; i < y.length; i++) {
      {
        if (y[i] < 0.0) {
          StdOut.println$java_lang_Object(`y[${i}] = ${y[i]} is negative`);
          return false;
        }
      }
    }
    for (let j = 0; j < this.n; j++) {
      {
        let sum = 0.0;
        for (let i = 0; i < this.m; i++) {
          {
            sum += A[i][j] * y[i];
          }
        }
        if (sum < c[j] - LinearProgramming.EPSILON) {
          StdOut.println$java_lang_Object('not dual feasible');
          StdOut.println$java_lang_Object(`c[${j}] = ${c[j]}, sum = ${sum}`);
          return false;
        }
      }
    }
    return true;
  }

  private isOptimal(b: number[], c: number[]): boolean {
    const x: number[] = this.primal();
    const y: number[] = this.dual();
    const value: number = this.value();
    let value1 = 0.0;
    for (let j = 0; j < x.length; j++) {
      value1 += c[j] * x[j];
    }
    let value2 = 0.0;
    for (let i = 0; i < y.length; i++) {
      value2 += y[i] * b[i];
    }
    if (
      Math.abs(value - value1) > LinearProgramming.EPSILON ||
      Math.abs(value - value2) > LinearProgramming.EPSILON
    ) {
      StdOut.println$java_lang_Object(
        `value = ${value}, cx = ${value1}, yb = ${value2}`
      );
      return false;
    }
    return true;
  }

  private check(A: number[][], b: number[], c: number[]): boolean {
    return (
      this.isPrimalFeasible(A, b) &&
      this.isDualFeasible(A, c) &&
      this.isOptimal(b, c)
    );
  }

  private show() {
    StdOut.println$java_lang_Object(`m = ${this.m}`);
    StdOut.println$java_lang_Object(`n = ${this.n}`);
    for (let i = 0; i <= this.m; i++) {
      {
        for (let j = 0; j <= this.m + this.n; j++) {
          {
            StdOut.printf('%7.2f ', this.a[i][j]);
          }
        }
        StdOut.println();
      }
    }
    StdOut.println$java_lang_Object(`value = ${this.value()}`);
    for (let i = 0; i < this.m; i++) {
      if (this.basis[i] < this.n)
        StdOut.println$java_lang_Object(
          `x_${this.basis[i]} = ${this.a[i][this.m + this.n]}`
        );
    }
    StdOut.println();
  }

  private static test(A: number[][], b: number[], c: number[]) {
    let lp: LinearProgramming;
    try {
      lp = new LinearProgramming(A, b, c);
    } catch (e) {
      console.info(e);
      return;
    }
    StdOut.println$java_lang_Object(`value = ${lp.value()}`);
    const x: number[] = lp.primal();
    for (let i = 0; i < x.length; i++) {
      StdOut.println$java_lang_Object(`x[${i}] = ${x[i]}`);
    }
    const y: number[] = lp.dual();
    for (let j = 0; j < y.length; j++) {
      StdOut.println$java_lang_Object(`y[${j}] = ${y[j]}`);
    }
  }

  private static test1() {
    const A: number[][] = [
      [-1, 1, 0],
      [1, 4, 0],
      [2, 1, 0],
      [3, -4, 0],
      [0, 0, 1],
    ];
    const c: number[] = [1, 1, 1];
    const b: number[] = [5, 45, 27, 24, 4];
    LinearProgramming.test(A, b, c);
  }

  private static test2() {
    const c: number[] = [13.0, 23.0];
    const b: number[] = [480.0, 160.0, 1190.0];
    const A: number[][] = [[5.0, 15.0], [4.0, 4.0], [35.0, 20.0]];
    LinearProgramming.test(A, b, c);
  }

  private static test3() {
    const c: number[] = [2.0, 3.0, -1.0, -12.0];
    const b: number[] = [3.0, 2.0];
    const A: number[][] = [[-2.0, -9.0, 1.0, 9.0], [1.0, 1.0, -1.0, -2.0]];
    LinearProgramming.test(A, b, c);
  }

  private static test4() {
    const c: number[] = [10.0, -57.0, -9.0, -24.0];
    const b: number[] = [0.0, 0.0, 1.0];
    const A: number[][] = [
      [0.5, -5.5, -2.5, 9.0],
      [0.5, -1.5, -0.5, 1.0],
      [1.0, 0.0, 0.0, 0.0],
    ];
    LinearProgramming.test(A, b, c);
  }

  /**
   * Unit tests the {@code LinearProgramming} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    StdOut.println$java_lang_Object('----- test 1 --------------------');
    LinearProgramming.test1();
    StdOut.println();
    StdOut.println$java_lang_Object('----- test 2 --------------------');
    LinearProgramming.test2();
    StdOut.println();
    StdOut.println$java_lang_Object('----- test 3 --------------------');
    LinearProgramming.test3();
    StdOut.println();
    StdOut.println$java_lang_Object('----- test 4 --------------------');
    LinearProgramming.test4();
    StdOut.println();
    StdOut.println$java_lang_Object('----- test random ---------------');
    const m: number = parseInt(args[0]);
    const n: number = parseInt(args[1]);
    const c: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    const b: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(m);
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
    })([m, n]);
    for (let j = 0; j < n; j++) {
      c[j] = StdRandom.uniform$int(1000);
    }
    for (let i = 0; i < m; i++) {
      b[i] = StdRandom.uniform$int(1000);
    }
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        A[i][j] = StdRandom.uniform$int(100);
      }
    }
    const lp: LinearProgramming = new LinearProgramming(A, b, c);
    LinearProgramming.test(A, b, c);
  }
}
LinearProgramming.__class = 'edu.princeton.cs.algs4.LinearProgramming';

LinearProgramming.main(null);
