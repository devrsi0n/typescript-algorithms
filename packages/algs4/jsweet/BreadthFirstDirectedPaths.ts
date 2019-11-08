import { Digraph } from './Digraph';
import { Queue } from './Queue';
import { Stack } from './Stack';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Computes the shortest path from {@code s} and every other vertex in graph {@code G}.
 * @param {Digraph} G the digraph
 * @param {number} s the source vertex
 * @throws IllegalArgumentException unless {@code 0 <= v < V}
 * @class
 * @author Robert Sedgewick
 */
export class BreadthFirstDirectedPaths {
  static INFINITY: number;
  public static INFINITY_$LI$(): number {
    if (BreadthFirstDirectedPaths.INFINITY == null)
      BreadthFirstDirectedPaths.INFINITY =
        Number.MAX_VALUE;
    return BreadthFirstDirectedPaths.INFINITY;
  }

  private marked: boolean[];

  private edgeTo: number[];

  private __distTo: number[];

  public constructor(G?: any, sources?: any) {
    if (
      ((G != null && G instanceof <any>Digraph) || G === null) &&
      ((sources != null &&
        ((sources.__interfaces != null &&
          sources.__interfaces.indexOf('Iterable') >= 0) ||
          (sources.constructor != null &&
            sources.constructor.__interfaces != null &&
            sources.constructor.__interfaces.indexOf('Iterable') >=
              0))) ||
        sources === null)
    ) {
      const __args = arguments;
      if (this.marked === undefined) this.marked = null;
      if (this.edgeTo === undefined) this.edgeTo = null;
      if (this.__distTo === undefined) this.__distTo = null;
      if (this.marked === undefined) this.marked = null;
      if (this.edgeTo === undefined) this.edgeTo = null;
      if (this.__distTo === undefined) this.__distTo = null;
      (() => {
        this.marked = (s => {
          const a = [];
          while (s-- > 0) a.push(false);
          return a;
        })(G.V());
        this.__distTo = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.edgeTo = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        for (let v = 0; v < G.V(); v++) {
          this.__distTo[v] = BreadthFirstDirectedPaths.INFINITY_$LI$();
        }
        this.validateVertices(sources);
        this.bfs$edu_princeton_cs_algs4_Digraph$java_lang_Iterable(G, sources);
      })();
    } else if (
      ((G != null && G instanceof <any>Digraph) || G === null) &&
      (typeof sources === 'number' || sources === null)
    ) {
      const __args = arguments;
      const s: any = __args[1];
      if (this.marked === undefined) this.marked = null;
      if (this.edgeTo === undefined) this.edgeTo = null;
      if (this.__distTo === undefined) this.__distTo = null;
      if (this.marked === undefined) this.marked = null;
      if (this.edgeTo === undefined) this.edgeTo = null;
      if (this.__distTo === undefined) this.__distTo = null;
      (() => {
        this.marked = (s => {
          const a = [];
          while (s-- > 0) a.push(false);
          return a;
        })(G.V());
        this.__distTo = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.edgeTo = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        for (let v = 0; v < G.V(); v++) {
          this.__distTo[v] = BreadthFirstDirectedPaths.INFINITY_$LI$();
        }
        this.validateVertex(s);
        this.bfs$edu_princeton_cs_algs4_Digraph$int(G, s);
      })();
    } else throw new Error('invalid overload');
  }

  private bfs$edu_princeton_cs_algs4_Digraph$int(G: Digraph, s: number) {
    const q: Queue<number> = <any>new Queue<number>();
    this.marked[s] = true;
    this.__distTo[s] = 0;
    q.enqueue(s);
    while (!q.isEmpty()) {
      {
        const v: number = q.dequeue();
        for (let index160 = G.adj(v).iterator(); index160.hasNext(); ) {
          const w = index160.next();
          {
            if (!this.marked[w]) {
              this.edgeTo[w] = v;
              this.__distTo[w] = this.__distTo[v] + 1;
              this.marked[w] = true;
              q.enqueue(w);
            }
          }
        }
      }
    }
  }

