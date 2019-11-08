import { Bag } from './Bag';
import { Edge } from './Edge';
import { StdRandom } from './StdRandom';
import { In } from './In';
import { Stack } from './Stack';
import { StdOut } from './StdOut';

/**
 * Initializes a random edge-weighted graph with {@code V} vertices and <em>E</em> edges.
 *
 * @param  {number} V the number of vertices
 * @param  {number} E the number of edges
 * @throws IllegalArgumentException if {@code V < 0}
 * @throws IllegalArgumentException if {@code E < 0}
 * @class
 * @author Robert Sedgewick
 */
export class EdgeWeightedGraph {
  static NEWLINE: string;
  public static NEWLINE_$LI$(): string {
    if (EdgeWeightedGraph.NEWLINE == null)
      EdgeWeightedGraph.NEWLINE = java.lang.System.getProperty(
        'line.separator'
      );
    return EdgeWeightedGraph.NEWLINE;
  }

  private __V: number;

  private __E: number;

  private __adj: Bag<Edge>[];

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
        if (this.__V === undefined) this.__V = 0;
        if (this.__E === undefined) this.__E = 0;
        if (this.__adj === undefined) this.__adj = null;
        (() => {
          if (V < 0) throw new Error('Number of vertices must be nonnegative');
          this.__V = V;
          this.__E = 0;
          this.__adj = <Bag<Edge>[]>(s => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(V);
          for (let v = 0; v < V; v++) {
            {
              this.__adj[v] = <any>new Bag<Edge>();
            }
          }
        })();
      }
      (() => {
        if (E < 0) throw new Error('Number of edges must be nonnegative');
        for (let i = 0; i < E; i++) {
          {
            const v: number = StdRandom.uniform$int(V);
            const w: number = StdRandom.uniform$int(V);
            const weight: number =
              Math.round(100 * StdRandom.uniform()) / 100.0;
            const e: Edge = new Edge(v, w, weight);
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
        if (this.__V === undefined) this.__V = 0;
        if (this.__E === undefined) this.__E = 0;
        if (this.__adj === undefined) this.__adj = null;
        (() => {
          if (V < 0) throw new Error('Number of vertices must be nonnegative');
          this.__V = V;
          this.__E = 0;
          this.__adj = <Bag<Edge>[]>(s => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(V);
          for (let v = 0; v < V; v++) {
            {
              this.__adj[v] = <any>new Bag<Edge>();
            }
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
            const e: Edge = new Edge(v, w, weight);
            this.addEdge(e);
          }
        }
      })();
    } else if (
      ((V != null && V instanceof <any>EdgeWeightedGraph) || V === null) &&
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
        if (this.__V === undefined) this.__V = 0;
        if (this.__E === undefined) this.__E = 0;
        if (this.__adj === undefined) this.__adj = null;
        (() => {
          if (V < 0) throw new Error('Number of vertices must be nonnegative');
          this.__V = V;
          this.__E = 0;
          this.__adj = <Bag<Edge>[]>(s => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(V);
          for (let v = 0; v < V; v++) {
            {
              this.__adj[v] = <any>new Bag<Edge>();
            }
          }
        })();
      }
      (() => {
        this.__E = G.E();
        for (let v = 0; v < G.V(); v++) {
          {
            const reverse: Stack<Edge> = <any>new Stack<Edge>();
            for (let index241 = G.__adj[v].iterator(); index241.hasNext(); ) {
              const e = index241.next();
              {
                reverse.push(e);
              }
            }
            for (let index242 = reverse.iterator(); index242.hasNext(); ) {
              const e = index242.next();
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
      if (this.__V === undefined) this.__V = 0;
      if (this.__E === undefined) this.__E = 0;
      if (this.__adj === undefined) this.__adj = null;
      (() => {
        if (V < 0) throw new Error('Number of vertices must be nonnegative');
        this.__V = V;
        this.__E = 0;
        this.__adj = <Bag<Edge>[]>(s => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(V);
        for (let v = 0; v < V; v++) {
          {
            this.__adj[v] = <any>new Bag<Edge>();
          }
        }
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Returns the number of vertices in this edge-weighted graph.
   *
   * @return  the number of vertices in this edge-weighted graph
   */
  public V(): number {
    return this.__V;
  }

  /**
   * Returns the number of edges in this edge-weighted graph.
   *
   * @return  the number of edges in this edge-weighted graph
   */
  public E(): number {
    return this.__E;
  }

  private validateVertex(v: number) {
    if (v < 0 || v >= this.__V)
      throw new Error(`vertex ${v} is not between 0 and ${this.__V - 1}`);
  }

  /**
   * Adds the undirected edge {@code e} to this edge-weighted graph.
   *
   * @param  {Edge} e the edge
   * @throws IllegalArgumentException unless both endpoints are between {@code 0} and {@code V-1}
   */
  public addEdge(e: Edge) {
    const v: number = e.either();
    const w: number = e.other(v);
    this.validateVertex(v);
    this.validateVertex(w);
    this.__adj[v].add(e);
    this.__adj[w].add(e);
    this.__E++;
  }

  /**
   * Returns the edges incident on vertex {@code v}.
   *
   * @param  {number} v the vertex
   * @return  the edges incident on vertex {@code v} as an Iterable
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public adj(v: number): Iterable<Edge> {
    this.validateVertex(v);
    return this.__adj[v];
  }

  /**
   * Returns the degree of vertex {@code v}.
   *
   * @param  {number} v the vertex
   * @return  the degree of vertex {@code v}
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public degree(v: number): number {
    this.validateVertex(v);
    return this.__adj[v].size();
  }

  /**
   * Returns all edges in this edge-weighted graph.
   * To iterate over the edges in this edge-weighted graph, use foreach notation:
   * {@code for (Edge e : G.edges())}.
   *
   * @return  all edges in this edge-weighted graph, as an iterable
   */
  public edges(): Iterable<Edge> {
    const list: Bag<Edge> = <any>new Bag<Edge>();
    for (let v = 0; v < this.__V; v++) {
      {
        let selfLoops = 0;
        for (let index243 = this.adj(v).iterator(); index243.hasNext(); ) {
          const e = index243.next();
          {
            if (e.other(v) > v) {
              list.add(e);
            } else if (e.other(v) === v) {
              if (selfLoops % 2 === 0) list.add(e);
              selfLoops++;
            }
          }
        }
      }
    }
    return list;
  }

  /**
   * Returns a string representation of the edge-weighted graph.
   * This method takes time proportional to <em>E</em> + <em>V</em>.
   *
   * @return  the number of vertices <em>V</em>, followed by the number of edges <em>E</em>,
   * followed by the <em>V</em> adjacency lists of edges
   */
  public toString(): string {
    const s= new String();
    s.append(`${this.__V} ${this.__E}${EdgeWeightedGraph.NEWLINE_$LI$()}`);
    for (let v = 0; v < this.__V; v++) {
      {
        s.append(`${v}: `);
        for (let index244 = this.__adj[v].iterator(); index244.hasNext(); ) {
          const e = index244.next();
          {
            s.append(`${e}  `);
          }
        }
        s.append(EdgeWeightedGraph.NEWLINE_$LI$());
      }
    }
    return s.toString();
  }

  /**
   * Unit tests the {@code EdgeWeightedGraph} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: EdgeWeightedGraph = new EdgeWeightedGraph(__in);
    StdOut.println$java_lang_Object(G);
  }
}
EdgeWeightedGraph.__class = 'edu.princeton.cs.algs4.EdgeWeightedGraph';

EdgeWeightedGraph.NEWLINE_$LI$();

EdgeWeightedGraph.main(null);
