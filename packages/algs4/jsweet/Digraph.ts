import { Bag } from './Bag';
import { In } from './In';
import { Stack } from './Stack';
import { StdOut } from './StdOut';

/**
 * Initializes an empty digraph with <em>V</em> vertices.
 *
 * @param  {number} V the number of vertices
 * @throws IllegalArgumentException if {@code V < 0}
 * @class
 * @author Robert Sedgewick
 */
export class Digraph {
  static NEWLINE: string;
  public static NEWLINE_$LI$(): string {
    if (Digraph.NEWLINE == null)
      Digraph.NEWLINE = java.lang.System.getProperty('line.separator');
    return Digraph.NEWLINE;
  }

  private __V: number;

  private __E: number;

  private __adj: Bag<number>[];

  private __indegree: number[];

  public constructor(__in?: any) {
    if ((__in != null && __in instanceof <any>In) || __in === null) {
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
        try {
          this.__V = __in.readInt();
          if (this.__V < 0)
            throw new Error(
              'number of vertices in a Digraph must be nonnegative'
            );
          this.__indegree = (s => {
            const a = [];
            while (s-- > 0) a.push(0);
            return a;
          })(this.__V);
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
            throw new Error('number of edges in a Digraph must be nonnegative');
          for (let i = 0; i < E; i++) {
            {
              const v: number = __in.readInt();
              const w: number = __in.readInt();
              this.addEdge(v, w);
            }
          }
        } catch (e) {
          throw new Error('invalid input format in Digraph constructor', e);
        }
      })();
    } else if (
      (__in != null && __in instanceof <any>Digraph) ||
      __in === null
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
          this.__indegree = (s => {
            const a = [];
            while (s-- > 0) a.push(0);
            return a;
          })(V);
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
        for (let v = 0; v < this.__V; v++) {
          this.__indegree[v] = G.indegree(v);
        }
        for (let v = 0; v < G.V(); v++) {
          {
            const reverse: Stack<number> = <any>new Stack<number>();
            for (let index196 = G.__adj[v].iterator(); index196.hasNext(); ) {
              const w = index196.next();
              {
                reverse.push(w);
              }
            }
            for (let index197 = reverse.iterator(); index197.hasNext(); ) {
              const w = index197.next();
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
        this.__indegree = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(V);
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
   * Returns the number of vertices in this digraph.
   *
   * @return  the number of vertices in this digraph
   */
  public V(): number {
    return this.__V;
  }

  /**
   * Returns the number of edges in this digraph.
   *
   * @return  the number of edges in this digraph
   */
  public E(): number {
    return this.__E;
  }

  private validateVertex(v: number) {
    if (v < 0 || v >= this.__V)
      throw new Error(`vertex ${v} is not between 0 and ${this.__V - 1}`);
  }

  /**
   * Adds the directed edge v��w to this digraph.
   *
   * @param  {number} v the tail vertex
   * @param  {number} w the head vertex
   * @throws IllegalArgumentException unless both {@code 0 <= v < V} and {@code 0 <= w < V}
   */
  public addEdge(v: number, w: number) {
    this.validateVertex(v);
    this.validateVertex(w);
    this.__adj[v].add(w);
    this.__indegree[w]++;
    this.__E++;
  }

  /**
   * Returns the vertices adjacent from vertex {@code v} in this digraph.
   *
   * @param  {number} v the vertex
   * @return  the vertices adjacent from vertex {@code v} in this digraph, as an iterable
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public adj(v: number): Iterable<number> {
    this.validateVertex(v);
    return this.__adj[v];
  }

  /**
   * Returns the number of directed edges incident from vertex {@code v}.
   * This is known as the <em>outdegree</em> of vertex {@code v}.
   *
   * @param  {number} v the vertex
   * @return  the outdegree of vertex {@code v}
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public outdegree(v: number): number {
    this.validateVertex(v);
    return this.__adj[v].size();
  }

  /**
   * Returns the number of directed edges incident to vertex {@code v}.
   * This is known as the <em>indegree</em> of vertex {@code v}.
   *
   * @param  {number} v the vertex
   * @return  the indegree of vertex {@code v}
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public indegree(v: number): number {
    this.validateVertex(v);
    return this.__indegree[v];
  }

  /**
   * Returns the reverse of the digraph.
   *
   * @return {Digraph} the reverse of the digraph
   */
  public reverse(): Digraph {
    const reverse: Digraph = new Digraph(this.__V);
    for (let v = 0; v < this.__V; v++) {
      {
        for (let index198 = this.adj(v).iterator(); index198.hasNext(); ) {
          const w = index198.next();
          {
            reverse.addEdge(w, v);
          }
        }
      }
    }
    return reverse;
  }

  /**
   * Returns a string representation of the graph.
   *
   * @return  the number of vertices <em>V</em>, followed by the number of edges <em>E</em>,
   * followed by the <em>V</em> adjacency lists
   */
  public toString(): string {
    const s= new String();
    s.append(
      `${this.__V} vertices, ${this.__E} edges ${Digraph.NEWLINE_$LI$()}`
    );
    for (let v = 0; v < this.__V; v++) {
      {
        s.append(printf('%d: ', v));
        for (let index199 = this.__adj[v].iterator(); index199.hasNext(); ) {
          const w = index199.next();
          {
            s.append(printf('%d ', w));
          }
        }
        s.append(Digraph.NEWLINE_$LI$());
      }
    }
    return s.toString();
  }

  /**
   * Unit tests the {@code Digraph} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Digraph = new Digraph(__in);
    StdOut.println$java_lang_Object(G);
  }
}
Digraph.__class = 'edu.princeton.cs.algs4.Digraph';

Digraph.NEWLINE_$LI$();

Digraph.main(null);
