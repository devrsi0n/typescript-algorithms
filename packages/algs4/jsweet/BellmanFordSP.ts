import { DirectedEdge } from './DirectedEdge';
import { Queue } from './Queue';
import { EdgeWeightedDigraph } from './EdgeWeightedDigraph';
import { EdgeWeightedDirectedCycle } from './EdgeWeightedDirectedCycle';
import { Stack } from './Stack';
import { StdOut } from './StdOut';
import { In } from './In';

/**
 * Computes a shortest paths tree from `s` to every other vertex in
 * the edge-weighted digraph `G`.
 * @param {EdgeWeightedDigraph} G the acyclic digraph
 * @param  s the source vertex
 * @throws IllegalArgumentException unless `0 <= s < V`
 * @class
 * @author Robert Sedgewick
 */
export class BellmanFordSP {
  private __distTo: number[];

  private edgeTo: DirectedEdge[];

  private onQueue: boolean[];

  private queue: Queue<number>;

  private cost: number;

  private cycle: Iterable<DirectedEdge>;

  public constructor(G: EdgeWeightedDigraph, s: number) {
    if (this.__distTo === undefined) this.__distTo = null;
    if (this.edgeTo === undefined) this.edgeTo = null;
    if (this.onQueue === undefined) this.onQueue = null;
    if (this.queue === undefined) this.queue = null;
    if (this.cost === undefined) this.cost = 0;
    if (this.cycle === undefined) this.cycle = null;
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
    this.onQueue = ((s) => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      this.__distTo[v] = Number.POSITIVE_INFINITY;
    }
    this.__distTo[s] = 0.0;
    this.queue = <any>new Queue<number>();
    this.queue.enqueue(s);
    this.onQueue[s] = true;
    while (!this.queue.isEmpty() && !this.hasNegativeCycle()) {
      {
        const v: number = this.queue.dequeue();
        this.onQueue[v] = false;
        this.relax(G, v);
      }
    }
  }

  private relax(G: EdgeWeightedDigraph, v: number) {
    for (let index133 = G.adj(v).iterator(); index133.hasNext(); ) {
      const e = index133.next();
      {
        const w: number = e.to();
        if (this.__distTo[w] > this.__distTo[v] + e.weight()) {
          this.__distTo[w] = this.__distTo[v] + e.weight();
          this.edgeTo[w] = e;
          if (!this.onQueue[w]) {
            this.queue.enqueue(w);
            this.onQueue[w] = true;
          }
        }
        if (++this.cost % G.V() === 0) {
          this.findNegativeCycle();
          if (this.hasNegativeCycle()) return;
        }
      }
    }
  }

  /**
   * Is there a negative cycle reachable from the source vertex `s`?
   * @return  `true` if there is a negative cycle reachable from the
   * source vertex `s`, and `false` otherwise
   */
  public hasNegativeCycle(): boolean {
    return this.cycle != null;
  }

  /**
   * Returns a negative cycle reachable from the source vertex `s`, or `null`
   * if there is no such cycle.
   * @return  a negative cycle reachable from the soruce vertex `s`
   * as an iterable of edges, and `null` if there is no such cycle
   */
  public negativeCycle(): Iterable<DirectedEdge> {
    return this.cycle;
  }

  private findNegativeCycle() {
    const V: number = this.edgeTo.length;
    const spt: EdgeWeightedDigraph = new EdgeWeightedDigraph(V);
    for (let v = 0; v < V; v++) {
      if (this.edgeTo[v] != null) spt.addEdge(this.edgeTo[v]);
    }
    const finder: EdgeWeightedDirectedCycle = new EdgeWeightedDirectedCycle(
      spt
    );
    this.cycle = finder.cycle();
  }

  /**
   * Returns the length of a shortest path from the source vertex `s` to vertex `v`.
   * @param   v the destination vertex
   * @return  the length of a shortest path from the source vertex `s` to vertex `v`;
   * `Double.POSITIVE_INFINITY` if no such path
   * @throws UnsupportedOperationException if there is a negative cost cycle reachable
   * from the source vertex `s`
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public distTo(v: number): number {
    this.validateVertex(v);
    if (this.hasNegativeCycle()) throw new Error('Negative cost cycle exists');
    return this.__distTo[v];
  }

  /**
   * Is there a path from the source `s` to vertex `v`?
   * @param   v the destination vertex
   * @return  `true` if there is a path from the source vertex
   * `s` to vertex `v`, and `false` otherwise
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public hasPathTo(v: number): boolean {
    this.validateVertex(v);
    return this.__distTo[v] < Number.POSITIVE_INFINITY;
  }

  /**
   * Returns a shortest path from the source `s` to vertex `v`.
   * @param   v the destination vertex
   * @return  a shortest path from the source `s` to vertex `v`
   * as an iterable of edges, and `null` if no such path
   * @throws UnsupportedOperationException if there is a negative cost cycle reachable
   * from the source vertex `s`
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public pathTo(v: number): Iterable<DirectedEdge> {
    this.validateVertex(v);
    if (this.hasNegativeCycle())
      throw new java.lang.UnsupportedOperationException(
        'Negative cost cycle exists'
      );
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
    if (this.hasNegativeCycle()) {
      let weight = 0.0;
      for (
        let index134 = this.negativeCycle().iterator();
        index134.hasNext();

      ) {
        const e = index134.next();
        {
          weight += e.weight();
        }
      }
      if (weight >= 0.0) {
        console.error(`error: weight of negative cycle = ${weight}`);
        return false;
      }
    } else {
      if (this.__distTo[s] !== 0.0 || this.edgeTo[s] != null) {
        console.error('distanceTo[s] and edgeTo[s] inconsistent');
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
          for (let index135 = G.adj(v).iterator(); index135.hasNext(); ) {
            const e = index135.next();
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
    }
    StdOut.println$java_lang_Object('Satisfies optimality conditions');
    StdOut.println();
    return true;
  }

  private validateVertex(v: number) {
    const V: number = this.__distTo.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the `BellmanFordSP` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const s: number = parseInt(args[1]);
    const G: EdgeWeightedDigraph = new EdgeWeightedDigraph(__in);
    const sp: BellmanFordSP = new BellmanFordSP(G, s);
    if (sp.hasNegativeCycle()) {
      for (let index136 = sp.negativeCycle().iterator(); index136.hasNext(); ) {
        const e = index136.next();
        StdOut.println$java_lang_Object(e);
      }
    } else {
      for (let v = 0; v < G.V(); v++) {
        {
          if (sp.hasPathTo(v)) {
            StdOut.printf('%d to %d (%5.2f)  ', s, v, sp.distTo(v));
            for (let index137 = sp.pathTo(v).iterator(); index137.hasNext(); ) {
              const e = index137.next();
              {
                StdOut.print$java_lang_Object(`${e}   `);
              }
            }
            StdOut.println();
          } else {
            StdOut.printf('%d to %d           no path\n', s, v);
          }
        }
      }
    }
  }
}
BellmanFordSP.__class = 'edu.princeton.cs.algs4.BellmanFordSP';

BellmanFordSP.main(null);
