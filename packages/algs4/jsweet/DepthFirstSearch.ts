import { Graph } from './Graph';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Computes the vertices in graph {@code G} that are
 * connected to the source vertex {@code s}.
 * @param {Graph} G the graph
 * @param {number} s the source vertex
 * @throws IllegalArgumentException unless {@code 0 <= s < V}
 * @class
 * @author Robert Sedgewick
 */
export class DepthFirstSearch {
  private __marked: boolean[];

  private __count: number;

  public constructor(G: Graph, s: number) {
    if (this.__marked === undefined) this.__marked = null;
    if (this.__count === undefined) this.__count = 0;
    this.__marked = (s => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    this.validateVertex(s);
    this.dfs(G, s);
  }

  private dfs(G: Graph, v: number) {
    this.__count++;
    this.__marked[v] = true;
    for (let index195 = G.adj(v).iterator(); index195.hasNext(); ) {
      const w = index195.next();
      {
        if (!this.__marked[w]) {
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
  public marked(v: number): boolean {
    this.validateVertex(v);
    return this.__marked[v];
  }

  /**
   * Returns the number of vertices connected to the source vertex {@code s}.
   * @return  the number of vertices connected to the source vertex {@code s}
   */
  public count(): number {
    return this.__count;
  }

  private validateVertex(v: number) {
    const V: number = this.__marked.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the {@code DepthFirstSearch} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Graph = new Graph(__in);
    const s: number = parseInt(args[1]);
    const search: DepthFirstSearch = new DepthFirstSearch(G, s);
    for (let v = 0; v < G.V(); v++) {
      {
        if (search.marked(v)) StdOut.print$java_lang_Object(`${v} `);
      }
    }
    StdOut.println();
    if (search.count() !== G.V())
      StdOut.println$java_lang_Object('NOT connected');
    else StdOut.println$java_lang_Object('connected');
  }
}
DepthFirstSearch.__class = 'edu.princeton.cs.algs4.DepthFirstSearch';

DepthFirstSearch.main(null);
