import { EdgeWeightedDigraph } from './EdgeWeightedDigraph';
import { DirectedEdge } from './DirectedEdge';
import { DijkstraSP } from './DijkstraSP';
import { StdOut } from './StdOut';
import { StdRandom } from './StdRandom';

/**
 * Determines an optimal solution to the assignment problem.
 *
 * @param   weight the <em>n</em>-by-<em>n</em> matrix of weights
 * @throws IllegalArgumentException unless all weights are nonnegative
 * @throws IllegalArgumentException if `weight` is `null`
 * @class
 * @author Robert Sedgewick
 */
export class AssignmentProblem {
  static FLOATING_POINT_EPSILON = 1.0e-14;

  static UNMATCHED = -1;

  private n: number;

  private __weight: number[][];

  private minWeight: number;

  private px: number[];

  private py: number[];

  private xy: number[];

  private yx: number[];

  public constructor(weight: number[][]) {
    if (this.n === undefined) this.n = 0;
    if (this.__weight === undefined) this.__weight = null;
    if (this.minWeight === undefined) this.minWeight = 0;
    if (this.px === undefined) this.px = null;
    if (this.py === undefined) this.py = null;
    if (this.xy === undefined) this.xy = null;
    if (this.yx === undefined) this.yx = null;
    if (weight == null) throw new Error('constructor argument is null');
    this.n = weight.length;
    this.__weight = <any>(function(dims) {
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
    })([this.n, this.n]);
    for (let i = 0; i < this.n; i++) {
      {
        for (let j = 0; j < this.n; j++) {
          {
            if (/* isNaN */ isNaN(weight[i][j]))
              throw new Error(`weight ${i}-${j} is NaN`);
            if (weight[i][j] < this.minWeight) this.minWeight = weight[i][j];
            this.__weight[i][j] = weight[i][j];
          }
        }
      }
    }
    this.px = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.n);
    this.py = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.n);
    this.xy = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.n);
    this.yx = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.n);
    for (let i = 0; i < this.n; i++) {
      this.xy[i] = AssignmentProblem.UNMATCHED;
    }
    for (let j = 0; j < this.n; j++) {
      this.yx[j] = AssignmentProblem.UNMATCHED;
    }
    for (let k = 0; k < this.n; k++) {
      {
        this.augment();
      }
    }
  }

  private augment() {
    const G: EdgeWeightedDigraph = new EdgeWeightedDigraph(2 * this.n + 2);
    const s: number = 2 * this.n;
    const t: number = 2 * this.n + 1;
    for (let i = 0; i < this.n; i++) {
      {
        if (this.xy[i] === AssignmentProblem.UNMATCHED)
          G.addEdge(new DirectedEdge(s, i, 0.0));
      }
    }
    for (let j = 0; j < this.n; j++) {
      {
        if (this.yx[j] === AssignmentProblem.UNMATCHED)
          G.addEdge(new DirectedEdge(this.n + j, t, this.py[j]));
      }
    }
    for (let i = 0; i < this.n; i++) {
      {
        for (let j = 0; j < this.n; j++) {
          {
            if (this.xy[i] === j)
              G.addEdge(new DirectedEdge(this.n + j, i, 0.0));
            else
              G.addEdge(
                new DirectedEdge(i, this.n + j, this.reducedCost(i, j))
              );
          }
        }
      }
    }
    const spt: DijkstraSP = new DijkstraSP(G, s);
    for (let index129 = spt.pathTo(t).iterator(); index129.hasNext(); ) {
      const e = index129.next();
      {
        const i: number = e.from();
        const j: number = e.to() - this.n;
        if (i < this.n) {
          this.xy[i] = j;
          this.yx[j] = i;
        }
      }
    }
    for (let i = 0; i < this.n; i++) {
      this.px[i] += spt.distTo(i);
    }
    for (let j = 0; j < this.n; j++) {
      this.py[j] += spt.distTo(this.n + j);
    }
  }

  private reducedCost(i: number, j: number): number {
    const reducedCost: number =
      this.__weight[i][j] - this.minWeight + this.px[i] - this.py[j];
    const magnitude: number =
      Math.abs(this.__weight[i][j]) +
      Math.abs(this.px[i]) +
      Math.abs(this.py[j]);
    if (
      Math.abs(reducedCost) <=
      AssignmentProblem.FLOATING_POINT_EPSILON * magnitude
    )
      return 0.0;
    return reducedCost;
  }

  /**
   * Returns the dual optimal value for the specified row.
   *
   * @param   i the row index
   * @return  the dual optimal value for row `i`
   * @throws IllegalArgumentException unless `0 <= i < n`
   */
  public dualRow(i: number): number {
    this.validate(i);
    return this.px[i];
  }

  /**
   * Returns the dual optimal value for the specified column.
   *
   * @param   j the column index
   * @return  the dual optimal value for column `j`
   * @throws IllegalArgumentException unless `0 <= j < n`
   */
  public dualCol(j: number): number {
    this.validate(j);
    return this.py[j];
  }

  /**
   * Returns the column associated with the specified row in the optimal solution.
   *
   * @param   i the row index
   * @return  the column matched to row `i` in the optimal solution
   * @throws IllegalArgumentException unless `0 <= i < n`
   */
  public sol(i: number): number {
    this.validate(i);
    return this.xy[i];
  }

  /**
   * Returns the total weight of the optimal solution
   *
   * @return  the total weight of the optimal solution
   */
  public weight(): number {
    let total = 0.0;
    for (let i = 0; i < this.n; i++) {
      {
        if (this.xy[i] !== AssignmentProblem.UNMATCHED)
          total += this.__weight[i][this.xy[i]];
      }
    }
    return total;
  }

  private validate(i: number) {
    if (i < 0 || i >= this.n)
      throw new Error(`index is not between 0 and ${this.n - 1}: ${i}`);
  }

  /**
   *
   * The code below is solely for testing correctness of the data type.
   * @return
   * @private
   */
  private isDualFeasible(): boolean {
    for (let i = 0; i < this.n; i++) {
      {
        for (let j = 0; j < this.n; j++) {
          {
            if (this.reducedCost(i, j) < 0) {
              StdOut.println$java_lang_Object(
                'Dual variables are not feasible'
              );
              return false;
            }
          }
        }
      }
    }
    return true;
  }

  private isComplementarySlack(): boolean {
    for (let i = 0; i < this.n; i++) {
      {
        if (
          this.xy[i] !== AssignmentProblem.UNMATCHED &&
          this.reducedCost(i, this.xy[i]) !== 0
        ) {
          StdOut.println$java_lang_Object(
            'Primal and dual variables are not complementary slack'
          );
          return false;
        }
      }
    }
    return true;
  }

  private isPerfectMatching(): boolean {
    const perm: boolean[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(this.n);
    for (let i = 0; i < this.n; i++) {
      {
        if (perm[this.xy[i]]) {
          StdOut.println$java_lang_Object('Not a perfect matching');
          return false;
        }
        perm[this.xy[i]] = true;
      }
    }
    for (let j = 0; j < this.n; j++) {
      {
        if (this.xy[this.yx[j]] !== j) {
          StdOut.println$java_lang_Object('xy[] and yx[] are not inverses');
          return false;
        }
      }
    }
    for (let i = 0; i < this.n; i++) {
      {
        if (this.yx[this.xy[i]] !== i) {
          StdOut.println$java_lang_Object('xy[] and yx[] are not inverses');
          return false;
        }
      }
    }
    return true;
  }

  private certifySolution(): boolean {
    return (
      this.isPerfectMatching() &&
      this.isDualFeasible() &&
      this.isComplementarySlack()
    );
  }

  /**
   * Unit tests the `AssignmentProblem` data type.
   * Takes a command-line argument n; creates a random n-by-n matrix;
   * solves the n-by-n assignment problem; and prints the optimal
   * solution.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const n: number = parseInt(args[0]);
    const weight: number[][] = <any>(function(dims) {
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
      {
        for (let j = 0; j < n; j++) {
          {
            weight[i][j] = StdRandom.uniform$int(900) + 100;
          }
        }
      }
    }
    const assignment: AssignmentProblem = new AssignmentProblem(weight);
    StdOut.printf('weight = %.0f\n', assignment.weight());
    StdOut.println();
    if (n >= 20) return;
    for (let i = 0; i < n; i++) {
      {
        for (let j = 0; j < n; j++) {
          {
            if (j === assignment.sol(i)) StdOut.printf('*%.0f ', weight[i][j]);
            else StdOut.printf(' %.0f ', weight[i][j]);
          }
        }
        StdOut.println();
      }
    }
  }
}
AssignmentProblem.__class = 'edu.princeton.cs.algs4.AssignmentProblem';

AssignmentProblem.main(null);
