import { Digraph } from './Digraph';
import { DepthFirstOrder } from './DepthFirstOrder';
import { TransitiveClosure } from './TransitiveClosure';
import { In } from './In';
import { StdOut } from './StdOut';
import { Queue } from './Queue';

/**
 * Computes the strong components of the digraph `G`.
 * @param {Digraph} G the digraph
 * @class
 * @author Robert Sedgewick
 */
export class KosarajuSharirSCC {
  private marked: boolean[];

  private __id: number[];

  private __count: number;

  public constructor(G: Digraph) {
    if (this.marked === undefined) this.marked = null;
    if (this.__id === undefined) this.__id = null;
    if (this.__count === undefined) this.__count = 0;
    const dfs: DepthFirstOrder = new DepthFirstOrder(G.reverse());
    this.marked = ((s) => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    this.__id = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(G.V());
    for (let index292 = dfs.reversePost().iterator(); index292.hasNext(); ) {
      const v = index292.next();
      {
        if (!this.marked[v]) {
          this.dfs(G, v);
          this.__count++;
        }
      }
    }
  }

  private dfs(G: Digraph, v: number) {
    this.marked[v] = true;
    this.__id[v] = this.__count;
    for (let index293 = G.adj(v).iterator(); index293.hasNext(); ) {
      const w = index293.next();
      {
        if (!this.marked[w]) this.dfs(G, w);
      }
    }
  }

  /**
   * Returns the number of strong components.
   * @return  the number of strong components
   */
  public count(): number {
    return this.__count;
  }

  /**
   * Are vertices `v` and `w` in the same strong component?
   * @param   v one vertex
   * @param   w the other vertex
   * @return  `true` if vertices `v` and `w` are in the same
   * strong component, and `false` otherwise
   * @throws IllegalArgumentException unless `0 <= v < V`
   * @throws IllegalArgumentException unless `0 <= w < V`
   */
  public stronglyConnected(v: number, w: number): boolean {
    this.validateVertex(v);
    this.validateVertex(w);
    return this.__id[v] === this.__id[w];
  }

  /**
   * Returns the component id of the strong component containing vertex `v`.
   * @param   v the vertex
   * @return  the component id of the strong component containing vertex `v`
   * @throws IllegalArgumentException unless `0 <= s < V`
   */
  public id(v: number): number {
    this.validateVertex(v);
    return this.__id[v];
  }

  private check(G: Digraph): boolean {
    const tc: TransitiveClosure = new TransitiveClosure(G);
    for (let v = 0; v < G.V(); v++) {
      {
        for (let w = 0; w < G.V(); w++) {
          {
            if (
              this.stronglyConnected(v, w) !==
              (tc.reachable(v, w) && tc.reachable(w, v))
            )
              return false;
          }
        }
      }
    }
    return true;
  }

  private validateVertex(v: number) {
    const V: number = this.marked.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the `KosarajuSharirSCC` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const __in: In = new In(args[0]);
    const G: Digraph = new Digraph(__in);
    const scc: KosarajuSharirSCC = new KosarajuSharirSCC(G);
    const m: number = scc.count();
    StdOut.println$java_lang_Object(`${m} strong components`);
    const components: Queue<number>[] = <Queue<number>[]>((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(m);
    for (let i = 0; i < m; i++) {
      {
        components[i] = <any>new Queue<number>();
      }
    }
    for (let v = 0; v < G.V(); v++) {
      {
        components[scc.id(v)].enqueue(v);
      }
    }
    for (let i = 0; i < m; i++) {
      {
        for (let index294 = components[i].iterator(); index294.hasNext(); ) {
          const v = index294.next();
          {
            StdOut.print$java_lang_Object(`${v} `);
          }
        }
        StdOut.println();
      }
    }
  }
}
KosarajuSharirSCC.__class = 'edu.princeton.cs.algs4.KosarajuSharirSCC';

KosarajuSharirSCC.main(null);
