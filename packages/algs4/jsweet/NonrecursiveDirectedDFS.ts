import { Digraph } from './Digraph';
import { Stack } from './Stack';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Computes the vertices reachable from the source vertex {@code s} in the digraph {@code G}.
 * @param  {Digraph} G the digraph
 * @param  {number} s the source vertex
 * @throws IllegalArgumentException unless {@code 0 <= s < V}
 * @class
 * @author Robert Sedgewick
 */
export class NonrecursiveDirectedDFS {
  private __marked: boolean[];

  public constructor(G: Digraph, s: number) {
    if (this.__marked === undefined) this.__marked = null;
    this.__marked = (s => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    this.validateVertex(s);
    const adj: Iterator<number>[] = <Iterator<number>[]>(s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      adj[v] = G.adj(v).iterator();
    }
    const stack: Stack<number> = <any>new Stack<number>();
    this.__marked[s] = true;
    stack.push(s);
    while (!stack.isEmpty()) {
      {
        const v: number = stack.peek();
        if (adj[v].hasNext()) {
          const w: number = adj[v].next();
          if (!this.__marked[w]) {
            this.__marked[w] = true;
            stack.push(w);
          }
        } else {
          stack.pop();
        }
      }
    }
  }

  /**
   * Is vertex {@code v} reachable from the source vertex {@code s}?
   * @param  {number} v the vertex
   * @return  {@code true} if vertex {@code v} is reachable from the source vertex {@code s},
   * and {@code false} otherwise
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public marked(v: number): boolean {
    this.validateVertex(v);
    return this.__marked[v];
  }

  private validateVertex(v: number) {
    const V: number = this.__marked.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the {@code NonrecursiveDirectedDFS} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Digraph = new Digraph(__in);
    const s: number = parseInt(args[1]);
    const dfs: NonrecursiveDirectedDFS = new NonrecursiveDirectedDFS(G, s);
    for (let v = 0; v < G.V(); v++) {
      if (dfs.marked(v)) StdOut.print$java_lang_Object(`${v} `);
    }
    StdOut.println();
  }
}
NonrecursiveDirectedDFS.__class =
  'edu.princeton.cs.algs4.NonrecursiveDirectedDFS';

NonrecursiveDirectedDFS.main(null);
