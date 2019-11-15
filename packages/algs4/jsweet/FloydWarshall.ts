import { DirectedEdge } from './DirectedEdge';
import { AdjMatrixEdgeWeightedDigraph } from './AdjMatrixEdgeWeightedDigraph';
import { EdgeWeightedDigraph } from './EdgeWeightedDigraph';
import { EdgeWeightedDirectedCycle } from './EdgeWeightedDirectedCycle';
import { Stack } from './Stack';
import { StdRandom } from './StdRandom';
import { StdOut } from './StdOut';

/**
 * Computes a shortest paths tree from each vertex to to every other vertex in
 * the edge-weighted digraph `G`. If no such shortest path exists for
 * some pair of vertices, it computes a negative cycle.
 * @param {AdjMatrixEdgeWeightedDigraph} G the edge-weighted digraph
 * @class
 * @author Robert Sedgewick
 */
export class FloydWarshall {
  private __hasNegativeCycle: boolean;

  private distTo: number[][];

  private edgeTo: DirectedEdge[][];

  public constructor(G: AdjMatrixEdgeWeightedDigraph) {
    if (this.__hasNegativeCycle === undefined) this.__hasNegativeCycle = false;
    if (this.distTo === undefined) this.distTo = null;
    if (this.edgeTo === undefined) this.edgeTo = null;
    const V: number = G.V();
    this.distTo = <any>(function(dims) {
      const allocate = function(dims) {
        if (dims.length == 0) {
          return 0;
        }
        const array = [];
        for (let i = 0; i < dims[0]; i++) {
          array.push(allocate(dims.slice(1)));
        }
        return array;
      };
      return allocate(dims);
    })([V, V]);
    this.edgeTo = <any>(function(dims) {
      const allocate = function(dims) {
        if (dims.length == 0) {
          return null;
        }
        const array = [];
        for (let i = 0; i < dims[0]; i++) {
          array.push(allocate(dims.slice(1)));
        }
        return array;
      };
      return allocate(dims);
    })([V, V]);
    for (let v = 0; v < V; v++) {
      {
        for (let w = 0; w < V; w++) {
          {
            this.distTo[v][w] = Number.POSITIVE_INFINITY;
          }
        }
      }
    }
    for (let v = 0; v < G.V(); v++) {
      {
        for (let index261 = G.adj(v).iterator(); index261.hasNext(); ) {
          const e = index261.next();
          {
            this.distTo[e.from()][e.to()] = e.weight();
            this.edgeTo[e.from()][e.to()] = e;
          }
        }
        if (this.distTo[v][v] >= 0.0) {
          this.distTo[v][v] = 0.0;
          this.edgeTo[v][v] = null;
        }
      }
    }
    for (let i = 0; i < V; i++) {
      {
        for (let v = 0; v < V; v++) {
          {
            if (this.edgeTo[v][i] == null) continue;
            for (let w = 0; w < V; w++) {
              {
                if (this.distTo[v][w] > this.distTo[v][i] + this.distTo[i][w]) {
                  this.distTo[v][w] = this.distTo[v][i] + this.distTo[i][w];
                  this.edgeTo[v][w] = this.edgeTo[i][w];
                }
              }
            }
            if (this.distTo[v][v] < 0.0) {
              this.__hasNegativeCycle = true;
              return;
            }
          }
        }
      }
    }
  }

  /**
   * Is there a negative cycle?
   * @return  `true` if there is a negative cycle, and `false` otherwise
   */
  public hasNegativeCycle(): boolean {
    return this.__hasNegativeCycle;
  }

  /**
   * Returns a negative cycle, or `null` if there is no such cycle.
   * @return  a negative cycle as an iterable of edges,
   * or `null` if there is no such cycle
   */
  public negativeCycle(): Iterable<DirectedEdge> {
    for (let v = 0; v < this.distTo.length; v++) {
      {
        if (this.distTo[v][v] < 0.0) {
          const V: number = this.edgeTo.length;
          const spt: EdgeWeightedDigraph = new EdgeWeightedDigraph(V);
          for (let w = 0; w < V; w++) {
            if (this.edgeTo[v][w] != null) spt.addEdge(this.edgeTo[v][w]);
          }
          const finder: EdgeWeightedDirectedCycle = new EdgeWeightedDirectedCycle(
            spt
          );
          return finder.cycle();
        }
      }
    }
    return null;
  }

