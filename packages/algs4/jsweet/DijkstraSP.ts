import { DirectedEdge } from './DirectedEdge';
import { IndexMinPQ } from './IndexMinPQ';
import { EdgeWeightedDigraph } from './EdgeWeightedDigraph';
import { Stack } from './Stack';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Computes a shortest-paths tree from the source vertex `s` to every other
 * vertex in the edge-weighted digraph `G`.
 *
 * @param  {EdgeWeightedDigraph} G the edge-weighted digraph
 * @param   s the source vertex
 * @throws IllegalArgumentException if an edge weight is negative
 * @throws IllegalArgumentException unless `0 <= s < V`
 * @class
 * @author Robert Sedgewick
 */
export class DijkstraSP {
  private __distTo: number[];

  private edgeTo: DirectedEdge[];

  private pq: IndexMinPQ<number>;

  public constructor(G: EdgeWeightedDigraph, s: number) {
    if (this.__distTo === undefined) this.__distTo = null;
    if (this.edgeTo === undefined) this.edgeTo = null;
    if (this.pq === undefined) this.pq = null;
    for (let index201 = G.edges().iterator(); index201.hasNext(); ) {
      const e = index201.next();
      {
        if (e.weight() < 0) throw new Error(`edge ${e} has negative weight`);
      }
    }
    this.__distTo = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(G.V());
    this.edgeTo = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(G.V());
    this.validateVertex(s);
    for (let v = 0; v < G.V(); v++) {
      this.__distTo[v] = Number.POSITIVE_INFINITY;
    }
    this.__distTo[s] = 0.0;
    this.pq = <any>new IndexMinPQ<number>(G.V());
    this.pq.insert(s, this.__distTo[s]);
    while (!this.pq.isEmpty()) {
      {
        const v: number = this.pq.delMin();
        for (let index202 = G.adj(v).iterator(); index202.hasNext(); ) {
          const e = index202.next();
          this.relax(e);
        }
      }
    }
  }

  private relax(e: DirectedEdge) {
    const v: number = e.from();
    const w: number = e.to();
    if (this.__distTo[w] > this.__distTo[v] + e.weight()) {
      this.__distTo[w] = this.__distTo[v] + e.weight();
      this.edgeTo[w] = e;
      if (this.pq.contains(w)) this.pq.decreaseKey(w, this.__distTo[w]);
      else this.pq.insert(w, this.__distTo[w]);
    }
  }

  /**
   * Returns the length of a shortest path from the source vertex `s` to vertex `v`.
   * @param   v the destination vertex
   * @return  the length of a shortest path from the source vertex `s` to vertex `v`;
   * `Double.POSITIVE_INFINITY` if no such path
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public distTo(v: number): number {
    this.validateVertex(v);
    return this.__distTo[v];
  }

  /**
   * Returns true if there is a path from the source vertex `s` to vertex `v`.
   *
   * @param   v the destination vertex
   * @return  `true` if there is a path from the source vertex
   * `s` to vertex `v`; `false` otherwise
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public hasPathTo(v: number): boolean {
    this.validateVertex(v);
    return this.__distTo[v] < Number.POSITIVE_INFINITY;
  }

  /**
   * Returns a shortest path from the source vertex `s` to vertex `v`.
   *
   * @param   v the destination vertex
   * @return  a shortest path from the source vertex `s` to vertex `v`
   * as an iterable of edges, and `null` if no such path
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public pathTo(v: number): Iterable<DirectedEdge> {
    this.validateVertex(v);
    if (!this.hasPathTo(v)) return null;
    const path: Stack<DirectedEdge> = <any>new Stack<DirectedEdge>();
    for (
      let e: DirectedEdge = this.edgeTo[v];
      e != null;
      e = this.edgeTo[e.from()]
    ) {
      {
        path.push(e);
      }
    }
    return path;
  }

  private check(G: EdgeWeightedDigraph, s: number): boolean {
    for (let index203 = G.edges().iterator(); index203.hasNext(); ) {
      const e = index203.next();
      {
        if (e.weight() < 0) {
          console.error('negative edge weight detected');
          return false;
        }
      }
    }
    if (this.__distTo[s] !== 0.0 || this.edgeTo[s] != null) {
      console.error('distTo[s] and edgeTo[s] inconsistent');
      return false;
    }
    for (let v = 0; v < G.V(); v++) {
      {
        if (v === s) continue;
        if (
          this.edgeTo[v] == null &&
          this.__distTo[v] !== Number.POSITIVE_INFINITY
        ) {
          console.error('distTo[] and edgeTo[] inconsistent');
          return false;
        }
      }
    }
    for (let v = 0; v < G.V(); v++) {
      {
        for (let index204 = G.adj(v).iterator(); index204.hasNext(); ) {
          const e = index204.next();
          {
            const w: number = e.to();
            if (this.__distTo[v] + e.weight() < this.__distTo[w]) {
              console.error(`edge ${e} not relaxed`);
              return false;
            }
          }
        }
      }
    }
    for (let w = 0; w < G.V(); w++) {
      {
        if (this.edgeTo[w] == null) continue;
        const e: DirectedEdge = this.edgeTo[w];
        const v: number = e.from();
        if (w !== e.to()) return false;
        if (this.__distTo[v] + e.weight() !== this.__distTo[w]) {
          console.error(`edge ${e} on shortest path not tight`);
          return false;
        }
      }
    }
    return true;
  }

  private validateVertex(v: number) {
    const V: number = this.__distTo.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the `DijkstraSP` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: EdgeWeightedDigraph = new EdgeWeightedDigraph(__in);
    const s: number = parseInt(args[1]);
    const sp: DijkstraSP = new DijkstraSP(G, s);
    for (let t = 0; t < G.V(); t++) {
      {
        if (sp.hasPathTo(t)) {
          StdOut.printf('%d to %d (%.2f)  ', s, t, sp.distTo(t));
          for (let index205 = sp.pathTo(t).iterator(); index205.hasNext(); ) {
            const e = index205.next();
            {
              StdOut.print$java_lang_Object(`${e}   `);
            }
          }
          StdOut.println();
        } else {
          StdOut.printf('%d to %d         no path\n', s, t);
        }
      }
    }
  }
}
DijkstraSP.__class = 'edu.princeton.cs.algs4.DijkstraSP';

DijkstraSP.main(null);
