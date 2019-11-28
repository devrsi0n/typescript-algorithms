import { Digraph } from './Digraph';
import { In } from './In';
import { Bag } from './Bag';
import { StdOut } from './StdOut';

/**
 * Computes the vertices in digraph `G` that are
 * reachable from the source vertex `s`.
 * @param {Digraph} G the digraph
 * @param  s the source vertex
 * @throws IllegalArgumentException unless `0 <= s < V`
 * @class
 * @author Robert Sedgewick
 */
export class DirectedDFS {
  private __marked: boolean[];

  private __count: number;

  public constructor(G?: any, sources?: any) {
    if (
      ((G != null && G instanceof <any>Digraph) || G === null) &&
      ((sources != null &&
        ((sources.__interfaces != null &&
          sources.__interfaces.indexOf('Iterable') >= 0) ||
          (sources.constructor != null &&
            sources.constructor.__interfaces != null &&
            sources.constructor.__interfaces.indexOf('Iterable') >= 0))) ||
        sources === null)
    ) {
      const __args = arguments;
      if (this.__marked === undefined) this.__marked = null;
      if (this.__count === undefined) this.__count = 0;
      if (this.__marked === undefined) this.__marked = null;
      if (this.__count === undefined) this.__count = 0;
      (() => {
        this.__marked = ((s) => {
          const a = [];
          while (s-- > 0) a.push(false);
          return a;
        })(G.V());
        this.validateVertices(sources);
        for (let index218 = sources.iterator(); index218.hasNext(); ) {
          const v = index218.next();
          {
            if (!this.__marked[v]) this.dfs(G, v);
          }
        }
      })();
    } else if (
      ((G != null && G instanceof <any>Digraph) || G === null) &&
      (typeof sources === 'number' || sources === null)
    ) {
      const __args = arguments;
      const s: any = __args[1];
      if (this.__marked === undefined) this.__marked = null;
      if (this.__count === undefined) this.__count = 0;
      if (this.__marked === undefined) this.__marked = null;
      if (this.__count === undefined) this.__count = 0;
      (() => {
        this.__marked = ((s) => {
          const a = [];
          while (s-- > 0) a.push(false);
          return a;
        })(G.V());
        this.validateVertex(s);
        this.dfs(G, s);
      })();
    } else throw new Error('invalid overload');
  }

  private dfs(G: Digraph, v: number) {
    this.__count++;
    this.__marked[v] = true;
    for (let index219 = G.adj(v).iterator(); index219.hasNext(); ) {
      const w = index219.next();
      {
        if (!this.__marked[w]) this.dfs(G, w);
      }
    }
  }

  /**
   * Is there a directed path from the source vertex (or any
   * of the source vertices) and vertex `v`?
   * @param   v the vertex
   * @return  `true` if there is a directed path, `false` otherwise
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public marked(v: number): boolean {
    this.validateVertex(v);
    return this.__marked[v];
  }

  /**
   * Returns the number of vertices reachable from the source vertex
   * (or source vertices).
   * @return  the number of vertices reachable from the source vertex
   * (or source vertices)
   */
  public count(): number {
    return this.__count;
  }

  private validateVertex(v: number) {
    const V: number = this.__marked.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  private validateVertices(vertices: Iterable<number>) {
    if (vertices == null) {
      throw new Error('argument is null');
    }
    const V: number = this.__marked.length;
    for (let index220 = vertices.iterator(); index220.hasNext(); ) {
      const v = index220.next();
      {
        if (v < 0 || v >= V) {
          throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
        }
      }
    }
  }

  /**
   * Unit tests the `DirectedDFS` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const __in: In = new In(args[0]);
    const G: Digraph = new Digraph(__in);
    const sources: Bag<number> = <any>new Bag<number>();
    for (let i = 1; i < args.length; i++) {
      {
        const s: number = parseInt(args[i]);
        sources.add(s);
      }
    }
    const dfs: DirectedDFS = new DirectedDFS(G, sources);
    for (let v = 0; v < G.V(); v++) {
      {
        if (dfs.marked(v)) StdOut.print$java_lang_Object(`${v} `);
      }
    }
    StdOut.println();
  }
}
DirectedDFS.__class = 'edu.princeton.cs.algs4.DirectedDFS';

DirectedDFS.main(null);
