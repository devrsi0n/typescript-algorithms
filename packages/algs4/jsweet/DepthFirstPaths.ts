import { Graph } from './Graph';
import { Stack } from './Stack';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Computes a path between {@code s} and every other vertex in graph {@code G}.
 * @param {Graph} G the graph
 * @param {number} s the source vertex
 * @throws IllegalArgumentException unless {@code 0 <= s < V}
 * @class
 * @author Robert Sedgewick
 */
export class DepthFirstPaths {
  private marked: boolean[];

  private edgeTo: number[];

  private s: number;

  public constructor(G: Graph, s: number) {
    if (this.marked === undefined) this.marked = null;
    if (this.edgeTo === undefined) this.edgeTo = null;
    if (this.s === undefined) this.s = 0;
    this.s = s;
    this.edgeTo = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(G.V());
    this.marked = (s => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    this.validateVertex(s);
    this.dfs(G, s);
  }

  private dfs(G: Graph, v: number) {
    this.marked[v] = true;
    for (let index193 = G.adj(v).iterator(); index193.hasNext(); ) {
      const w = index193.next();
      {
        if (!this.marked[w]) {
          this.edgeTo[w] = v;
          this.dfs(G, w);
        }
      }
    }
  }

  /**
   * Is there a path between the source vertex {@code s} and vertex {@code v}?
   * @param {number} v the vertex
   * @return  {@code true} if there is a path, {@code false} otherwise
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public hasPathTo(v: number): boolean {
    this.validateVertex(v);
    return this.marked[v];
  }

  /**
   * Returns a path between the source vertex {@code s} and vertex {@code v}, or
   * {@code null} if no such path.
   * @param  {number} v the vertex
   * @return  the sequence of vertices on a path between the source vertex
   * {@code s} and vertex {@code v}, as an Iterable
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
   * Unit tests the {@code DepthFirstPaths} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Graph = new Graph(__in);
    const s: number = parseInt(args[1]);
    const dfs: DepthFirstPaths = new DepthFirstPaths(G, s);
    for (let v = 0; v < G.V(); v++) {
      {
        if (dfs.hasPathTo(v)) {
          StdOut.printf('%d to %d:  ', s, v);
          for (let index194 = dfs.pathTo(v).iterator(); index194.hasNext(); ) {
            const x = index194.next();
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
DepthFirstPaths.__class = 'edu.princeton.cs.algs4.DepthFirstPaths';

DepthFirstPaths.main(null);
