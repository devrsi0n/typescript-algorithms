import { Queue } from './Queue';
import { Edge } from './Edge';
import { EdgeWeightedGraph } from './EdgeWeightedGraph';
import { MinPQ } from './MinPQ';
import { UF } from './UF';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Compute a minimum spanning tree (or forest) of an edge-weighted graph.
 * @param {EdgeWeightedGraph} G the edge-weighted graph
 * @class
 * @author Robert Sedgewick
 */
export class KruskalMST {
  static FLOATING_POINT_EPSILON = 1.0e-12;

  private __weight: number;

  private mst: Queue<Edge> = <any>new Queue<Edge>();

  public constructor(G: EdgeWeightedGraph) {
    if (this.__weight === undefined) this.__weight = 0;
    const pq: MinPQ<Edge> = <any>new MinPQ<Edge>();
    for (let index295 = G.edges().iterator(); index295.hasNext(); ) {
      const e = index295.next();
      {
        pq.insert(e);
      }
    }
    const uf: UF = new UF(G.V());
    while (!pq.isEmpty() && this.mst.size() < G.V() - 1) {
      {
        const e: Edge = pq.delMin();
        const v: number = e.either();
        const w: number = e.other(v);
        if (!uf.connected(v, w)) {
          uf.union(v, w);
          this.mst.enqueue(e);
          this.__weight += e.weight();
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
    let total = 0.0;
    for (let index296 = this.edges().iterator(); index296.hasNext(); ) {
      const e = index296.next();
      {
        total += e.weight();
      }
    }
    if (Math.abs(total - this.weight()) > KruskalMST.FLOATING_POINT_EPSILON) {
      console.error('Weight of edges does not equal weight(): %f vs. %f\n');
      return false;
    }
    let uf: UF = new UF(G.V());
    for (let index297 = this.edges().iterator(); index297.hasNext(); ) {
      const e = index297.next();
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
    for (let index298 = G.edges().iterator(); index298.hasNext(); ) {
      const e = index298.next();
      {
        const v: number = e.either();
        const w: number = e.other(v);
        if (!uf.connected(v, w)) {
          console.error('Not a spanning forest');
          return false;
        }
      }
    }
    for (let index299 = this.edges().iterator(); index299.hasNext(); ) {
      const e = index299.next();
      {
        uf = new UF(G.V());
        for (let index300 = this.mst.iterator(); index300.hasNext(); ) {
          const f = index300.next();
          {
            const x: number = f.either();
            const y: number = f.other(x);
            if (f !== e) uf.union(x, y);
          }
        }
        for (let index301 = G.edges().iterator(); index301.hasNext(); ) {
          const f = index301.next();
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
   * Unit tests the `KruskalMST` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const __in: In = new In(args[0]);
    const G: EdgeWeightedGraph = new EdgeWeightedGraph(__in);
    const mst: KruskalMST = new KruskalMST(G);
    for (let index302 = mst.edges().iterator(); index302.hasNext(); ) {
      const e = index302.next();
      {
        StdOut.println$java_lang_Object(e);
      }
    }
    StdOut.printf('%.5f\n', mst.weight());
  }
}
KruskalMST.__class = 'edu.princeton.cs.algs4.KruskalMST';

KruskalMST.main(null);
