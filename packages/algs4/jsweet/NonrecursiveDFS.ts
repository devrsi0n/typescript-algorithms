import { Graph } from './Graph';
import { Stack } from './Stack';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Computes the vertices connected to the source vertex {@code s} in the graph {@code G}.
 * @param {Graph} G the graph
 * @param  s the source vertex
 * @throws IllegalArgumentException unless {@code 0 <= s < V}
 * @class
 * @author Robert Sedgewick
 */
export class NonrecursiveDFS {
  private __marked: boolean[];

  public constructor(G: Graph, s: number) {
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
   * Is vertex {@code v} connected to the source vertex {@code s}?
   * @param  v the vertex
   * @return  {@code true} if vertex {@code v} is connected to the source vertex {@code s},
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
   * Unit tests the {@code NonrecursiveDFS} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Graph = new Graph(__in);
    const s: number = parseInt(args[1]);
    const dfs: NonrecursiveDFS = new NonrecursiveDFS(G, s);
    for (let v = 0; v < G.V(); v++) {
      if (dfs.marked(v)) StdOut.print$java_lang_Object(`${v} `);
    }
    StdOut.println();
  }
}
NonrecursiveDFS.__class = 'edu.princeton.cs.algs4.NonrecursiveDFS';

NonrecursiveDFS.main(null);
