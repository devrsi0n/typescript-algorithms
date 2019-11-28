import { LinearProgramming } from './LinearProgramming';
import { StdOut } from './StdOut';
import { StdRandom } from './StdRandom';

/**
 * Determines an optimal solution to the two-sum zero-sum game
 * with the specified payoff matrix.
 *
 * @param   payoff the <em>m</em>-by-<em>n</em> payoff matrix
 * @class
 * @author Robert Sedgewick
 */
export class TwoPersonZeroSumGame {
  static EPSILON = 1.0e-8;

  private m: number;

  private n: number;

  private lp: LinearProgramming;

  private constant: number;

  public constructor(payoff: number[][]) {
    if (this.m === undefined) this.m = 0;
    if (this.n === undefined) this.n = 0;
    if (this.lp === undefined) this.lp = null;
    if (this.constant === undefined) this.constant = 0;
    this.m = payoff.length;
    this.n = payoff[0].length;
    const c: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.n);
    const b: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.m);
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
    })([this.m, this.n]);
    for (let i = 0; i < this.m; i++) {
      b[i] = 1.0;
    }
    for (let j = 0; j < this.n; j++) {
      c[j] = 1.0;
    }
    this.constant = Number.POSITIVE_INFINITY;
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        if (payoff[i][j] < this.constant) this.constant = payoff[i][j];
      }
    }
    if (this.constant <= 0) this.constant = -this.constant + 1;
    else this.constant = 0;
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        A[i][j] = payoff[i][j] + this.constant;
      }
    }
    this.lp = new LinearProgramming(A, b, c);
  }

  /**
   * Returns the optimal value of this two-person zero-sum game.
   *
   * @return  the optimal value of this two-person zero-sum game
   */
  public value(): number {
    return 1.0 / this.scale() - this.constant;
  }

  private scale(): number {
    const x: number[] = this.lp.primal();
    let sum = 0.0;
    for (let j = 0; j < this.n; j++) {
      sum += x[j];
    }
    return sum;
  }

  /**
   * Returns the optimal row strategy of this two-person zero-sum game.
   *
   * @return  the optimal row strategy <em>x</em> of this two-person zero-sum game
   */
  public row(): number[] {
    const scale: number = this.scale();
    const x: number[] = this.lp.primal();
    for (let j = 0; j < this.n; j++) {
      x[j] /= scale;
    }
    return x;
  }

  /**
   * Returns the optimal column strategy of this two-person zero-sum game.
   *
   * @return  the optimal column strategy <em>y</em> of this two-person zero-sum game
   */
  public column(): number[] {
    const scale: number = this.scale();
    const y: number[] = this.lp.dual();
    for (let i = 0; i < this.m; i++) {
      y[i] /= scale;
    }
    return y;
  }

  /**
   *
   * The code below is solely for testing correctness of the data type.
   * @return
   * @private
   */
  private isPrimalFeasible(): boolean {
    const x: number[] = this.row();
    let sum = 0.0;
    for (let j = 0; j < this.n; j++) {
      {
        if (x[j] < 0) {
          StdOut.println$java_lang_Object(
            'row vector not a probability distribution'
          );
          StdOut.printf('    x[%d] = %f\n', j, x[j]);
          return false;
        }
        sum += x[j];
      }
    }
    if (Math.abs(sum - 1.0) > TwoPersonZeroSumGame.EPSILON) {
      StdOut.println$java_lang_Object(
        'row vector x[] is not a probability distribution'
      );
      StdOut.println$java_lang_Object(`    sum = ${sum}`);
      return false;
    }
    return true;
  }

  private isDualFeasible(): boolean {
    const y: number[] = this.column();
    let sum = 0.0;
    for (let i = 0; i < this.m; i++) {
      {
        if (y[i] < 0) {
          StdOut.println$java_lang_Object(
            'column vector y[] is not a probability distribution'
          );
          StdOut.printf('    y[%d] = %f\n', i, y[i]);
          return false;
        }
        sum += y[i];
      }
    }
    if (Math.abs(sum - 1.0) > TwoPersonZeroSumGame.EPSILON) {
      StdOut.println$java_lang_Object(
        'column vector not a probability distribution'
      );
      StdOut.println$java_lang_Object(`    sum = ${sum}`);
      return false;
    }
    return true;
  }

  private isNashEquilibrium(payoff: number[][]): boolean {
    const x: number[] = this.row();
    const y: number[] = this.column();
    const value: number = this.value();
    let opt1: number = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < this.m; i++) {
      {
        let sum = 0.0;
        for (let j = 0; j < this.n; j++) {
          {
            sum += payoff[i][j] * x[j];
          }
        }
        if (sum > opt1) opt1 = sum;
      }
    }
    if (Math.abs(opt1 - value) > TwoPersonZeroSumGame.EPSILON) {
      StdOut.println$java_lang_Object(`Optimal value = ${value}`);
      StdOut.println$java_lang_Object(
        `Optimal best response for column player = ${opt1}`
      );
      return false;
    }
    let opt2: number = Number.POSITIVE_INFINITY;
    for (let j = 0; j < this.n; j++) {
      {
        let sum = 0.0;
        for (let i = 0; i < this.m; i++) {
          {
            sum += payoff[i][j] * y[i];
          }
        }
        if (sum < opt2) opt2 = sum;
      }
    }
    if (Math.abs(opt2 - value) > TwoPersonZeroSumGame.EPSILON) {
      StdOut.println$java_lang_Object(`Optimal value = ${value}`);
      StdOut.println$java_lang_Object(
        `Optimal best response for row player = ${opt2}`
      );
      return false;
    }
    return true;
  }

  private certifySolution(payoff: number[][]): boolean {
    return (
      this.isPrimalFeasible() &&
      this.isDualFeasible() &&
      this.isNashEquilibrium(payoff)
    );
  }

  private static test(description: string, payoff: number[][]) {
    StdOut.println();
    StdOut.println$java_lang_Object(description);
    StdOut.println$java_lang_Object('------------------------------------');
    const m: number = payoff.length;
    const n: number = payoff[0].length;
    const zerosum: TwoPersonZeroSumGame = new TwoPersonZeroSumGame(payoff);
    const x: number[] = zerosum.row();
    const y: number[] = zerosum.column();
    StdOut.print$java_lang_Object('x[] = [');
    for (let j = 0; j < n - 1; j++) {
      StdOut.printf('%8.4f, ', x[j]);
    }
    StdOut.printf('%8.4f]\n', x[n - 1]);
    StdOut.print$java_lang_Object('y[] = [');
    for (let i = 0; i < m - 1; i++) {
      StdOut.printf('%8.4f, ', y[i]);
    }
    StdOut.printf('%8.4f]\n', y[m - 1]);
    StdOut.println$java_lang_Object(`value =  ${zerosum.value()}`);
  }

  private static test1() {
    const payoff: number[][] = [[30, -10, 20], [10, 20, -20]];
    TwoPersonZeroSumGame.test('wikipedia', payoff);
  }

  private static test2() {
    const payoff: number[][] = [
      [0, 2, -3, 0],
      [-2, 0, 0, 3],
      [3, 0, 0, -4],
      [0, -3, 4, 0],
    ];
    TwoPersonZeroSumGame.test('Chvatal, p. 230', payoff);
  }

  private static test3() {
    const payoff: number[][] = [
      [0, 2, -3, 0],
      [-2, 0, 0, 3],
      [3, 0, 0, -4],
      [0, -3, 4, 0],
      [0, 0, -3, 3],
      [-2, 2, 0, 0],
      [3, -3, 0, 0],
      [0, 0, 4, -4],
    ];
    TwoPersonZeroSumGame.test('Chvatal, p. 234', payoff);
  }

  private static test4() {
    const payoff: number[][] = [
      [0, 2, -1, -1],
      [0, 1, -2, -1],
      [-1, -1, 1, 1],
      [-1, 0, 0, 1],
      [1, -2, 0, -3],
      [1, -1, -1, -3],
      [0, -3, 2, -1],
      [0, -2, 1, -1],
    ];
    TwoPersonZeroSumGame.test('Chvatal p. 236', payoff);
  }

  private static test5() {
    const payoff: number[][] = [[0, -1, 1], [1, 0, -1], [-1, 1, 0]];
    TwoPersonZeroSumGame.test('rock, paper, scisssors', payoff);
  }

  /**
   * Unit tests the `ZeroSumGameToLP` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    TwoPersonZeroSumGame.test1();
    TwoPersonZeroSumGame.test2();
    TwoPersonZeroSumGame.test3();
    TwoPersonZeroSumGame.test4();
    TwoPersonZeroSumGame.test5();
    const m: number = parseInt(args[0]);
    const n: number = parseInt(args[1]);
    const payoff: number[][] = <any>(function(dims) {
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
      for (let j = 0; j < n; j++) {
        payoff[i][j] = StdRandom.uniform$double$double(-0.5, 0.5);
      }
    }
    TwoPersonZeroSumGame.test(`random ${m}-by-${n}`, payoff);
  }
}
TwoPersonZeroSumGame.__class = 'edu.princeton.cs.algs4.TwoPersonZeroSumGame';

TwoPersonZeroSumGame.main(null);
