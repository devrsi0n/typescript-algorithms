import { DirectedEdge } from './DirectedEdge';
import { StdRandom } from './StdRandom';
import { StdOut } from './StdOut';

/**
 * Initializes a random edge-weighted digraph with {@code V} vertices and <em>E</em> edges.
 * @param {number} V the number of vertices
 * @param {number} E the number of edges
 * @throws IllegalArgumentException if {@code V < 0}
 * @throws IllegalArgumentException if {@code E < 0}
 * @class
 * @author Robert Sedgewick
 */
export class AdjMatrixEdgeWeightedDigraph {
  static NEWLINE: string;
  public static NEWLINE_$LI$(): string {
    if (AdjMatrixEdgeWeightedDigraph.NEWLINE == null)
      AdjMatrixEdgeWeightedDigraph.NEWLINE = java.lang.System.getProperty(
        'line.separator'
      );
    return AdjMatrixEdgeWeightedDigraph.NEWLINE;
  }

  private __V: number;

  private __E: number;

  private __adj: DirectedEdge[][];

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
          if (V < 0) throw new Error('number of vertices must be nonnegative');
          this.__V = V;
          this.__E = 0;
          this.__adj = <any>(function(dims) {
            const allocate = function(dims) {
              if (dims.length == 0) {
                return null;
              }
              const array = [];
              for (let i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
              }
              return array;
            };
            return allocate(dims);
          })([V, V]);
        })();
      }
      (() => {
        if (E < 0) throw new Error('number of edges must be nonnegative');
        if (E > V * V) throw new Error('too many edges');
        while (this.__E !== E) {
          {
            const v: number = StdRandom.uniform$int(V);
            const w: number = StdRandom.uniform$int(V);
            const weight: number =
              Math.round(100 * StdRandom.uniform()) / 100.0;
            this.addEdge(new DirectedEdge(v, w, weight));
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
        if (V < 0) throw new Error('number of vertices must be nonnegative');
        this.__V = V;
        this.__E = 0;
        this.__adj = <any>(function(dims) {
          const allocate = function(dims) {
            if (dims.length == 0) {
              return null;
            }
            const array = [];
            for (let i = 0; i < dims[0]; i++) {
              array.push(allocate(dims.slice(1)));
            }
            return array;
          };
          return allocate(dims);
        })([V, V]);
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Returns the number of vertices in the edge-weighted digraph.
   * @return  the number of vertices in the edge-weighted digraph
   */
  public V(): number {
    return this.__V;
  }

  /**
   * Returns the number of edges in the edge-weighted digraph.
   * @return  the number of edges in the edge-weighted digraph
   */
  public E(): number {
    return this.__E;
  }

  /**
   * Adds the directed edge {@code e} to the edge-weighted digraph (if there
   * is not already an edge with the same endpoints).
   * @param {DirectedEdge} e the edge
   */
  public addEdge(e: DirectedEdge) {
    const v: number = e.from();
    const w: number = e.to();
    this.validateVertex(v);
    this.validateVertex(w);
    if (this.__adj[v][w] == null) {
      this.__E++;
      this.__adj[v][w] = e;
    }
  }

  /**
   * Returns the directed edges incident from vertex {@code v}.
   * @param {number} v the vertex
   * @return  the directed edges incident from vertex {@code v} as an Iterable
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public adj(v: number): Iterable<DirectedEdge> {
    this.validateVertex(v);
    return new AdjMatrixEdgeWeightedDigraph.AdjIterator(this, v);
  }

  /**
   * Returns a string representation of the edge-weighted digraph. This method takes
   * time proportional to <em>V</em><sup>2</sup>.
   * @return  the number of vertices <em>V</em>, followed by the number of edges <em>E</em>,
   * followed by the <em>V</em> adjacency lists of edges
   */
  public toString(): string {
    const s = new String();
    s.append(
      `${this.__V} ${this.__E}${AdjMatrixEdgeWeightedDigraph.NEWLINE_$LI$()}`
    );
    for (let v = 0; v < this.__V; v++) {
      {
        s.append(`${v}: `);
        for (let index127 = this.adj(v).iterator(); index127.hasNext(); ) {
          const e = index127.next();
          {
            s.append(`${e}  `);
          }
        }
        s.append(AdjMatrixEdgeWeightedDigraph.NEWLINE_$LI$());
      }
    }
    return s.toString();
  }

  validateVertex(v: number) {
    if (v < 0 || v >= this.__V)
      throw new Error(`vertex ${v} is not between 0 and ${this.__V - 1}`);
  }

  /**
   * Unit tests the {@code AdjMatrixEdgeWeightedDigraph} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const V: number = parseInt(args[0]);
    const E: number = parseInt(args[1]);
    const G: AdjMatrixEdgeWeightedDigraph = new AdjMatrixEdgeWeightedDigraph(
      V,
      E
    );
    StdOut.println$java_lang_Object(G);
  }
}
AdjMatrixEdgeWeightedDigraph.__class =
  'edu.princeton.cs.algs4.AdjMatrixEdgeWeightedDigraph';

export namespace AdjMatrixEdgeWeightedDigraph {
  export class AdjIterator
    implements Iterator<DirectedEdge>, Iterable<DirectedEdge> {
    public __parent: any;
    v: number;

    w: number;

    public constructor(__parent: any, v: number) {
      this.__parent = __parent;
      if (this.v === undefined) this.v = 0;
      this.w = 0;
      this.v = v;
    }

    public iterator(): Iterator<DirectedEdge> {
      return this;
    }

    public hasNext(): boolean {
      while (this.w < this.__parent.__V) {
        {
          if (this.__parent.__adj[this.v][this.w] != null) return true;
          this.w++;
        }
      }
      return false;
    }

    public next(): DirectedEdge {
      if (!this.hasNext()) {
        throw new Error();
      }
      return this.__parent.__adj[this.v][this.w++];
    }

    public remove() {
      throw new Error('UnsupportedOperationException');
    }
  }
  AdjIterator.__class =
    'edu.princeton.cs.algs4.AdjMatrixEdgeWeightedDigraph.AdjIterator';
  AdjIterator.__interfaces = ['java.util.Iterator', 'Iterable'];
}

AdjMatrixEdgeWeightedDigraph.NEWLINE_$LI$();

AdjMatrixEdgeWeightedDigraph.main(null);
