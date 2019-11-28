import { Bag } from './Bag';
import { FlowEdge } from './FlowEdge';
import { StdRandom } from './StdRandom';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Initializes a random flow network with `V` vertices and <em>E</em> edges.
 * The capacities are integers between 0 and 99 and the flow values are zero.
 * @param  V the number of vertices
 * @param  E the number of edges
 * @throws IllegalArgumentException if `V < 0`
 * @throws IllegalArgumentException if `E < 0`
 * @class
 * @author Robert Sedgewick
 */
export class FlowNetwork {
  static NEWLINE: string;
  public static NEWLINE_$LI$(): string {
    if (FlowNetwork.NEWLINE == null)
      FlowNetwork.NEWLINE = java.lang.System.getProperty('line.separator');
    return FlowNetwork.NEWLINE;
  }

  private __V: number;

  private __E: number;

  private __adj: Bag<FlowEdge>[];

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
          if (V < 0)
            throw new Error(
              'Number of vertices in a Graph must be nonnegative'
            );
          this.__V = V;
          this.__E = 0;
          this.__adj = <Bag<FlowEdge>[]>((s) => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(V);
          for (let v = 0; v < V; v++) {
            this.__adj[v] = <any>new Bag<FlowEdge>();
          }
        })();
      }
      (() => {
        if (E < 0) throw new Error('Number of edges must be nonnegative');
        for (let i = 0; i < E; i++) {
          {
            const v: number = StdRandom.uniform$int(V);
            const w: number = StdRandom.uniform$int(V);
            const capacity: number = StdRandom.uniform$int(100);
            this.addEdge(new FlowEdge(v, w, capacity));
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
          if (V < 0)
            throw new Error(
              'Number of vertices in a Graph must be nonnegative'
            );
          this.__V = V;
          this.__E = 0;
          this.__adj = <Bag<FlowEdge>[]>((s) => {
            const a = [];
            while (s-- > 0) a.push(null);
            return a;
          })(V);
          for (let v = 0; v < V; v++) {
            this.__adj[v] = <any>new Bag<FlowEdge>();
          }
        })();
      }
      (() => {
        const E: number = __in.readInt();
        if (E < 0) throw new Error('number of edges must be nonnegative');
        for (let i = 0; i < E; i++) {
          {
            const v: number = __in.readInt();
            const w: number = __in.readInt();
            this.validateVertex(v);
            this.validateVertex(w);
            const capacity: number = __in.readDouble();
            this.addEdge(new FlowEdge(v, w, capacity));
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
        if (V < 0)
          throw new Error('Number of vertices in a Graph must be nonnegative');
        this.__V = V;
        this.__E = 0;
        this.__adj = <Bag<FlowEdge>[]>((s) => {
          const a = [];
          while (s-- > 0) a.push(null);
          return a;
        })(V);
        for (let v = 0; v < V; v++) {
          this.__adj[v] = <any>new Bag<FlowEdge>();
        }
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Returns the number of vertices in the edge-weighted graph.
   * @return  the number of vertices in the edge-weighted graph
   */
  public V(): number {
    return this.__V;
  }

  /**
   * Returns the number of edges in the edge-weighted graph.
   * @return  the number of edges in the edge-weighted graph
   */
  public E(): number {
    return this.__E;
  }

  private validateVertex(v: number) {
    if (v < 0 || v >= this.__V)
      throw new Error(`vertex ${v} is not between 0 and ${this.__V - 1}`);
  }

  /**
   * Adds the edge `e` to the network.
   * @param {FlowEdge} e the edge
   * @throws IllegalArgumentException unless endpoints of edge are between
   * `0` and `V-1`
   */
  public addEdge(e: FlowEdge) {
    const v: number = e.from();
    const w: number = e.to();
    this.validateVertex(v);
    this.validateVertex(w);
    this.__adj[v].add(e);
    this.__adj[w].add(e);
    this.__E++;
  }

  /**
   * Returns the edges incident on vertex `v` (includes both edges pointing to
   * and from `v`).
   * @param  v the vertex
   * @return  the edges incident on vertex `v` as an Iterable
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public adj(v: number): Iterable<FlowEdge> {
    this.validateVertex(v);
    return this.__adj[v];
  }

  public edges(): Iterable<FlowEdge> {
    const list: Bag<FlowEdge> = <any>new Bag<FlowEdge>();
    for (let v = 0; v < this.__V; v++) {
      for (let index259 = this.adj(v).iterator(); index259.hasNext(); ) {
        const e = index259.next();
        {
          if (e.to() !== v) list.add(e);
        }
      }
    }
    return list;
  }

  /**
   * Returns a string representation of the flow network.
   * This method takes time proportional to <em>E</em> + <em>V</em>.
   * @return  the number of vertices <em>V</em>, followed by the number of edges <em>E</em>,
   * followed by the <em>V</em> adjacency lists
   */
  public toString(): string {
    const s = new String();
    s.append(`${this.__V} ${this.__E}${FlowNetwork.NEWLINE_$LI$()}`);
    for (let v = 0; v < this.__V; v++) {
      {
        s.append(`${v}:  `);
        for (let index260 = this.__adj[v].iterator(); index260.hasNext(); ) {
          const e = index260.next();
          {
            if (e.to() !== v) s.append(`${e}  `);
          }
        }
        s.append(FlowNetwork.NEWLINE_$LI$());
      }
    }
    return s.toString();
  }

  /**
   * Unit tests the `FlowNetwork` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const __in: In = new In(args[0]);
    const G: FlowNetwork = new FlowNetwork(__in);
    StdOut.println$java_lang_Object(G);
  }
}
FlowNetwork.__class = 'edu.princeton.cs.algs4.FlowNetwork';

FlowNetwork.NEWLINE_$LI$();

FlowNetwork.main(null);
