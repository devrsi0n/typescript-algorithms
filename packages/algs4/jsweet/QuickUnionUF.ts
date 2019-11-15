import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * Initializes an empty union�Cfind data structure with `n` sites
 * `0` through `n-1`. Each site is initially in its own
 * component.
 *
 * @param   n the number of sites
 * @throws IllegalArgumentException if `n < 0`
 * @class
 * @author Robert Sedgewick
 */
export class QuickUnionUF {
  private parent: number[];

  private __count: number;

  public constructor(n: number) {
    if (this.parent === undefined) this.parent = null;
    if (this.__count === undefined) this.__count = 0;
    this.parent = new Array(n).fill(0);
    this.__count = n;
    for (let i = 0; i < n; i++) {
      {
        this.parent[i] = i;
      }
    }
  }

  /**
   * Returns the number of components.
   *
   * @return  the number of components (between `1` and `n`)
   */
  public count(): number {
    return this.__count;
  }

  /**
   * Returns the component identifier for the component containing site `p`.
   *
   * @param   p the integer representing one object
   * @return  the component identifier for the component containing site `p`
   * @throws IllegalArgumentException unless `0 <= p < n`
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
   * @return  `true` if the two sites `p` and `q` are in the same component;
   * `false` otherwise
   * @throws IllegalArgumentException unless
   * both `0 <= p < n` and `0 <= q < n`
   */
  public connected(p: number, q: number): boolean {
    return this.find(p) === this.find(q);
  }

  /**
   * Merges the component containing site `p` with the
   * the component containing site `q`.
   *
   * @param   p the integer representing one site
   * @param   q the integer representing the other site
   * @throws IllegalArgumentException unless
   * both `0 <= p < n` and `0 <= q < n`
   */
  public union(p: number, q: number) {
    const rootP: number = this.find(p);
    const rootQ: number = this.find(q);
    if (rootP === rootQ) return;
    this.parent[rootP] = rootQ;
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
    const uf: QuickUnionUF = new QuickUnionUF(n);
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
QuickUnionUF.__class = 'edu.princeton.cs.algs4.QuickUnionUF';

QuickUnionUF.main(null);
