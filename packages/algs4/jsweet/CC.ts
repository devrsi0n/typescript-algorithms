import { Graph } from './Graph';
import { EdgeWeightedGraph } from './EdgeWeightedGraph';
import { Edge } from './Edge';
import { In } from './In';
import { StdOut } from './StdOut';
import { Queue } from './Queue';

/**
 * Computes the connected components of the undirected graph {@code G}.
 *
 * @param {Graph} G the undirected graph
 * @class
 * @author Robert Sedgewick
 */
export class CC {
  private marked: boolean[];

  private __id: number[];

  private __size: number[];

  private __count: number;

  public constructor(G?: any) {
    if ((G != null && G instanceof <any>Graph) || G === null) {
      const __args = arguments;
      if (this.marked === undefined) this.marked = null;
      if (this.__id === undefined) this.__id = null;
      if (this.__size === undefined) this.__size = null;
      if (this.__count === undefined) this.__count = 0;
      if (this.marked === undefined) this.marked = null;
      if (this.__id === undefined) this.__id = null;
      if (this.__size === undefined) this.__size = null;
      if (this.__count === undefined) this.__count = 0;
      (() => {
        this.marked = (s => {
          const a = [];
          while (s-- > 0) a.push(false);
          return a;
        })(G.V());
        this.__id = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.__size = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        for (let v = 0; v < G.V(); v++) {
          {
            if (!this.marked[v]) {
              this.dfs$edu_princeton_cs_algs4_Graph$int(G, v);
              this.__count++;
            }
          }
        }
      })();
    } else if (
      (G != null && G instanceof <any>EdgeWeightedGraph) ||
      G === null
    ) {
      const __args = arguments;
      if (this.marked === undefined) this.marked = null;
      if (this.__id === undefined) this.__id = null;
      if (this.__size === undefined) this.__size = null;
      if (this.__count === undefined) this.__count = 0;
      if (this.marked === undefined) this.marked = null;
      if (this.__id === undefined) this.__id = null;
      if (this.__size === undefined) this.__size = null;
      if (this.__count === undefined) this.__count = 0;
      (() => {
        this.marked = (s => {
          const a = [];
          while (s-- > 0) a.push(false);
          return a;
        })(G.V());
        this.__id = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.__size = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        for (let v = 0; v < G.V(); v++) {
          {
            if (!this.marked[v]) {
              this.dfs$edu_princeton_cs_algs4_EdgeWeightedGraph$int(G, v);
              this.__count++;
            }
          }
        }
      })();
    } else throw new Error('invalid overload');
  }

  public dfs$edu_princeton_cs_algs4_Graph$int(G: Graph, v: number) {
    this.marked[v] = true;
    this.__id[v] = this.__count;
    this.__size[this.__count]++;
    for (let index174 = G.adj(v).iterator(); index174.hasNext(); ) {
      const w = index174.next();
      {
        if (!this.marked[w]) {
          this.dfs$edu_princeton_cs_algs4_Graph$int(G, w);
        }
      }
    }
  }

  public dfs(G?: any, v?: any): any {
    if (
      ((G != null && G instanceof <any>Graph) || G === null) &&
      (typeof v === 'number' || v === null)
    ) {
      return <any>this.dfs$edu_princeton_cs_algs4_Graph$int(G, v);
    }
    if (
      ((G != null && G instanceof <any>EdgeWeightedGraph) || G === null) &&
      (typeof v === 'number' || v === null)
    ) {
      return <any>this.dfs$edu_princeton_cs_algs4_EdgeWeightedGraph$int(G, v);
    }
    throw new Error('invalid overload');
  }

  private dfs$edu_princeton_cs_algs4_EdgeWeightedGraph$int(
    G: EdgeWeightedGraph,
    v: number
  ) {
    this.marked[v] = true;
    this.__id[v] = this.__count;
    this.__size[this.__count]++;
    for (let index175 = G.adj(v).iterator(); index175.hasNext(); ) {
      const e = index175.next();
      {
        const w: number = e.other(v);
        if (!this.marked[w]) {
          this.dfs$edu_princeton_cs_algs4_EdgeWeightedGraph$int(G, w);
        }
      }
    }
  }

  /**
   * Returns the component id of the connected component containing vertex {@code v}.
   *
   * @param  {number} v the vertex
   * @return  the component id of the connected component containing vertex {@code v}
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public id(v: number): number {
    this.validateVertex(v);
    return this.__id[v];
  }

  /**
   * Returns the number of vertices in the connected component containing vertex {@code v}.
   *
   * @param  {number} v the vertex
   * @return  the number of vertices in the connected component containing vertex {@code v}
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public size(v: number): number {
    this.validateVertex(v);
    return this.__size[this.__id[v]];
  }

  /**
   * Returns the number of connected components in the graph {@code G}.
   *
   * @return  the number of connected components in the graph {@code G}
   */
  public count(): number {
    return this.__count;
  }

  /**
   * Returns true if vertices {@code v} and {@code w} are in the same
   * connected component.
   *
   * @param  {number} v one vertex
   * @param  {number} w the other vertex
   * @return  {@code true} if vertices {@code v} and {@code w} are in the same
   * connected component; {@code false} otherwise
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   * @throws IllegalArgumentException unless {@code 0 <= w < V}
   */
  public connected(v: number, w: number): boolean {
    this.validateVertex(v);
    this.validateVertex(w);
    return this.id(v) === this.id(w);
  }

  /**
   * Returns true if vertices {@code v} and {@code w} are in the same
   * connected component.
   *
   * @param  {number} v one vertex
   * @param  {number} w the other vertex
   * @return  {@code true} if vertices {@code v} and {@code w} are in the same
   * connected component; {@code false} otherwise
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   * @throws IllegalArgumentException unless {@code 0 <= w < V}
   * @deprecated Replaced by {@link #connected(int, int)}.
   */
  public areConnected(v: number, w: number): boolean {
    this.validateVertex(v);
    this.validateVertex(w);
    return this.id(v) === this.id(w);
  }

  private validateVertex(v: number) {
    const V: number = this.marked.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the {@code CC} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Graph = new Graph(__in);
    const cc: CC = new CC(G);
    const m: number = cc.count();
    StdOut.println$java_lang_Object(`${m} components`);
    const components: Queue<number>[] = <Queue<number>[]>(s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(m);
    for (let i = 0; i < m; i++) {
      {
        components[i] = <any>new Queue<number>();
      }
    }
    for (let v = 0; v < G.V(); v++) {
      {
        components[cc.id(v)].enqueue(v);
      }
    }
    for (let i = 0; i < m; i++) {
      {
        for (let index176 = components[i].iterator(); index176.hasNext(); ) {
          const v = index176.next();
          {
            StdOut.print$java_lang_Object(`${v} `);
          }
        }
        StdOut.println();
      }
    }
  }
}
CC.__class = 'edu.princeton.cs.algs4.CC';

CC.main(null);
