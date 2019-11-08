import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty union�Cfind data structure with {@code n} sites
 * {@code 0} through {@code n-1}. Each site is initially in its own
 * component.
 *
 * @param  {number} n the number of sites
 * @throws IllegalArgumentException if {@code n < 0}
 * @class
 * @author Robert Sedgewick
 */
export class UF {
  private parent: number[];

  private rank: number[];

  private __count: number;

  public constructor(n: number) {
    if (this.parent === undefined) this.parent = null;
    if (this.rank === undefined) this.rank = null;
    if (this.__count === undefined) this.__count = 0;
    if (n < 0) throw new Error();
    this.__count = n;
    this.parent = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    this.rank = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      {
        this.parent[i] = i;
        this.rank[i] = 0;
      }
    }
  }

  /**
   * Returns the component identifier for the component containing site {@code p}.
   *
   * @param  {number} p the integer representing one site
   * @return  the component identifier for the component containing site {@code p}
   * @throws IllegalArgumentException unless {@code 0 <= p < n}
   */
  public find(p: number): number {
    this.validate(p);
    while (p !== this.parent[p]) {
      {
        this.parent[p] = this.parent[this.parent[p]];
        p = this.parent[p];
      }
    }
    return p;
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
   * Returns true if the the two sites are in the same component.
   *
   * @param  {number} p the integer representing one site
   * @param  {number} q the integer representing the other site
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
   * @param  {number} p the integer representing one site
   * @param  {number} q the integer representing the other site
   * @throws IllegalArgumentException unless
   * both {@code 0 <= p < n} and {@code 0 <= q < n}
   */
  public union(p: number, q: number) {
    const rootP: number = this.find(p);
    const rootQ: number = this.find(q);
    if (rootP === rootQ) return;
    if (this.rank[rootP] < this.rank[rootQ]) this.parent[rootP] = rootQ;
    else if (this.rank[rootP] > this.rank[rootQ]) this.parent[rootQ] = rootP;
    else {
      this.parent[rootQ] = rootP;
      this.rank[rootP]++;
    }
    this.__count--;
  }

  private validate(p: number) {
    const n: number = this.parent.length;
    if (p < 0 || p >= n) {
      throw new Error(`index ${p} is not between 0 and ${n - 1}`);
    }
  }

  /**
   * Reads in a an integer {@code n} and a sequence of pairs of integers
   * (between {@code 0} and {@code n-1}) from standard input, where each integer
   * in the pair represents some site;
   * if the sites are in different components, merge the two components
   * and print the pair to standard output.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const n: number = StdIn.readInt();
    const uf: UF = new UF(n);
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
UF.__class = 'edu.princeton.cs.algs4.UF';

UF.main(null);
