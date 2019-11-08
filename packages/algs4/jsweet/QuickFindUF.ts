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
export class QuickFindUF {
  private id: number[];

  private __count: number;

  public constructor(n: number) {
    if (this.id === undefined) this.id = null;
    if (this.__count === undefined) this.__count = 0;
    this.__count = n;
    this.id = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      this.id[i] = i;
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
   * @param  {number} p the integer representing one site
   * @return  the component identifier for the component containing site {@code p}
   * @throws IllegalArgumentException unless {@code 0 <= p < n}
   */
  public find(p: number): number {
    this.validate(p);
    return this.id[p];
  }

  private validate(p: number) {
    const n: number = this.id.length;
    if (p < 0 || p >= n) {
      throw new Error(`index ${p} is not between 0 and ${n - 1}`);
    }
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
    this.validate(p);
    this.validate(q);
    return this.id[p] === this.id[q];
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
    this.validate(p);
    this.validate(q);
    const pID: number = this.id[p];
    const qID: number = this.id[q];
    if (pID === qID) return;
    for (let i = 0; i < this.id.length; i++) {
      if (this.id[i] === pID) this.id[i] = qID;
    }
    this.__count--;
  }

  /**
   * Reads in a sequence of pairs of integers (between 0 and n-1) from standard input,
   * where each integer represents some site;
   * if the sites are in different components, merge the two components
   * and print the pair to standard output.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const n: number = StdIn.readInt();
    const uf: QuickFindUF = new QuickFindUF(n);
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
QuickFindUF.__class = 'edu.princeton.cs.algs4.QuickFindUF';

QuickFindUF.main(null);
