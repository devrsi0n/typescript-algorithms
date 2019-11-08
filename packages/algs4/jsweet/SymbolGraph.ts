import { ST } from './ST';
import { Graph } from './Graph';
import { In } from './In';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 *
 * Initializes a graph from a file using the specified delimiter.
 * Each line in the file contains
 * the name of a vertex, followed by a list of the names
 * of the vertices adjacent to that vertex, separated by the delimiter.
 * @param  filename the name of the file
 * @param  delimiter the delimiter between fields
 * @class
 * @author Robert Sedgewick
 */
export class SymbolGraph {
  private st: ST<string, number>;

  private keys: string[];

  private __graph: Graph;

  public constructor(filename: string, delimiter: string) {
    if (this.st === undefined) this.st = null;
    if (this.keys === undefined) this.keys = null;
    if (this.__graph === undefined) this.__graph = null;
    this.st = <any>new ST<string, number>();
    let __in: In = new In(filename);
    while (!__in.isEmpty()) {
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
    for (let index360 = this.st.keys().iterator(); index360.hasNext(); ) {
      const name = index360.next();
      {
        this.keys[this.st.get(name)] = name;
      }
    }
    this.__graph = new Graph(this.st.size());
    __in = new In(filename);
    while (__in.hasNextLine()) {
      {
        const a: string[] = __in.readLine().split(delimiter);
        const v: number = this.st.get(a[0]);
        for (let i = 1; i < a.length; i++) {
          {
            const w: number = this.st.get(a[i]);
            this.__graph.addEdge(v, w);
          }
        }
      }
    }
  }

  /**
   * Does the graph contain the vertex named {@code s}?
   * @param  s the name of a vertex
   * @return  {@code true} if {@code s} is the name of a vertex, and {@code false} otherwise
   */
  public contains(s: string): boolean {
    return this.st.contains(s);
  }

  /**
   * Returns the integer associated with the vertex named {@code s}.
   * @param  s the name of a vertex
   * @return  the integer (between 0 and <em>V</em> - 1) associated with the vertex named {@code s}
   * @deprecated Replaced by {@link #indexOf(String)}.
   */
  public index(s: string): number {
    return this.st.get(s);
  }

  /**
   * Returns the integer associated with the vertex named {@code s}.
   * @param  s the name of a vertex
   * @return  the integer (between 0 and <em>V</em> - 1) associated with the vertex named {@code s}
   */
  public indexOf(s: string): number {
    return this.st.get(s);
  }

  /**
   * Returns the name of the vertex associated with the integer {@code v}.
   * @param   v the integer corresponding to a vertex (between 0 and <em>V</em> - 1)
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
   * @param   v the integer corresponding to a vertex (between 0 and <em>V</em> - 1)
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   * @return  the name of the vertex associated with the integer {@code v}
   */
  public nameOf(v: number): string {
    this.validateVertex(v);
    return this.keys[v];
  }

  /**
   * Returns the graph assoicated with the symbol graph. It is the client's responsibility
   * not to mutate the graph.
   * @return {Graph} the graph associated with the symbol graph
   * @deprecated Replaced by {@link #graph()}.
   */
  public G(): Graph {
    return this.__graph;
  }

  /**
   * Returns the graph assoicated with the symbol graph. It is the client's responsibility
   * not to mutate the graph.
   * @return {Graph} the graph associated with the symbol graph
   */
  public graph(): Graph {
    return this.__graph;
  }

  private validateVertex(v: number) {
    const V: number = this.__graph.V();
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the {@code SymbolGraph} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const filename: string = args[0];
    const delimiter: string = args[1];
    const sg: SymbolGraph = new SymbolGraph(filename, delimiter);
    const graph: Graph = sg.graph();
    while (StdIn.hasNextLine()) {
      {
        const source: string = StdIn.readLine();
        if (sg.contains(source)) {
          const s: number = sg.index(source);
          for (let index361 = graph.adj(s).iterator(); index361.hasNext(); ) {
            const v = index361.next();
            {
              StdOut.println$java_lang_Object(`   ${sg.name(v)}`);
            }
          }
        } else {
          StdOut.println$java_lang_Object(`input not contain '${source}'`);
        }
      }
    }
  }
}
SymbolGraph.__class = 'edu.princeton.cs.algs4.SymbolGraph';

SymbolGraph.main(null);
