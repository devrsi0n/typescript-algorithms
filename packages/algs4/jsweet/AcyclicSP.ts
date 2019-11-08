import { DirectedEdge } from './DirectedEdge';
import { EdgeWeightedDigraph } from './EdgeWeightedDigraph';
import { Topological } from './Topological';
import { Stack } from './Stack';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Computes a shortest paths tree from {@code s} to every other vertex in
 * the directed acyclic graph {@code G}.
 * @param {EdgeWeightedDigraph} G the acyclic digraph
 * @param {number} s the source vertex
 * @throws IllegalArgumentException if the digraph is not acyclic
 * @throws IllegalArgumentException unless {@code 0 <= s < V}
 * @class
 * @author Robert Sedgewick
 */
export class AcyclicSP {
  private __distTo: number[];

  private edgeTo: DirectedEdge[];

  public constructor(G: EdgeWeightedDigraph, s: number) {
    if (this.__distTo === undefined) this.__distTo = null;
    if (this.edgeTo === undefined) this.edgeTo = null;
    this.__distTo = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(G.V());
    this.edgeTo = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(G.V());
    this.validateVertex(s);
    for (let v = 0; v < G.V(); v++) {
      this.__distTo[v] = Number.POSITIVE_INFINITY;
    }
    this.__distTo[s] = 0.0;
    const topological: Topological = new Topological(G);
    if (!topological.hasOrder()) throw new Error('Digraph is not acyclic.');
    for (let index124 = topological.order().iterator(); index124.hasNext(); ) {
      const v = index124.next();
      {
        for (let index125 = G.adj(v).iterator(); index125.hasNext(); ) {
          const e = index125.next();
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
    }
  }

  /**
   * Returns the length of a shortest path from the source vertex {@code s} to vertex {@code v}.
   * @param  {number} v the destination vertex
   * @return  the length of a shortest path from the source vertex {@code s} to vertex {@code v};
   * {@code Double.POSITIVE_INFINITY} if no such path
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public distTo(v: number): number {
    this.validateVertex(v);
    return this.__distTo[v];
  }

  /**
   * Is there a path from the source vertex {@code s} to vertex {@code v}?
   * @param  {number} v the destination vertex
   * @return  {@code true} if there is a path from the source vertex
   * {@code s} to vertex {@code v}, and {@code false} otherwise
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public hasPathTo(v: number): boolean {
    this.validateVertex(v);
    return this.__distTo[v] < Number.POSITIVE_INFINITY;
  }

  /**
   * Returns a shortest path from the source vertex {@code s} to vertex {@code v}.
   * @param  {number} v the destination vertex
   * @return  a shortest path from the source vertex {@code s} to vertex {@code v}
   * as an iterable of edges, and {@code null} if no such path
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
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

  private validateVertex(v: number) {
    const V: number = this.__distTo.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the {@code AcyclicSP} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const s: number = parseInt(args[1]);
    const G: EdgeWeightedDigraph = new EdgeWeightedDigraph(__in);
    const sp: AcyclicSP = new AcyclicSP(G, s);
    for (let v = 0; v < G.V(); v++) {
      {
        if (sp.hasPathTo(v)) {
          StdOut.printf('%d to %d (%.2f)  ', s, v, sp.distTo(v));
          for (let index126 = sp.pathTo(v).iterator(); index126.hasNext(); ) {
            const e = index126.next();
            {
              StdOut.print$java_lang_Object(`${e}   `);
            }
          }
          StdOut.println();
        } else {
          StdOut.printf('%d to %d         no path\n', s, v);
        }
      }
    }
  }
}
AcyclicSP.__class = 'edu.princeton.cs.algs4.AcyclicSP';

AcyclicSP.main(null);
