import { Bag } from './Bag';
import { Edge } from './Edge';
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
export class BoruvkaMST {
  static FLOATING_POINT_EPSILON = 1.0e-12;

  private mst: Bag<Edge> = <any>new Bag<Edge>();

  private __weight: number;

  public constructor(G: EdgeWeightedGraph) {
    if (this.__weight === undefined) this.__weight = 0;
    const uf: UF = new UF(G.V());
    for (let t = 1; t < G.V() && this.mst.size() < G.V() - 1; t += t) {
      {
        const closest: Edge[] = ((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(G.V());
        for (let index152 = G.edges().iterator(); index152.hasNext(); ) {
          const e = index152.next();
          {
            const v: number = e.either();
            const w: number = e.other(v);
            const i: number = uf.find(v);
            const j: number = uf.find(w);
            if (i === j) continue;
            if (closest[i] == null || BoruvkaMST.less(e, closest[i]))
              closest[i] = e;
            if (closest[j] == null || BoruvkaMST.less(e, closest[j]))
              closest[j] = e;
          }
        }
        for (let i = 0; i < G.V(); i++) {
          {
            const e: Edge = closest[i];
            if (e != null) {
              const v: number = e.either();
              const w: number = e.other(v);
              if (!uf.connected(v, w)) {
                this.mst.add(e);
                this.__weight += e.weight();
                uf.union(v, w);
              }
            }
          }
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

  private static less(e: Edge, f: Edge): boolean {
    return e.weight() < f.weight();
  }

  private check(G: EdgeWeightedGraph): boolean {
    let totalWeight = 0.0;
    for (let index153 = this.edges().iterator(); index153.hasNext(); ) {
      const e = index153.next();
      {
        totalWeight += e.weight();
      }
    }
    if (
      Math.abs(totalWeight - this.weight()) > BoruvkaMST.FLOATING_POINT_EPSILON
    ) {
      console.error('Weight of edges does not equal weight(): %f vs. %f\n');
      return false;
    }
    let uf: UF = new UF(G.V());
    for (let index154 = this.edges().iterator(); index154.hasNext(); ) {
      const e = index154.next();
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
    for (let index155 = G.edges().iterator(); index155.hasNext(); ) {
      const e = index155.next();
      {
        const v: number = e.either();
        const w: number = e.other(v);
        if (!uf.connected(v, w)) {
          console.error('Not a spanning forest');
          return false;
        }
      }
    }
    for (let index156 = this.edges().iterator(); index156.hasNext(); ) {
      const e = index156.next();
      {
        uf = new UF(G.V());
        for (let index157 = this.mst.iterator(); index157.hasNext(); ) {
          const f = index157.next();
          {
            const x: number = f.either();
            const y: number = f.other(x);
            if (f !== e) uf.union(x, y);
          }
        }
        for (let index158 = G.edges().iterator(); index158.hasNext(); ) {
          const f = index158.next();
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
   * Unit tests the `BoruvkaMST` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: EdgeWeightedGraph = new EdgeWeightedGraph(__in);
    const mst: BoruvkaMST = new BoruvkaMST(G);
    for (let index159 = mst.edges().iterator(); index159.hasNext(); ) {
      const e = index159.next();
      {
        StdOut.println$java_lang_Object(e);
      }
    }
    StdOut.printf('%.5f\n', mst.weight());
  }
}
BoruvkaMST.__class = 'edu.princeton.cs.algs4.BoruvkaMST';

BoruvkaMST.main(null);