  /**
   * Is there a path from the vertex `s` to vertex `t`?
   * @param   s the source vertex
   * @param   t the destination vertex
   * @return  `true` if there is a path from vertex `s`
   * to vertex `t`, and `false` otherwise
   * @throws IllegalArgumentException unless `0 <= s < V`
   * @throws IllegalArgumentException unless `0 <= t < V`
   */
  public hasPath(s: number, t: number): boolean {
    this.validateVertex(s);
    this.validateVertex(t);
    return this.distTo[s][t] < Number.POSITIVE_INFINITY;
  }

  /**
   * Returns the length of a shortest path from vertex `s` to vertex `t`.
   * @param   s the source vertex
   * @param   t the destination vertex
   * @return  the length of a shortest path from vertex `s` to vertex `t`;
   * `Double.POSITIVE_INFINITY` if no such path
   * @throws UnsupportedOperationException if there is a negative cost cycle
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public dist(s: number, t: number): number {
    this.validateVertex(s);
    this.validateVertex(t);
    if (this.hasNegativeCycle()) throw new Error('Negative cost cycle exists');
    return this.distTo[s][t];
  }

  /**
   * Returns a shortest path from vertex `s` to vertex `t`.
   * @param   s the source vertex
   * @param   t the destination vertex
   * @return  a shortest path from vertex `s` to vertex `t`
   * as an iterable of edges, and `null` if no such path
   * @throws UnsupportedOperationException if there is a negative cost cycle
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public path(s: number, t: number): Iterable<DirectedEdge> {
    this.validateVertex(s);
    this.validateVertex(t);
    if (this.hasNegativeCycle()) throw new Error('Negative cost cycle exists');
    if (!this.hasPath(s, t)) return null;
    const path: Stack<DirectedEdge> = <any>new Stack<DirectedEdge>();
    for (
      let e: DirectedEdge = this.edgeTo[s][t];
      e != null;
      e = this.edgeTo[s][e.from()]
    ) {
      {
        path.push(e);
      }
    }
    return path;
  }

  private check(G: AdjMatrixEdgeWeightedDigraph): boolean {
    if (!this.hasNegativeCycle()) {
      for (let v = 0; v < G.V(); v++) {
        {
          for (let index262 = G.adj(v).iterator(); index262.hasNext(); ) {
            const e = index262.next();
            {
              const w: number = e.to();
              for (let i = 0; i < G.V(); i++) {
                {
                  if (this.distTo[i][w] > this.distTo[i][v] + e.weight()) {
                    console.error(`edge ${e} is eligible`);
                    return false;
                  }
                }
              }
            }
          }
        }
      }
    }
    return true;
  }

  private validateVertex(v: number) {
    const V: number = this.distTo.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the `FloydWarshall` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const V: number = parseInt(args[0]);
    const E: number = parseInt(args[1]);
    const G: AdjMatrixEdgeWeightedDigraph = new AdjMatrixEdgeWeightedDigraph(V);
    for (let i = 0; i < E; i++) {
      {
        const v: number = StdRandom.uniform$int(V);
        const w: number = StdRandom.uniform$int(V);
        const weight: number =
          Math.round(100 * (StdRandom.uniform() - 0.15)) / 100.0;
        if (v === w) G.addEdge(new DirectedEdge(v, w, Math.abs(weight)));
        else G.addEdge(new DirectedEdge(v, w, weight));
      }
    }
    StdOut.println$java_lang_Object(G);
    const spt: FloydWarshall = new FloydWarshall(G);
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
    if (spt.hasNegativeCycle()) {
      StdOut.println$java_lang_Object('Negative cost cycle:');
      for (
        let index263 = spt.negativeCycle().iterator();
        index263.hasNext();

      ) {
        const e = index263.next();
        StdOut.println$java_lang_Object(e);
      }
      StdOut.println();
    } else {
      for (let v = 0; v < G.V(); v++) {
        {
          for (let w = 0; w < G.V(); w++) {
            {
              if (spt.hasPath(v, w)) {
                StdOut.printf('%d to %d (%5.2f)  ', v, w, spt.dist(v, w));
                for (
                  let index264 = spt.path(v, w).iterator();
                  index264.hasNext();

                ) {
                  const e = index264.next();
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
}
FloydWarshall.__class = 'edu.princeton.cs.algs4.FloydWarshall';

FloydWarshall.main(null);
