import { Bag } from './Bag';
import { DirectedEdge } from './DirectedEdge';
import { StdRandom } from './StdRandom';
import { In } from './In';
import { Stack } from './Stack';
import { StdOut } from './StdOut';

/**
 * Initializes a random edge-weighted digraph with `V` vertices and <em>E</em> edges.
 *
 * @param   V the number of vertices
 * @param   E the number of edges
 * @throws IllegalArgumentException if `V < 0`
 * @throws IllegalArgumentException if `E < 0`
 * @class
 * @author Robert Sedgewick
 */
export class EdgeWeightedDigraph {
  static NEWLINE: string;
  public static NEWLINE_$LI$(): string {
    if (EdgeWeightedDigraph.NEWLINE == null)
      EdgeWeightedDigraph.NEWLINE = java.lang.System.getProperty(
        'line.separator'
      );
    return EdgeWeightedDigraph.NEWLINE;
  }

  private __V: number;

  private __E: number;

  private __adj: Bag<DirectedEdge>[];

  private __indegree: number[];

  public constructor(V?: any, E?: any) {
    if (
      (typeof V === 'number' || V === null) &&
      (typeof E === 'number' || E === null)
    ) {
      const __args = arguments;
      {
        const __args = arguments;
        if (this.__V === undefined) this.__V = 0;
        if (this.__E === undefined) this.__E = 0;
        if (this.__adj === undefined) this.__adj = null;
        if (this.__indegree === undefined) this.__indegree = null;
        if (this.__V === undefined) this.__V = 0;
        if (this.__E === undefined) this.__E = 0;
        if (this.__adj === undefined) this.__adj = null;
        if (this.__indegree === undefined) this.__indegree = null;
        (() => {
          if (V < 0)
            throw new Error(
              'Number of vertices in a Digraph must be nonnegative'
            );
          this.__V = V;
          this.__E = 0;
          this.__indegree = ((s) => {
            const a = [];
            while (s-- > 0) a.push(0);
            return a;
          })(V);
          this.__adj = <Bag<DirectedEdge>[]>((s) => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(V);
          for (let v = 0; v < V; v++) {
            this.__adj[v] = <any>new Bag<DirectedEdge>();
          }
        })();
      }
      (() => {
        if (E < 0)
          throw new Error('Number of edges in a Digraph must be nonnegative');
        for (let i = 0; i < E; i++) {
          {
            const v: number = StdRandom.uniform$int(V);
            const w: number = StdRandom.uniform$int(V);
            const weight: number = 0.01 * StdRandom.uniform$int(100);
            const e: DirectedEdge = new DirectedEdge(v, w, weight);
            this.addEdge(e);
          }
        }
      })();
    } else if (
      ((V != null && V instanceof <any>In) || V === null) &&
      E === undefined
    ) {
      const __args = arguments;
      const __in: any = __args[0];
      {
        const __args = arguments;
        const V: any = __in.readInt();
        if (this.__V === undefined) this.__V = 0;
        if (this.__E === undefined) this.__E = 0;
        if (this.__adj === undefined) this.__adj = null;
        if (this.__indegree === undefined) this.__indegree = null;
        if (this.__V === undefined) this.__V = 0;
        if (this.__E === undefined) this.__E = 0;
        if (this.__adj === undefined) this.__adj = null;
        if (this.__indegree === undefined) this.__indegree = null;
        (() => {
          if (V < 0)
            throw new Error(
              'Number of vertices in a Digraph must be nonnegative'
            );
          this.__V = V;
          this.__E = 0;
          this.__indegree = ((s) => {
            const a = [];
            while (s-- > 0) a.push(0);
            return a;
          })(V);
          this.__adj = <Bag<DirectedEdge>[]>((s) => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(V);
          for (let v = 0; v < V; v++) {
            this.__adj[v] = <any>new Bag<DirectedEdge>();
          }
        })();
      }
      (() => {
        const E: number = __in.readInt();
        if (E < 0) throw new Error('Number of edges must be nonnegative');
        for (let i = 0; i < E; i++) {
          {
            const v: number = __in.readInt();
            const w: number = __in.readInt();
            this.validateVertex(v);
            this.validateVertex(w);
            const weight: number = __in.readDouble();
            this.addEdge(new DirectedEdge(v, w, weight));
          }
        }
      })();
    } else if (
      ((V != null && V instanceof <any>EdgeWeightedDigraph) || V === null) &&
      E === undefined
    ) {
      const __args = arguments;
      const G: any = __args[0];
      {
        const __args = arguments;
        const V: any = G.V();
        if (this.__V === undefined) this.__V = 0;
        if (this.__E === undefined) this.__E = 0;
        if (this.__adj === undefined) this.__adj = null;
        if (this.__indegree === undefined) this.__indegree = null;
        if (this.__V === undefined) this.__V = 0;
        if (this.__E === undefined) this.__E = 0;
        if (this.__adj === undefined) this.__adj = null;
        if (this.__indegree === undefined) this.__indegree = null;
        (() => {
          if (V < 0)
            throw new Error(
              'Number of vertices in a Digraph must be nonnegative'
            );
          this.__V = V;
          this.__E = 0;
          this.__indegree = ((s) => {
            const a = [];
            while (s-- > 0) a.push(0);
            return a;
          })(V);
          this.__adj = <Bag<DirectedEdge>[]>((s) => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(V);
          for (let v = 0; v < V; v++) {
            this.__adj[v] = <any>new Bag<DirectedEdge>();
          }
        })();
      }
      (() => {
        this.__E = G.E();
        for (let v = 0; v < G.V(); v++) {
          this.__indegree[v] = G.indegree(v);
        }
        for (let v = 0; v < G.V(); v++) {
          {
            const reverse: Stack<DirectedEdge> = <any>new Stack<DirectedEdge>();
            for (let index234 = G.__adj[v].iterator(); index234.hasNext(); ) {
              const e = index234.next();
              {
                reverse.push(e);
              }
            }
            for (let index235 = reverse.iterator(); index235.hasNext(); ) {
              const e = index235.next();
              {
                this.__adj[v].add(e);
              }
            }
          }
        }
      })();
    } else if ((typeof V === 'number' || V === null) && E === undefined) {
      const __args = arguments;
      if (this.__V === undefined) this.__V = 0;
      if (this.__E === undefined) this.__E = 0;
      if (this.__adj === undefined) this.__adj = null;
      if (this.__indegree === undefined) this.__indegree = null;
      if (this.__V === undefined) this.__V = 0;
      if (this.__E === undefined) this.__E = 0;
      if (this.__adj === undefined) this.__adj = null;
      if (this.__indegree === undefined) this.__indegree = null;
      (() => {
        if (V < 0)
          throw new Error(
            'Number of vertices in a Digraph must be nonnegative'
          );
        this.__V = V;
        this.__E = 0;
        this.__indegree = ((s) => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(V);
        this.__adj = <Bag<DirectedEdge>[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(V);
        for (let v = 0; v < V; v++) {
          this.__adj[v] = <any>new Bag<DirectedEdge>();
        }
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Returns the number of vertices in this edge-weighted digraph.
   *
   * @return  the number of vertices in this edge-weighted digraph
   */
  public V(): number {
    return this.__V;
  }

  /**
   * Returns the number of edges in this edge-weighted digraph.
   *
   * @return  the number of edges in this edge-weighted digraph
   */
  public E(): number {
    return this.__E;
  }

  private validateVertex(v: number) {
    if (v < 0 || v >= this.__V)
      throw new Error(`vertex ${v} is not between 0 and ${this.__V - 1}`);
  }

  /**
   * Adds the directed edge `e` to this edge-weighted digraph.
   *
   * @param  {DirectedEdge} e the edge
   * @throws IllegalArgumentException unless endpoints of edge are between `0`
   * and `V-1`
   */
  public addEdge(e: DirectedEdge) {
    const v: number = e.from();
    const w: number = e.to();
    this.validateVertex(v);
    this.validateVertex(w);
    this.__adj[v].add(e);
    this.__indegree[w]++;
    this.__E++;
  }

  /**
   * Returns the directed edges incident from vertex `v`.
   *
   * @param   v the vertex
   * @return  the directed edges incident from vertex `v` as an Iterable
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public adj(v: number): Iterable<DirectedEdge> {
    this.validateVertex(v);
    return this.__adj[v];
  }

  /**
   * Returns the number of directed edges incident from vertex `v`.
   * This is known as the <em>outdegree</em> of vertex `v`.
   *
   * @param   v the vertex
   * @return  the outdegree of vertex `v`
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public outdegree(v: number): number {
    this.validateVertex(v);
    return this.__adj[v].size();
  }

  /**
   * Returns the number of directed edges incident to vertex `v`.
   * This is known as the <em>indegree</em> of vertex `v`.
   *
   * @param   v the vertex
   * @return  the indegree of vertex `v`
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public indegree(v: number): number {
    this.validateVertex(v);
    return this.__indegree[v];
  }

  /**
   * Returns all directed edges in this edge-weighted digraph.
   * To iterate over the edges in this edge-weighted digraph, use foreach notation:
   * `for (DirectedEdge e : G.edges())`.
   *
   * @return  all edges in this edge-weighted digraph, as an iterable
   */
  public edges(): Iterable<DirectedEdge> {
    const list: Bag<DirectedEdge> = <any>new Bag<DirectedEdge>();
    for (let v = 0; v < this.__V; v++) {
      {
        for (let index236 = this.adj(v).iterator(); index236.hasNext(); ) {
          const e = index236.next();
          {
            list.add(e);
          }
        }
      }
    }
    return list;
  }

  /**
   * Returns a string representation of this edge-weighted digraph.
   *
   * @return  the number of vertices <em>V</em>, followed by the number of edges <em>E</em>,
   * followed by the <em>V</em> adjacency lists of edges
   */
  public toString(): string {
    const s = new String();
    s.append(`${this.__V} ${this.__E}${EdgeWeightedDigraph.NEWLINE_$LI$()}`);
    for (let v = 0; v < this.__V; v++) {
      {
        s.append(`${v}: `);
        for (let index237 = this.__adj[v].iterator(); index237.hasNext(); ) {
          const e = index237.next();
          {
            s.append(`${e}  `);
          }
        }
        s.append(EdgeWeightedDigraph.NEWLINE_$LI$());
      }
    }
    return s.toString();
  }

  /**
   * Unit tests the `EdgeWeightedDigraph` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: EdgeWeightedDigraph = new EdgeWeightedDigraph(__in);
    StdOut.println$java_lang_Object(G);
  }
}
EdgeWeightedDigraph.__class = 'edu.princeton.cs.algs4.EdgeWeightedDigraph';

EdgeWeightedDigraph.NEWLINE_$LI$();

EdgeWeightedDigraph.main(null);
