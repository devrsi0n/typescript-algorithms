import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty union�Cfind data structure with {@code n} sites
 * {@code 0} through {@code n-1}. Each site is initially in its own
 * component.
 *
 * @param   n the number of sites
 * @throws IllegalArgumentException if {@code n < 0}
 * @class
 * @author Robert Sedgewick
 */
export class WeightedQuickUnionUF {
  private parent: number[];

  private size: number[];

  private __count: number;

  public constructor(n: number) {
    if (this.parent === undefined) this.parent = null;
    if (this.size === undefined) this.size = null;
    if (this.__count === undefined) this.__count = 0;
    this.__count = n;
    this.parent = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    this.size = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        this.parent[i] = i;
        this.size[i] = 1;
      }
    }
  }

  /**
   * Returns the number of components.
   *
   * @return  the number of components (between {@code 1} and {@code n})
   */
  public count(): number {
    return this.__count;
  }

  /**
   * Returns the component identifier for the component containing site {@code p}.
   *
   * @param   p the integer representing one object
   * @return  the component identifier for the component containing site {@code p}
   * @throws IllegalArgumentException unless {@code 0 <= p < n}
   */
  public find(p: number): number {
    this.validate(p);
    while (p !== this.parent[p]) {
      p = this.parent[p];
    }
    return p;
  }

  private validate(p: number) {
    const n: number = this.parent.length;
    if (p < 0 || p >= n) {
      throw new Error(`index ${p} is not between 0 and ${n - 1}`);
    }
  }

  /**
   * Returns true if the the two sites are in the same component.
   *
   * @param   p the integer representing one site
   * @param   q the integer representing the other site
   * @return  {@code true} if the two sites {@code p} and {@code q} are in the same component;
   * {@code false} otherwise
   * @throws IllegalArgumentException unless
   * both {@code 0 <= p < n} and {@code 0 <= q < n}
   */
  public connected(p: number, q: number): boolean {
    return this.find(p) === this.find(q);
  }

  /**
   * Merges the component containing site {@code p} with the
   * the component containing site {@code q}.
   *
   * @param   p the integer representing one site
   * @param   q the integer representing the other site
   * @throws IllegalArgumentException unless
   * both {@code 0 <= p < n} and {@code 0 <= q < n}
   */
  public union(p: number, q: number) {
    const rootP: number = this.find(p);
    const rootQ: number = this.find(q);
    if (rootP === rootQ) return;
    if (this.size[rootP] < this.size[rootQ]) {
      this.parent[rootP] = rootQ;
      this.size[rootQ] += this.size[rootP];
    } else {
      this.parent[rootQ] = rootP;
      this.size[rootP] += this.size[rootQ];
    }
    this.__count--;
  }

  /**
   * Reads in a sequence of pairs of integers (between 0 and n-1) from standard input,
   * where each integer represents some object;
   * if the sites are in different components, merge the two components
   * and print the pair to standard output.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const n: number = StdIn.readInt();
    const uf: WeightedQuickUnionUF = new WeightedQuickUnionUF(n);
    while (!StdIn.isEmpty()) {
      {
        const p: number = StdIn.readInt();
        const q: number = StdIn.readInt();
        if (uf.connected(p, q)) continue;
        uf.union(p, q);
        StdOut.println$java_lang_Object(`${p} ${q}`);
      }
    }
    StdOut.println$java_lang_Object(`${uf.count()} components`);
  }
}
WeightedQuickUnionUF.__class = 'edu.princeton.cs.algs4.WeightedQuickUnionUF';

const __Function = Function;

WeightedQuickUnionUF.main(null);
