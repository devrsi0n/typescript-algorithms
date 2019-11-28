import { Edge } from './Edge';
import { IndexMinPQ } from './IndexMinPQ';
import { EdgeWeightedGraph } from './EdgeWeightedGraph';
import { Stack } from './Stack';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Computes a shortest-paths tree from the source vertex `s` to every
 * other vertex in the edge-weighted graph `G`.
 *
 * @param  {EdgeWeightedGraph} G the edge-weighted digraph
 * @param   s the source vertex
 * @throws IllegalArgumentException if an edge weight is negative
 * @throws IllegalArgumentException unless `0 <= s < V`
 * @class
 * @author Robert Sedgewick
 */
export class DijkstraUndirectedSP {
  private __distTo: number[];

  private edgeTo: Edge[];

  private pq: IndexMinPQ<number>;

  public constructor(G: EdgeWeightedGraph, s: number) {
    if (this.__distTo === undefined) this.__distTo = null;
    if (this.edgeTo === undefined) this.edgeTo = null;
    if (this.pq === undefined) this.pq = null;
    for (let index206 = G.edges().iterator(); index206.hasNext(); ) {
      const e = index206.next();
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
        for (let index207 = G.adj(v).iterator(); index207.hasNext(); ) {
          const e = index207.next();
          this.relax(e, v);
        }
      }
    }
  }

  private relax(e: Edge, v: number) {
    const w: number = e.other(v);
    if (this.__distTo[w] > this.__distTo[v] + e.weight()) {
      this.__distTo[w] = this.__distTo[v] + e.weight();
      this.edgeTo[w] = e;
      if (this.pq.contains(w)) this.pq.decreaseKey(w, this.__distTo[w]);
      else this.pq.insert(w, this.__distTo[w]);
    }
  }

  /**
   * Returns the length of a shortest path between the source vertex `s` and
   * vertex `v`.
   *
   * @param   v the destination vertex
   * @return  the length of a shortest path between the source vertex `s` and
   * the vertex `v`; `Double.POSITIVE_INFINITY` if no such path
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public distTo(v: number): number {
    this.validateVertex(v);
    return this.__distTo[v];
  }

  /**
   * Returns true if there is a path between the source vertex `s` and
   * vertex `v`.
   *
   * @param   v the destination vertex
   * @return  `true` if there is a path between the source vertex
   * `s` to vertex `v`; `false` otherwise
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public hasPathTo(v: number): boolean {
    this.validateVertex(v);
    return this.__distTo[v] < Number.POSITIVE_INFINITY;
  }

  /**
   * Returns a shortest path between the source vertex `s` and vertex `v`.
   *
   * @param   v the destination vertex
   * @return  a shortest path between the source vertex `s` and vertex `v`;
   * `null` if no such path
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public pathTo(v: number): Iterable<Edge> {
    this.validateVertex(v);
    if (!this.hasPathTo(v)) return null;
    const path: Stack<Edge> = <any>new Stack<Edge>();
    let x: number = v;
    for (let e: Edge = this.edgeTo[v]; e != null; e = this.edgeTo[x]) {
      {
        path.push(e);
        x = e.other(x);
      }
    }
    return path;
  }

  private check(G: EdgeWeightedGraph, s: number): boolean {
    for (let index208 = G.edges().iterator(); index208.hasNext(); ) {
      const e = index208.next();
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
        for (let index209 = G.adj(v).iterator(); index209.hasNext(); ) {
          const e = index209.next();
          {
            const w: number = e.other(v);
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
        const e: Edge = this.edgeTo[w];
        if (w !== e.either() && w !== e.other(e.either())) return false;
        const v: number = e.other(w);
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
   * Unit tests the `DijkstraUndirectedSP` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const __in: In = new In(args[0]);
    const G: EdgeWeightedGraph = new EdgeWeightedGraph(__in);
    const s: number = parseInt(args[1]);
    const sp: DijkstraUndirectedSP = new DijkstraUndirectedSP(G, s);
    for (let t = 0; t < G.V(); t++) {
      {
        if (sp.hasPathTo(t)) {
          StdOut.printf('%d to %d (%.2f)  ', s, t, sp.distTo(t));
          for (let index210 = sp.pathTo(t).iterator(); index210.hasNext(); ) {
            const e = index210.next();
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
DijkstraUndirectedSP.__class = 'edu.princeton.cs.algs4.DijkstraUndirectedSP';

DijkstraUndirectedSP.main(null);