  public bfs$edu_princeton_cs_algs4_Digraph$java_lang_Iterable(
    G: Digraph,
    sources: Iterable<number>
  ) {
    const q: Queue<number> = <any>new Queue<number>();
    for (let index161 = sources.iterator(); index161.hasNext(); ) {
      const s = index161.next();
      {
        this.marked[s] = true;
        this.__distTo[s] = 0;
        q.enqueue(s);
      }
    }
    while (!q.isEmpty()) {
      {
        const v: number = q.dequeue();
        for (let index162 = G.adj(v).iterator(); index162.hasNext(); ) {
          const w = index162.next();
          {
            if (!this.marked[w]) {
              this.edgeTo[w] = v;
              this.__distTo[w] = this.__distTo[v] + 1;
              this.marked[w] = true;
              q.enqueue(w);
            }
          }
        }
      }
    }
  }

  public bfs(G?: any, sources?: any): any {
    if (
      ((G != null && G instanceof <any>Digraph) || G === null) &&
      ((sources != null &&
        ((sources.__interfaces != null &&
          sources.__interfaces.indexOf('Iterable') >= 0) ||
          (sources.constructor != null &&
            sources.constructor.__interfaces != null &&
            sources.constructor.__interfaces.indexOf('Iterable') >=
              0))) ||
        sources === null)
    ) {
      return <any>(
        this.bfs$edu_princeton_cs_algs4_Digraph$java_lang_Iterable(G, sources)
      );
    }
    if (
      ((G != null && G instanceof <any>Digraph) || G === null) &&
      (typeof sources === 'number' || sources === null)
    ) {
      return <any>this.bfs$edu_princeton_cs_algs4_Digraph$int(G, sources);
    }
    throw new Error('invalid overload');
  }

  /**
   * Is there a directed path from the source {@code s} (or sources) to vertex {@code v}?
   * @param {number} v the vertex
   * @return  {@code true} if there is a directed path, {@code false} otherwise
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public hasPathTo(v: number): boolean {
    this.validateVertex(v);
    return this.marked[v];
  }

  /**
   * Returns the number of edges in a shortest path from the source {@code s}
   * (or sources) to vertex {@code v}?
   * @param {number} v the vertex
   * @return  the number of edges in a shortest path
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public distTo(v: number): number {
    this.validateVertex(v);
    return this.__distTo[v];
  }

  /**
   * Returns a shortest path from {@code s} (or sources) to {@code v}, or
   * {@code null} if no such path.
   * @param {number} v the vertex
   * @return  the sequence of vertices on a shortest path, as an Iterable
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public pathTo(v: number): Iterable<number> {
    this.validateVertex(v);
    if (!this.hasPathTo(v)) return null;
    const path: Stack<number> = <any>new Stack<number>();
    let x: number;
    for (x = v; this.__distTo[x] !== 0; x = this.edgeTo[x]) {
      path.push(x);
    }
    path.push(x);
    return path;
  }

  private validateVertex(v: number) {
    const V: number = this.marked.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  private validateVertices(vertices: Iterable<number>) {
    if (vertices == null) {
      throw new Error('argument is null');
    }
    const V: number = this.marked.length;
    for (let index163 = vertices.iterator(); index163.hasNext(); ) {
      const v = index163.next();
      {
        if (v < 0 || v >= V) {
          throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
        }
      }
    }
  }

  /**
   * Unit tests the {@code BreadthFirstDirectedPaths} data type.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Digraph = new Digraph(__in);
    const s: number = parseInt(args[1]);
    const bfs: BreadthFirstDirectedPaths = new BreadthFirstDirectedPaths(G, s);
    for (let v = 0; v < G.V(); v++) {
      {
        if (bfs.hasPathTo(v)) {
          StdOut.printf('%d to %d (%d):  ', s, v, bfs.distTo(v));
          for (let index164 = bfs.pathTo(v).iterator(); index164.hasNext(); ) {
            const x = index164.next();
            {
              if (x === s) StdOut.print$int(x);
              else StdOut.print$java_lang_Object(`->${x}`);
            }
          }
          StdOut.println();
        } else {
          StdOut.printf('%d to %d (-):  not connected\n', s, v);
        }
      }
    }
  }
}
BreadthFirstDirectedPaths.__class =
  'edu.princeton.cs.algs4.BreadthFirstDirectedPaths';

BreadthFirstDirectedPaths.INFINITY_$LI$();

BreadthFirstDirectedPaths.main(null);
