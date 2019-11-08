import { Bag } from './Bag';
import { In } from './In';
import { Stack } from './Stack';
import { StdOut } from './StdOut';

/**
 * Initializes an empty graph with {@code V} vertices and 0 edges.
 * param V the number of vertices
 *
 * @param   V number of vertices
 * @throws IllegalArgumentException if {@code V < 0}
 * @class
 * @author Robert Sedgewick
 */
export class Graph {
  static NEWLINE: string;
  public static NEWLINE_$LI$(): string {
    if (Graph.NEWLINE == null)
      Graph.NEWLINE = java.lang.System.getProperty('line.separator');
    return Graph.NEWLINE;
  }

  private __V: number;

  private __E: number;

  private __adj: Bag<number>[];

  public constructor(__in?: any) {
    if ((__in != null && __in instanceof <any>In) || __in === null) {
      const __args = arguments;
      if (this.__V === undefined) this.__V = 0;
      if (this.__E === undefined) this.__E = 0;
      if (this.__adj === undefined) this.__adj = null;
      if (this.__V === undefined) this.__V = 0;
      if (this.__E === undefined) this.__E = 0;
      if (this.__adj === undefined) this.__adj = null;
      (() => {
        try {
          this.__V = __in.readInt();
          if (this.__V < 0)
            throw new Error(
              'number of vertices in a Graph must be nonnegative'
            );
          this.__adj = <Bag<number>[]>(s => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(this.__V);
          for (let v = 0; v < this.__V; v++) {
            {
              this.__adj[v] = <any>new Bag<number>();
            }
          }
          const E: number = __in.readInt();
          if (E < 0)
            throw new Error('number of edges in a Graph must be nonnegative');
          for (let i = 0; i < E; i++) {
            {
              const v: number = __in.readInt();
              const w: number = __in.readInt();
              this.validateVertex(v);
              this.validateVertex(w);
              this.addEdge(v, w);
            }
          }
        } catch (e) {
          throw new Error('invalid input format in Graph constructor', e);
        }
      })();
    } else if ((__in != null && __in instanceof <any>Graph) || __in === null) {
      const __args = arguments;
      const G: any = __args[0];
      {
        const __args = arguments;
        const V: any = G.V();
        if (this.__V === undefined) this.__V = 0;
        if (this.__E === undefined) this.__E = 0;
        if (this.__adj === undefined) this.__adj = null;
        if (this.__V === undefined) this.__V = 0;
        if (this.__E === undefined) this.__E = 0;
        if (this.__adj === undefined) this.__adj = null;
        (() => {
          if (V < 0) throw new Error('Number of vertices must be nonnegative');
          this.__V = V;
          this.__E = 0;
          this.__adj = <Bag<number>[]>(s => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(V);
          for (let v = 0; v < V; v++) {
            {
              this.__adj[v] = <any>new Bag<number>();
            }
          }
        })();
      }
      (() => {
        this.__E = G.E();
        for (let v = 0; v < G.V(); v++) {
          {
            const reverse: Stack<number> = <any>new Stack<number>();
            for (let index281 = G.__adj[v].iterator(); index281.hasNext(); ) {
              const w = index281.next();
              {
                reverse.push(w);
              }
            }
            for (let index282 = reverse.iterator(); index282.hasNext(); ) {
              const w = index282.next();
              {
                this.__adj[v].add(w);
              }
            }
          }
        }
      })();
    } else if (typeof __in === 'number' || __in === null) {
      const __args = arguments;
      const V: any = __args[0];
      if (this.__V === undefined) this.__V = 0;
      if (this.__E === undefined) this.__E = 0;
      if (this.__adj === undefined) this.__adj = null;
      if (this.__V === undefined) this.__V = 0;
      if (this.__E === undefined) this.__E = 0;
      if (this.__adj === undefined) this.__adj = null;
      (() => {
        if (V < 0) throw new Error('Number of vertices must be nonnegative');
        this.__V = V;
        this.__E = 0;
        this.__adj = <Bag<number>[]>(s => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(V);
        for (let v = 0; v < V; v++) {
          {
            this.__adj[v] = <any>new Bag<number>();
          }
        }
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Returns the number of vertices in this graph.
   *
   * @return  the number of vertices in this graph
   */
  public V(): number {
    return this.__V;
  }

  /**
   * Returns the number of edges in this graph.
   *
   * @return  the number of edges in this graph
   */
  public E(): number {
    return this.__E;
  }

  private validateVertex(v: number) {
    if (v < 0 || v >= this.__V)
      throw new Error(`vertex ${v} is not between 0 and ${this.__V - 1}`);
  }

  /**
   * Adds the undirected edge v-w to this graph.
   *
   * @param   v one vertex in the edge
   * @param   w the other vertex in the edge
   * @throws IllegalArgumentException unless both {@code 0 <= v < V} and {@code 0 <= w < V}
   */
  public addEdge(v: number, w: number) {
    this.validateVertex(v);
    this.validateVertex(w);
    this.__E++;
    this.__adj[v].add(w);
    this.__adj[w].add(v);
  }

  /**
   * Returns the vertices adjacent to vertex {@code v}.
   *
   * @param   v the vertex
   * @return  the vertices adjacent to vertex {@code v}, as an iterable
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public adj(v: number): Iterable<number> {
    this.validateVertex(v);
    return this.__adj[v];
  }

  /**
   * Returns the degree of vertex {@code v}.
   *
   * @param   v the vertex
   * @return  the degree of vertex {@code v}
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public degree(v: number): number {
    this.validateVertex(v);
    return this.__adj[v].size();
  }

  /**
   * Returns a string representation of this graph.
   *
   * @return  the number of vertices <em>V</em>, followed by the number of edges <em>E</em>,
   * followed by the <em>V</em> adjacency lists
   */
  public toString(): string {
    const s= new String();
    s.append(`${this.__V} vertices, ${this.__E} edges ${Graph.NEWLINE_$LI$()}`);
    for (let v = 0; v < this.__V; v++) {
      {
        s.append(`${v}: `);
        for (let index283 = this.__adj[v].iterator(); index283.hasNext(); ) {
          const w = index283.next();
          {
            s.append(`${w} `);
          }
        }
        s.append(Graph.NEWLINE_$LI$());
      }
    }
    return s.toString();
  }

  /**
   * Unit tests the {@code Graph} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Graph = new Graph(__in);
    StdOut.println$java_lang_Object(G);
  }
}
Graph.__class = 'edu.princeton.cs.algs4.Graph';

Graph.NEWLINE_$LI$();

Graph.main(null);
