import { ST } from './ST';
import { Digraph } from './Digraph';
import { In } from './In';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 *
 * Initializes a digraph from a file using the specified delimiter.
 * Each line in the file contains
 * the name of a vertex, followed by a list of the names
 * of the vertices adjacent to that vertex, separated by the delimiter.
 * @param {string} filename the name of the file
 * @param {string} delimiter the delimiter between fields
 * @class
 * @author Robert Sedgewick
 */
export class SymbolDigraph {
  private st: ST<string, number>;

  private keys: string[];

  private graph: Digraph;

  public constructor(filename: string, delimiter: string) {
    if (this.st === undefined) this.st = null;
    if (this.keys === undefined) this.keys = null;
    if (this.graph === undefined) this.graph = null;
    this.st = <any>new ST<string, number>();
    let __in: In = new In(filename);
    while (__in.hasNextLine()) {
      {
        const a: string[] = __in.readLine().split(delimiter);
        for (let i = 0; i < a.length; i++) {
          {
            if (!this.st.contains(a[i])) this.st.put(a[i], this.st.size());
          }
        }
      }
    }
    this.keys = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(this.st.size());
    for (let index358 = this.st.keys().iterator(); index358.hasNext(); ) {
      const name = index358.next();
      {
        this.keys[this.st.get(name)] = name;
      }
    }
    this.graph = new Digraph(this.st.size());
    __in = new In(filename);
    while (__in.hasNextLine()) {
      {
        const a: string[] = __in.readLine().split(delimiter);
        const v: number = this.st.get(a[0]);
        for (let i = 1; i < a.length; i++) {
          {
            const w: number = this.st.get(a[i]);
            this.graph.addEdge(v, w);
          }
        }
      }
    }
  }

  /**
   * Does the digraph contain the vertex named {@code s}?
   * @param {string} s the name of a vertex
   * @return  {@code true} if {@code s} is the name of a vertex, and {@code false} otherwise
   */
  public contains(s: string): boolean {
    return this.st.contains(s);
  }

  /**
   * Returns the integer associated with the vertex named {@code s}.
   * @param {string} s the name of a vertex
   * @return  the integer (between 0 and <em>V</em> - 1) associated with the vertex named {@code s}
   * @deprecated Replaced by {@link #indexOf(String)}.
   */
  public index(s: string): number {
    return this.st.get(s);
  }

  /**
   * Returns the integer associated with the vertex named {@code s}.
   * @param {string} s the name of a vertex
   * @return  the integer (between 0 and <em>V</em> - 1) associated with the vertex named {@code s}
   */
  public indexOf(s: string): number {
    return this.st.get(s);
  }

  /**
   * Returns the name of the vertex associated with the integer {@code v}.
   * @param  {number} v the integer corresponding to a vertex (between 0 and <em>V</em> - 1)
   * @return  the name of the vertex associated with the integer {@code v}
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   * @deprecated Replaced by {@link #nameOf(int)}.
   */
  public name(v: number): string {
    this.validateVertex(v);
    return this.keys[v];
  }

  /**
   * Returns the name of the vertex associated with the integer {@code v}.
   * @param  {number} v the integer corresponding to a vertex (between 0 and <em>V</em> - 1)
   * @return  the name of the vertex associated with the integer {@code v}
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public nameOf(v: number): string {
    this.validateVertex(v);
    return this.keys[v];
  }

  /**
   * Returns the digraph assoicated with the symbol graph. It is the client's responsibility
   * not to mutate the digraph.
   *
   * @return {Digraph} the digraph associated with the symbol digraph
   * @deprecated Replaced by {@link #digraph()}.
   */
  public G(): Digraph {
    return this.graph;
  }

  /**
   * Returns the digraph assoicated with the symbol graph. It is the client's responsibility
   * not to mutate the digraph.
   *
   * @return {Digraph} the digraph associated with the symbol digraph
   */
  public digraph(): Digraph {
    return this.graph;
  }

  private validateVertex(v: number) {
    const V: number = this.graph.V();
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the {@code SymbolDigraph} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const filename: string = args[0];
    const delimiter: string = args[1];
    const sg: SymbolDigraph = new SymbolDigraph(filename, delimiter);
    const graph: Digraph = sg.digraph();
    while (!StdIn.isEmpty()) {
      {
        const t: string = StdIn.readLine();
        for (
          let index359 = graph.adj(sg.index(t)).iterator();
          index359.hasNext();

        ) {
          const v = index359.next();
          {
            StdOut.println$java_lang_Object(`   ${sg.name(v)}`);
          }
        }
      }
    }
  }
}
SymbolDigraph.__class = 'edu.princeton.cs.algs4.SymbolDigraph';

SymbolDigraph.main(null);
