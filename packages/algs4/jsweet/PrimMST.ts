import { Edge } from './Edge';
import { IndexMinPQ } from './IndexMinPQ';
import { EdgeWeightedGraph } from './EdgeWeightedGraph';
import { Queue } from './Queue';
import { UF } from './UF';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Compute a minimum spanning tree (or forest) of an edge-weighted graph.
 * @param {EdgeWeightedGraph} G the edge-weighted graph
 * @class
 * @author Robert Sedgewick
 */
export class PrimMST {
  static FLOATING_POINT_EPSILON = 1.0e-12;

  private edgeTo: Edge[];

  private distTo: number[];

  private marked: boolean[];

  private pq: IndexMinPQ<number>;

  public constructor(G: EdgeWeightedGraph) {
    if (this.edgeTo === undefined) this.edgeTo = null;
    if (this.distTo === undefined) this.distTo = null;
    if (this.marked === undefined) this.marked = null;
    if (this.pq === undefined) this.pq = null;
    this.edgeTo = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(G.V());
    this.distTo = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(G.V());
    this.marked = (s => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    this.pq = <any>new IndexMinPQ<number>(G.V());
    for (let v = 0; v < G.V(); v++) {
      this.distTo[v] = Number.POSITIVE_INFINITY;
    }
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) this.prim(G, v);
    }
  }

  private prim(G: EdgeWeightedGraph, s: number) {
    this.distTo[s] = 0.0;
    this.pq.insert(s, this.distTo[s]);
    while (!this.pq.isEmpty()) {
      {
        const v: number = this.pq.delMin();
        this.scan(G, v);
      }
    }
  }

  private scan(G: EdgeWeightedGraph, v: number) {
    this.marked[v] = true;
    for (let index326 = G.adj(v).iterator(); index326.hasNext(); ) {
      const e = index326.next();
      {
        const w: number = e.other(v);
        if (this.marked[w]) continue;
        if (e.weight() < this.distTo[w]) {
          this.distTo[w] = e.weight();
          this.edgeTo[w] = e;
          if (this.pq.contains(w)) this.pq.decreaseKey(w, this.distTo[w]);
          else this.pq.insert(w, this.distTo[w]);
        }
      }
    }
  }

  /**
   * Returns the edges in a minimum spanning tree (or forest).
   * @return  the edges in a minimum spanning tree (or forest) as
   * an iterable of edges
   */
  public edges(): Iterable<Edge> {
    const mst: Queue<Edge> = <any>new Queue<Edge>();
    for (let v = 0; v < this.edgeTo.length; v++) {
      {
        const e: Edge = this.edgeTo[v];
        if (e != null) {
          mst.enqueue(e);
        }
      }
    }
    return mst;
  }

  /**
   * Returns the sum of the edge weights in a minimum spanning tree (or forest).
   * @return  the sum of the edge weights in a minimum spanning tree (or forest)
   */
  public weight(): number {
    let weight = 0.0;
    for (let index327 = this.edges().iterator(); index327.hasNext(); ) {
      const e = index327.next();
      weight += e.weight();
    }
    return weight;
  }

  private check(G: EdgeWeightedGraph): boolean {
    let totalWeight = 0.0;
    for (let index328 = this.edges().iterator(); index328.hasNext(); ) {
      const e = index328.next();
      {
        totalWeight += e.weight();
      }
    }
    if (
      Math.abs(totalWeight - this.weight()) > PrimMST.FLOATING_POINT_EPSILON
    ) {
      console.error('Weight of edges does not equal weight(): %f vs. %f\n');
      return false;
    }
    let uf: UF = new UF(G.V());
    for (let index329 = this.edges().iterator(); index329.hasNext(); ) {
      const e = index329.next();
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
    for (let index330 = G.edges().iterator(); index330.hasNext(); ) {
      const e = index330.next();
      {
        const v: number = e.either();
        const w: number = e.other(v);
        if (!uf.connected(v, w)) {
          console.error('Not a spanning forest');
          return false;
        }
      }
    }
    for (let index331 = this.edges().iterator(); index331.hasNext(); ) {
      const e = index331.next();
      {
        uf = new UF(G.V());
        for (let index332 = this.edges().iterator(); index332.hasNext(); ) {
          const f = index332.next();
          {
            const x: number = f.either();
            const y: number = f.other(x);
            if (f !== e) uf.union(x, y);
          }
        }
        for (let index333 = G.edges().iterator(); index333.hasNext(); ) {
          const f = index333.next();
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
   * Unit tests the {@code PrimMST} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: EdgeWeightedGraph = new EdgeWeightedGraph(__in);
    const mst: PrimMST = new PrimMST(G);
    for (let index334 = mst.edges().iterator(); index334.hasNext(); ) {
      const e = index334.next();
      {
        StdOut.println$java_lang_Object(e);
      }
    }
    StdOut.printf('%.5f\n', mst.weight());
  }
}
PrimMST.__class = 'edu.princeton.cs.algs4.PrimMST';

PrimMST.main(null);
