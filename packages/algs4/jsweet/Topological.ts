import { Digraph } from './Digraph';
import { DirectedCycle } from './DirectedCycle';
import { DepthFirstOrder } from './DepthFirstOrder';
import { EdgeWeightedDigraph } from './EdgeWeightedDigraph';
import { EdgeWeightedDirectedCycle } from './EdgeWeightedDirectedCycle';
import { SymbolDigraph } from './SymbolDigraph';
import { StdOut } from './StdOut';

/**
 * Determines whether the digraph `G` has a topological order and, if so,
 * finds such a topological order.
 * @param {Digraph} G the digraph
 * @class
 * @author Robert Sedgewick
 */
export class Topological {
  private __order: Iterable<number>;

  private __rank: number[];

  public constructor(G?: any) {
    if ((G != null && G instanceof <any>Digraph) || G === null) {
      const __args = arguments;
      if (this.__order === undefined) this.__order = null;
      if (this.__rank === undefined) this.__rank = null;
      if (this.__order === undefined) this.__order = null;
      if (this.__rank === undefined) this.__rank = null;
      (() => {
        const finder: DirectedCycle = new DirectedCycle(G);
        if (!finder.hasCycle()) {
          const dfs: DepthFirstOrder = new DepthFirstOrder(G);
          this.__order = dfs.reversePost();
          this.__rank = ((s) => {
            const a = [];
            while (s-- > 0) a.push(0);
            return a;
          })(G.V());
          let i = 0;
          for (let index366 = this.__order.iterator(); index366.hasNext(); ) {
            const v = index366.next();
            this.__rank[v] = i++;
          }
        }
      })();
    } else if (
      (G != null && G instanceof <any>EdgeWeightedDigraph) ||
      G === null
    ) {
      const __args = arguments;
      if (this.__order === undefined) this.__order = null;
      if (this.__rank === undefined) this.__rank = null;
      if (this.__order === undefined) this.__order = null;
      if (this.__rank === undefined) this.__rank = null;
      (() => {
        const finder: EdgeWeightedDirectedCycle = new EdgeWeightedDirectedCycle(
          G
        );
        if (!finder.hasCycle()) {
          const dfs: DepthFirstOrder = new DepthFirstOrder(G);
          this.__order = dfs.reversePost();
        }
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Returns a topological order if the digraph has a topologial order,
   * and `null` otherwise.
   * @return  a topological order of the vertices (as an interable) if the
   * digraph has a topological order (or equivalently, if the digraph is a DAG),
   * and `null` otherwise
   */
  public order(): Iterable<number> {
    return this.__order;
  }

  /**
   * Does the digraph have a topological order?
   * @return  `true` if the digraph has a topological order (or equivalently,
   * if the digraph is a DAG), and `false` otherwise
   */
  public hasOrder(): boolean {
    return this.__order != null;
  }

  /**
   * Does the digraph have a topological order?
   * @return  `true` if the digraph has a topological order (or equivalently,
   * if the digraph is a DAG), and `false` otherwise
   * @deprecated Replaced by {@link #hasOrder()}.
   */
  public isDAG(): boolean {
    return this.hasOrder();
  }

  /**
   * The the rank of vertex `v` in the topological order;
   * -1 if the digraph is not a DAG
   *
   * @param  v the vertex
   * @return  the position of vertex `v` in a topological order
   * of the digraph; -1 if the digraph is not a DAG
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public rank(v: number): number {
    this.validateVertex(v);
    if (this.hasOrder()) return this.__rank[v];
    return -1;
  }

  private validateVertex(v: number) {
    const V: number = this.__rank.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the `Topological` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const filename: string = args[0];
    const delimiter: string = args[1];
    const sg: SymbolDigraph = new SymbolDigraph(filename, delimiter);
    const topological: Topological = new Topological(sg.digraph());
    for (let index367 = topological.order().iterator(); index367.hasNext(); ) {
      const v = index367.next();
      {
        StdOut.println$java_lang_Object(sg.nameOf(v));
      }
    }
  }
}
Topological.__class = 'edu.princeton.cs.algs4.Topological';

Topological.main(null);
