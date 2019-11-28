import StdIn from '../StdIn';
import StdOut from '../StdOut';

/**
 *  The `UF` class represents a <em>union–find data type</em>
 *  (also known as the <em>disjoint-sets data type</em>).
 *  It supports the <em>union</em> and <em>find</em> operations,
 *  along with a <em>connected</em> operation for determining whether
 *  two sites are in the same component and a <em>count</em> operation that
 *  returns the total number of components.
 *  <p>
 *  The union–find data type models connectivity among a set of <em>n</em>
 *  sites, named 0 through <em>n</em>–1.
 *  The <em>is-connected-to</em> relation must be an
 *  <em>equivalence relation</em>:
 *  <ul>
 *  <li> <em>Reflexive</em>: <em>p</em> is connected to <em>p</em>.
 *  <li> <em>Symmetric</em>: If <em>p</em> is connected to <em>q</em>,
 *       then <em>q</em> is connected to <em>p</em>.
 *  <li> <em>Transitive</em>: If <em>p</em> is connected to <em>q</em>
 *       and <em>q</em> is connected to <em>r</em>, then
 *       <em>p</em> is connected to <em>r</em>.
 *  </ul>
 *  <p>
 *  An equivalence relation partitions the sites into
 *  <em>equivalence classes</em> (or <em>components</em>). In this case,
 *  two sites are in the same component if and only if they are connected.
 *  Both sites and components are identified with integers between 0 and
 *  <em>n</em>–1.
 *  Initially, there are <em>n</em> components, with each site in its
 *  own component.  The <em>component identifier</em> of a component
 *  (also known as the <em>root</em>, <em>canonical element</em>, <em>leader</em>,
 *  or <em>set representative</em>) is one of the sites in the component:
 *  two sites have the same component identifier if and only if they are
 *  in the same component.
 *  <ul>
 *  <li><em>union</em>(<em>p</em>, <em>q</em>) adds a
 *      connection between the two sites <em>p</em> and <em>q</em>.
 *      If <em>p</em> and <em>q</em> are in different components,
 *      then it replaces
 *      these two components with a new component that is the union of
 *      the two.
 *  <li><em>find</em>(<em>p</em>) returns the component
 *      identifier of the component containing <em>p</em>.
 *  <li><em>connected</em>(<em>p</em>, <em>q</em>)
 *      returns true if both <em>p</em> and <em>q</em>
 *      are in the same component, and false otherwise.
 *  <li><em>count</em>() returns the number of components.
 *  </ul>
 *  <p>
 *  The component identifier of a component can change
 *  only when the component itself changes during a call to
 *  <em>union</em>—it cannot change during a call
 *  to <em>find</em>, <em>connected</em>, or <em>count</em>.
 *  <p>
 *  This implementation uses weighted quick union by rank with path compression
 *  by halving.
 *  Initializing a data structure with <em>n</em> sites takes linear time.
 *  Afterwards, the <em>union</em>, <em>find</em>, and <em>connected</em>
 *  operations take logarithmic time (in the worst case) and the
 *  <em>count</em> operation takes constant time.
 *  Moreover, the amortized time per <em>union</em>, <em>find</em>,
 *  and <em>connected</em> operation has inverse Ackermann complexity.
 *  For alternate implementations of the same API, see
 *  {@link QuickUnionUF}, {@link QuickFindUF}, and {@link WeightedQuickUnionUF}.
 *
 *  <p>
 *  For additional documentation, see <a href="https://algs4.cs.princeton.edu/15uf">Section 1.5</a> of
 *  <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export default class UF {
  private parent: number[];

  private rank: number[];

  private _count: number;

  public constructor(n: number) {
    if (!n || typeof n !== 'number' || n < 0) {
      throw new Error(`IllegalArgumentException: ${n}`);
    }
    this._count = n;
    this.parent = new Array(n).fill(0);
    this.rank = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  /**
   * Returns the component identifier for the component containing site `p`.
   *
   * @param   p the integer representing one site
   * @return  the component identifier for the component containing site `p`
   * @throws IllegalArgumentException unless `0 <= p < n`
   */
  public find(p: number): number {
    this.validate(p);
    while (p !== this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }
    return p;
  }

  /**
   * Returns the number of components.
   *
   * @return  the number of components (between `1` and `n`)
   */
  public count(): number {
    return this._count;
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
    if (this.rank[rootP] < this.rank[rootQ]) this.parent[rootP] = rootQ;
    else if (this.rank[rootP] > this.rank[rootQ]) this.parent[rootQ] = rootP;
    else {
      this.parent[rootQ] = rootP;
      this.rank[rootP]++;
    }
    this._count--;
  }

  private validate(p: number) {
    const n: number = this.parent.length;
    if (p < 0 || p >= n) {
      throw new Error(`index ${p} is not between 0 and ${n - 1}`);
    }
  }

  /**
   * Reads in a an integer `n` and a sequence of pairs of integers
   * (between `0` and `n-1`) from standard input, where each integer
   * in the pair represents some site;
   * if the sites are in different components, merge the two components
   * and print the pair to standard output.
   *
   * @param  args the command-line arguments
   */
  public static async main(/* args: string[] */) {
    const n: number = await StdIn.readInt();
    const uf: UF = new UF(n);
    while (!StdIn.isEmpty()) {
      /* eslint-disable no-await-in-loop */
      const p: number = await StdIn.readInt();
      const q: number = await StdIn.readInt();
      if (uf.connected(p, q)) {
        continue;
      }
      uf.union(p, q);
      StdOut.println(`${p} ${q}`);
    }
    StdOut.println(`${uf.count()} components`);
  }
}
