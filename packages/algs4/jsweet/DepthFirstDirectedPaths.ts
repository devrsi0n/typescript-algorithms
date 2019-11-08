import { Digraph } from './Digraph';
import { Stack } from './Stack';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Computes a directed path from {@code s} to every other vertex in digraph {@code G}.
 * @param  {Digraph} G the digraph
 * @param   s the source vertex
 * @throws IllegalArgumentException unless {@code 0 <= s < V}
 * @class
 * @author Robert Sedgewick
 */
export class DepthFirstDirectedPaths {
  private marked: boolean[];

  private edgeTo: number[];

  private s: number;

  public constructor(G: Digraph, s: number) {
    if (this.marked === undefined) this.marked = null;
    if (this.edgeTo === undefined) this.edgeTo = null;
    if (this.s === undefined) this.s = 0;
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
    this.s = s;
    this.validateVertex(s);
    this.dfs(G, s);
  }

  private dfs(G: Digraph, v: number) {
    this.marked[v] = true;
    for (let index183 = G.adj(v).iterator(); index183.hasNext(); ) {
      const w = index183.next();
      {
        if (!this.marked[w]) {
          this.edgeTo[w] = v;
          this.dfs(G, w);
        }
      }
    }
  }

  /**
   * Is there a directed path from the source vertex {@code s} to vertex {@code v}?
   * @param   v the vertex
   * @return  {@code true} if there is a directed path from the source
   * vertex {@code s} to vertex {@code v}, {@code false} otherwise
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public hasPathTo(v: number): boolean {
    this.validateVertex(v);
    return this.marked[v];
  }

  /**
   * Returns a directed path from the source vertex {@code s} to vertex {@code v}, or
   * {@code null} if no such path.
   * @param   v the vertex
   * @return  the sequence of vertices on a directed path from the source vertex
   * {@code s} to vertex {@code v}, as an Iterable
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public pathTo(v: number): Iterable<number> {
    this.validateVertex(v);
    if (!this.hasPathTo(v)) return null;
    const path: Stack<number> = <any>new Stack<number>();
    for (let x: number = v; x !== this.s; x = this.edgeTo[x]) {
      path.push(x);
    }
    path.push(this.s);
    return path;
  }

  private validateVertex(v: number) {
    const V: number = this.marked.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the {@code DepthFirstDirectedPaths} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Digraph = new Digraph(__in);
    const s: number = parseInt(args[1]);
    const dfs: DepthFirstDirectedPaths = new DepthFirstDirectedPaths(G, s);
    for (let v = 0; v < G.V(); v++) {
      {
        if (dfs.hasPathTo(v)) {
          StdOut.printf('%d to %d:  ', s, v);
          for (let index184 = dfs.pathTo(v).iterator(); index184.hasNext(); ) {
            const x = index184.next();
            {
              if (x === s) StdOut.print$int(x);
              else StdOut.print$java_lang_Object(`-${x}`);
            }
          }
          StdOut.println();
        } else {
          StdOut.printf('%d to %d:  not connected\n', s, v);
        }
      }
    }
  }
}
DepthFirstDirectedPaths.__class =
  'edu.princeton.cs.algs4.DepthFirstDirectedPaths';

DepthFirstDirectedPaths.main(null);
