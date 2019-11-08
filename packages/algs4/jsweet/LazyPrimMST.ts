import { Queue } from './Queue';
import { Edge } from './Edge';
import { MinPQ } from './MinPQ';
import { EdgeWeightedGraph } from './EdgeWeightedGraph';
import { UF } from './UF';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Compute a minimum spanning tree (or forest) of an edge-weighted graph.
 * @param {EdgeWeightedGraph} G the edge-weighted graph
 * @class
 * @author Robert Sedgewick
 */
export class LazyPrimMST {
  static FLOATING_POINT_EPSILON = 1.0e-12;

  private __weight: number;

  private mst: Queue<Edge>;

  private marked: boolean[];

  private pq: MinPQ<Edge>;

  public constructor(G: EdgeWeightedGraph) {
    if (this.__weight === undefined) this.__weight = 0;
    if (this.mst === undefined) this.mst = null;
    if (this.marked === undefined) this.marked = null;
    if (this.pq === undefined) this.pq = null;
    this.mst = <any>new Queue<Edge>();
    this.pq = <any>new MinPQ<Edge>();
    this.marked = (s => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) this.prim(G, v);
    }
  }

  private prim(G: EdgeWeightedGraph, s: number) {
    this.scan(G, s);
    while (!this.pq.isEmpty()) {
      {
        const e: Edge = this.pq.delMin();
        const v: number = e.either();
        const w: number = e.other(v);
        if (this.marked[v] && this.marked[w]) continue;
        this.mst.enqueue(e);
        this.__weight += e.weight();
        if (!this.marked[v]) this.scan(G, v);
        if (!this.marked[w]) this.scan(G, w);
      }
    }
  }

  private scan(G: EdgeWeightedGraph, v: number) {
    this.marked[v] = true;
    for (let index303 = G.adj(v).iterator(); index303.hasNext(); ) {
      const e = index303.next();
      if (!this.marked[e.other(v)]) this.pq.insert(e);
    }
  }

  /**
   * Returns the edges in a minimum spanning tree (or forest).
   * @return  the edges in a minimum spanning tree (or forest) as
   * an iterable of edges
   */
  public edges(): Iterable<Edge> {
    return this.mst;
  }

  /**
   * Returns the sum of the edge weights in a minimum spanning tree (or forest).
   * @return  the sum of the edge weights in a minimum spanning tree (or forest)
   */
  public weight(): number {
    return this.__weight;
  }

  private check(G: EdgeWeightedGraph): boolean {
    let totalWeight = 0.0;
    for (let index304 = this.edges().iterator(); index304.hasNext(); ) {
      const e = index304.next();
      {
        totalWeight += e.weight();
      }
    }
    if (
      Math.abs(totalWeight - this.weight()) > LazyPrimMST.FLOATING_POINT_EPSILON
    ) {
      console.error('Weight of edges does not equal weight(): %f vs. %f\n');
      return false;
    }
    let uf: UF = new UF(G.V());
    for (let index305 = this.edges().iterator(); index305.hasNext(); ) {
      const e = index305.next();
      {
        const v: number = e.either();
        const w: number = e.other(v);
        if (uf.connected(v, w)) {
          console.error('Not a forest');
          return false;
        }
        uf.union(v, w);
      }
    }
    for (let index306 = G.edges().iterator(); index306.hasNext(); ) {
      const e = index306.next();
      {
        const v: number = e.either();
        const w: number = e.other(v);
        if (!uf.connected(v, w)) {
          console.error('Not a spanning forest');
          return false;
        }
      }
    }
    for (let index307 = this.edges().iterator(); index307.hasNext(); ) {
      const e = index307.next();
      {
        uf = new UF(G.V());
        for (let index308 = this.mst.iterator(); index308.hasNext(); ) {
          const f = index308.next();
          {
            const x: number = f.either();
            const y: number = f.other(x);
            if (f !== e) uf.union(x, y);
          }
        }
        for (let index309 = G.edges().iterator(); index309.hasNext(); ) {
          const f = index309.next();
          {
            const x: number = f.either();
            const y: number = f.other(x);
            if (!uf.connected(x, y)) {
              if (f.weight() < e.weight()) {
                console.error(`Edge ${f} violates cut optimality conditions`);
                return false;
              }
            }
          }
        }
      }
    }
    return true;
  }

  /**
   * Unit tests the {@code LazyPrimMST} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: EdgeWeightedGraph = new EdgeWeightedGraph(__in);
    const mst: LazyPrimMST = new LazyPrimMST(G);
    for (let index310 = mst.edges().iterator(); index310.hasNext(); ) {
      const e = index310.next();
      {
        StdOut.println$java_lang_Object(e);
      }
    }
    StdOut.printf('%.5f\n', mst.weight());
  }
}
LazyPrimMST.__class = 'edu.princeton.cs.algs4.LazyPrimMST';

LazyPrimMST.main(null);
