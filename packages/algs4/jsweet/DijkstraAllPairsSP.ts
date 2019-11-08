import { DijkstraSP } from './DijkstraSP';
import { EdgeWeightedDigraph } from './EdgeWeightedDigraph';
import { DirectedEdge } from './DirectedEdge';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Computes a shortest paths tree from each vertex to to every other vertex in
 * the edge-weighted digraph {@code G}.
 * @param {EdgeWeightedDigraph} G the edge-weighted digraph
 * @throws IllegalArgumentException if an edge weight is negative
 * @throws IllegalArgumentException unless {@code 0 <= s < V}
 * @class
 * @author Robert Sedgewick
 */
export class DijkstraAllPairsSP {
  private all: DijkstraSP[];

  public constructor(G: EdgeWeightedDigraph) {
    if (this.all === undefined) this.all = null;
    this.all = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      this.all[v] = new DijkstraSP(G, v);
    }
  }

  /**
   * Returns a shortest path from vertex {@code s} to vertex {@code t}.
   * @param   s the source vertex
   * @param   t the destination vertex
   * @return  a shortest path from vertex {@code s} to vertex {@code t}
   * as an iterable of edges, and {@code null} if no such path
   * @throws IllegalArgumentException unless {@code 0 <= s < V}
   * @throws IllegalArgumentException unless {@code 0 <= t < V}
   */
  public path(s: number, t: number): Iterable<DirectedEdge> {
    this.validateVertex(s);
    this.validateVertex(t);
    return this.all[s].pathTo(t);
  }

  /**
   * Is there a path from the vertex {@code s} to vertex {@code t}?
   * @param   s the source vertex
   * @param   t the destination vertex
   * @return  {@code true} if there is a path from vertex {@code s}
   * to vertex {@code t}, and {@code false} otherwise
   * @throws IllegalArgumentException unless {@code 0 <= s < V}
   * @throws IllegalArgumentException unless {@code 0 <= t < V}
   */
  public hasPath(s: number, t: number): boolean {
    this.validateVertex(s);
    this.validateVertex(t);
    return this.dist(s, t) < Number.POSITIVE_INFINITY;
  }

  /**
   * Returns the length of a shortest path from vertex {@code s} to vertex {@code t}.
   * @param   s the source vertex
   * @param   t the destination vertex
   * @return  the length of a shortest path from vertex {@code s} to vertex {@code t};
   * {@code Double.POSITIVE_INFINITY} if no such path
   * @throws IllegalArgumentException unless {@code 0 <= s < V}
   * @throws IllegalArgumentException unless {@code 0 <= t < V}
   */
  public dist(s: number, t: number): number {
    this.validateVertex(s);
    this.validateVertex(t);
    return this.all[s].distTo(t);
  }

  private validateVertex(v: number) {
    const V: number = this.all.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the {@code DijkstraAllPairsSP} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: EdgeWeightedDigraph = new EdgeWeightedDigraph(__in);
    const spt: DijkstraAllPairsSP = new DijkstraAllPairsSP(G);
    StdOut.printf('  ');
    for (let v = 0; v < G.V(); v++) {
      {
        StdOut.printf('%6d ', v);
      }
    }
    StdOut.println();
    for (let v = 0; v < G.V(); v++) {
      {
        StdOut.printf('%3d: ', v);
        for (let w = 0; w < G.V(); w++) {
          {
            if (spt.hasPath(v, w)) StdOut.printf('%6.2f ', spt.dist(v, w));
            else StdOut.printf('  Inf ');
          }
        }
        StdOut.println();
      }
    }
    StdOut.println();
    for (let v = 0; v < G.V(); v++) {
      {
        for (let w = 0; w < G.V(); w++) {
          {
            if (spt.hasPath(v, w)) {
              StdOut.printf('%d to %d (%5.2f)  ', v, w, spt.dist(v, w));
              for (
                let index200 = spt.path(v, w).iterator();
                index200.hasNext();

              ) {
                const e = index200.next();
                StdOut.print$java_lang_Object(`${e}  `);
              }
              StdOut.println();
            } else {
              StdOut.printf('%d to %d no path\n', v, w);
            }
          }
        }
      }
    }
  }
}
DijkstraAllPairsSP.__class = 'edu.princeton.cs.algs4.DijkstraAllPairsSP';

DijkstraAllPairsSP.main(null);
