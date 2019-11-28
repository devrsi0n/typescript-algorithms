import StdIn from '../StdIn';
import StdOut from '../StdOut';

/**
 *  The `QuickUnionUF` class represents a <em>union–find data type</em>
 *  (also known as the <em>disjoint-sets data type</em>).
 *  It supports the classic <em>union</em> and <em>find</em> operations,
 *  along with a <em>count</em> operation that returns the total number
 *  of sets.
 *  <p>
 *  The union-find data type models a collection of sets containing
 *  <em>n</em> elements, with each element in exactly one set.
 *  The elements are named 0 through <em>n</em>–1.
 *  Initially, there are <em>n</em> sets, with each element in its
 *  own set. The <em>cannonical elemement</em> of a set
 *  (also known as the <em>root</em>, <em>identifier</em>,
 *  <em>leader</em>, or <em>set representative</em>)
 *  is one distinguished element in the set. Here is a summary of
 *  the operations:
 *  <ul>
 *  <li><em>find</em>(<em>p</em>) returns the canonical element
 *      of the set containing <em>p</em>. The <em>find</em> operation
 *      returns the same value for two elements if and only if
 *      they are in the same set.
 *  <li><em>union</em>(<em>p</em>, <em>q</em>) merges the set
 *      containing element <em>p</em> with the set containing
 *      element <em>q</em>. That is, if <em>p</em> and <em>q</em>
 *      are in different sets, replace these two sets
 *      with a new set that is the union of the two.
 *  <li><em>count</em>() returns the number of sets.
 *  </ul>
 *  <p>
 *  The canonical element of a set can change only when the set
 *  itself changes during a call to <em>union</em>&mdash;it cannot
 *  change during a call to either <em>find</em> or <em>count</em>.
 *  <p>
 *  This implementation uses <em>quick union</em>.
 *  The constructor takes &Theta;(<em>n</em>) time, where
 *  <em>n</em> is the number of sites.
 *  The <em>union</em> and <em>find</em> operations take
 *  &Theta;(<em>n</em>) time in the worst case.
 *  The <em>count</em> operation takes &Theta;(1) time.
 *  <p>
 *  For alternative implementations of the same API, see
 *  {@link UF}, {@link QuickFindUF}, and {@link WeightedQuickUnionUF}.
 *  For additional documentation,
 *  see <a href="https://algs4.cs.princeton.edu/15uf">Section 1.5</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export default class QuickUnionUF {
  private parent: number[];

  private __count: number;

  public constructor(n: number) {
    this.parent = new Array(n);
    this.__count = n;
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
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
  public static async main(/* args: string[] */) {
    const n: number = await StdIn.readInt();
    const uf: QuickUnionUF = new QuickUnionUF(n);
    while (!StdIn.isEmpty()) {
      const p: number = await StdIn.readInt();
      const q: number = await StdIn.readInt();
      if (uf.connected(p, q)) continue;
      uf.union(p, q);
      StdOut.println(`${p} ${q}`);
    }
    StdOut.println(`${uf.count()} components`);
  }
}
