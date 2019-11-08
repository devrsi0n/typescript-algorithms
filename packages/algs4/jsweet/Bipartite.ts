import { Stack } from './Stack';
import { Graph } from './Graph';
import { GraphGenerator } from './GraphGenerator';
import { StdRandom } from './StdRandom';
import { StdOut } from './StdOut';

/**
 * Determines whether an undirected graph is bipartite and finds either a
 * bipartition or an odd-length cycle.
 *
 * @param  {Graph} G the graph
 * @class
 * @author Robert Sedgewick
 */
export class Bipartite {
  private __isBipartite: boolean;

  private __color: boolean[];

  private marked: boolean[];

  private edgeTo: number[];

  private cycle: Stack<number>;

  public constructor(G: Graph) {
    if (this.__isBipartite === undefined) this.__isBipartite = false;
    if (this.__color === undefined) this.__color = null;
    if (this.marked === undefined) this.marked = null;
    if (this.edgeTo === undefined) this.edgeTo = null;
    if (this.cycle === undefined) this.cycle = null;
    this.__isBipartite = true;
    this.__color = (s => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    this.marked = (s => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    this.edgeTo = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      {
        if (!this.marked[v]) {
          this.dfs(G, v);
        }
      }
    }
  }

  private dfs(G: Graph, v: number) {
    this.marked[v] = true;
    for (let index141 = G.adj(v).iterator(); index141.hasNext(); ) {
      const w = index141.next();
      {
        if (this.cycle != null) return;
        if (!this.marked[w]) {
          this.edgeTo[w] = v;
          this.__color[w] = !this.__color[v];
          this.dfs(G, w);
        } else if (this.__color[w] === this.__color[v]) {
          this.__isBipartite = false;
          this.cycle = <any>new Stack<number>();
          this.cycle.push(w);
          for (let x: number = v; x !== w; x = this.edgeTo[x]) {
            {
              this.cycle.push(x);
            }
          }
          this.cycle.push(w);
        }
      }
    }
  }

  /**
   * Returns true if the graph is bipartite.
   *
   * @return  {@code true} if the graph is bipartite; {@code false} otherwise
   */
  public isBipartite(): boolean {
    return this.__isBipartite;
  }

  /**
   * Returns the side of the bipartite that vertex {@code v} is on.
   *
   * @param   v the vertex
   * @return  the side of the bipartition that vertex {@code v} is on; two vertices
   * are in the same side of the bipartition if and only if they have the
   * same color
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   * @throws UnsupportedOperationException if this method is called when the graph
   * is not bipartite
   */
  public color(v: number): boolean {
    this.validateVertex(v);
    if (!this.__isBipartite)
      throw new java.lang.UnsupportedOperationException(
        'graph is not bipartite'
      );
    return this.__color[v];
  }

  /**
   * Returns an odd-length cycle if the graph is not bipartite, and
   * {@code null} otherwise.
   *
   * @return  an odd-length cycle if the graph is not bipartite
   * (and hence has an odd-length cycle), and {@code null}
   * otherwise
   */
  public oddCycle(): Iterable<number> {
    return this.cycle;
  }

  private check(G: Graph): boolean {
    if (this.__isBipartite) {
      for (let v = 0; v < G.V(); v++) {
        {
          for (let index142 = G.adj(v).iterator(); index142.hasNext(); ) {
            const w = index142.next();
            {
              if (this.__color[v] === this.__color[w]) {
                console.error(
                  'edge %d-%d with %d and %d in same side of bipartition\n'
                );
                return false;
              }
            }
          }
        }
      }
    } else {
      let first = -1;
      let last = -1;
      for (let index143 = this.oddCycle().iterator(); index143.hasNext(); ) {
        const v = index143.next();
        {
          if (first === -1) first = v;
          last = v;
        }
      }
      if (first !== last) {
        console.error('cycle begins with %d and ends with %d\n');
        return false;
      }
    }
    return true;
  }

  private validateVertex(v: number) {
    const V: number = this.marked.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the {@code Bipartite} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const V1: number = parseInt(args[0]);
    const V2: number = parseInt(args[1]);
    const E: number = parseInt(args[2]);
    const F: number = parseInt(args[3]);
    const G: Graph = GraphGenerator.bipartite$int$int$int(V1, V2, E);
    for (let i = 0; i < F; i++) {
      {
        const v: number = StdRandom.uniform$int(V1 + V2);
        const w: number = StdRandom.uniform$int(V1 + V2);
        G.addEdge(v, w);
      }
    }
    StdOut.println$java_lang_Object(G);
    const b: Bipartite = new Bipartite(G);
    if (b.isBipartite()) {
      StdOut.println$java_lang_Object('Graph is bipartite');
      for (let v = 0; v < G.V(); v++) {
        {
          StdOut.println$java_lang_Object(`${v}: ${b.color(v)}`);
        }
      }
    } else {
      StdOut.print$java_lang_Object('Graph has an odd-length cycle: ');
      for (let index144 = b.oddCycle().iterator(); index144.hasNext(); ) {
        const x = index144.next();
        {
          StdOut.print$java_lang_Object(`${x} `);
        }
      }
      StdOut.println();
    }
  }
}
Bipartite.__class = 'edu.princeton.cs.algs4.Bipartite';

Bipartite.main(null);
