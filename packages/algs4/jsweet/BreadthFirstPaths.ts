import { Graph } from './Graph';
import { Queue } from './Queue';
import { Stack } from './Stack';
import { StdOut } from './StdOut';
import { In } from './In';

/**
 * Computes the shortest path between the source vertex `s`
 * and every other vertex in the graph `G`.
 * @param {Graph} G the graph
 * @param  s the source vertex
 * @throws IllegalArgumentException unless `0 <= s < V`
 * @class
 * @author Robert Sedgewick
 */
export class BreadthFirstPaths {
  static INFINITY: number;
  public static INFINITY_$LI$(): number {
    if (BreadthFirstPaths.INFINITY == null)
      BreadthFirstPaths.INFINITY = Number.MAX_VALUE;
    return BreadthFirstPaths.INFINITY;
  }

  private marked: boolean[];

  private edgeTo: number[];

  private __distTo: number[];

  public constructor(G?: any, sources?: any) {
    if (
      ((G != null && G instanceof <any>Graph) || G === null) &&
      ((sources != null &&
        ((sources.__interfaces != null &&
          sources.__interfaces.indexOf('Iterable') >= 0) ||
          (sources.constructor != null &&
            sources.constructor.__interfaces != null &&
            sources.constructor.__interfaces.indexOf('Iterable') >= 0))) ||
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
        this.marked = ((s) => {
          const a = [];
          while (s-- > 0) a.push(false);
          return a;
        })(G.V());
        this.__distTo = ((s) => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.edgeTo = ((s) => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        for (let v = 0; v < G.V(); v++) {
          this.__distTo[v] = BreadthFirstPaths.INFINITY_$LI$();
        }
        this.validateVertices(sources);
        this.bfs$edu_princeton_cs_algs4_Graph$java_lang_Iterable(G, sources);
      })();
    } else if (
      ((G != null && G instanceof <any>Graph) || G === null) &&
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
        this.marked = ((s) => {
          const a = [];
          while (s-- > 0) a.push(false);
          return a;
        })(G.V());
        this.__distTo = ((s) => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.edgeTo = ((s) => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.validateVertex(s);
        this.bfs$edu_princeton_cs_algs4_Graph$int(G, s);
      })();
    } else throw new Error('invalid overload');
  }

  private bfs$edu_princeton_cs_algs4_Graph$int(G: Graph, s: number) {
    const q: Queue<number> = <any>new Queue<number>();
    for (let v = 0; v < G.V(); v++) {
      this.__distTo[v] = BreadthFirstPaths.INFINITY_$LI$();
    }
    this.__distTo[s] = 0;
    this.marked[s] = true;
    q.enqueue(s);
    while (!q.isEmpty()) {
      {
        const v: number = q.dequeue();
        for (let index165 = G.adj(v).iterator(); index165.hasNext(); ) {
          const w = index165.next();
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

  public bfs$edu_princeton_cs_algs4_Graph$java_lang_Iterable(
    G: Graph,
    sources: Iterable<number>
  ) {
    const q: Queue<number> = <any>new Queue<number>();
    for (let index166 = sources.iterator(); index166.hasNext(); ) {
      const s = index166.next();
      {
        this.marked[s] = true;
        this.__distTo[s] = 0;
        q.enqueue(s);
      }
    }
    while (!q.isEmpty()) {
      {
        const v: number = q.dequeue();
        for (let index167 = G.adj(v).iterator(); index167.hasNext(); ) {
          const w = index167.next();
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
      ((G != null && G instanceof <any>Graph) || G === null) &&
      ((sources != null &&
        ((sources.__interfaces != null &&
          sources.__interfaces.indexOf('Iterable') >= 0) ||
          (sources.constructor != null &&
            sources.constructor.__interfaces != null &&
            sources.constructor.__interfaces.indexOf('Iterable') >= 0))) ||
        sources === null)
    ) {
      return <any>(
        this.bfs$edu_princeton_cs_algs4_Graph$java_lang_Iterable(G, sources)
      );
    }
    if (
      ((G != null && G instanceof <any>Graph) || G === null) &&
      (typeof sources === 'number' || sources === null)
    ) {
      return <any>this.bfs$edu_princeton_cs_algs4_Graph$int(G, sources);
    }
    throw new Error('invalid overload');
  }

  /**
   * Is there a path between the source vertex `s` (or sources) and vertex `v`?
   * @param  v the vertex
   * @return  `true` if there is a path, and `false` otherwise
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public hasPathTo(v: number): boolean {
    this.validateVertex(v);
    return this.marked[v];
  }

  /**
   * Returns the number of edges in a shortest path between the source vertex `s`
   * (or sources) and vertex `v`?
   * @param  v the vertex
   * @return  the number of edges in a shortest path
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public distTo(v: number): number {
    this.validateVertex(v);
    return this.__distTo[v];
  }

  /**
   * Returns a shortest path between the source vertex `s` (or sources)
   * and `v`, or `null` if no such path.
   * @param   v the vertex
   * @return  the sequence of vertices on a shortest path, as an Iterable
   * @throws IllegalArgumentException unless `0 <= v < V`
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

  private check(G: Graph, s: number): boolean {
    if (this.__distTo[s] !== 0) {
      StdOut.println$java_lang_Object(
        `distance of source ${s} to itself = ${this.__distTo[s]}`
      );
      return false;
    }
    for (let v = 0; v < G.V(); v++) {
      {
        for (let index168 = G.adj(v).iterator(); index168.hasNext(); ) {
          const w = index168.next();
          {
            if (this.hasPathTo(v) !== this.hasPathTo(w)) {
              StdOut.println$java_lang_Object(`edge ${v}-${w}`);
              StdOut.println$java_lang_Object(
                `hasPathTo(${v}) = ${this.hasPathTo(v)}`
              );
              StdOut.println$java_lang_Object(
                `hasPathTo(${w}) = ${this.hasPathTo(w)}`
              );
              return false;
            }
            if (this.hasPathTo(v) && this.__distTo[w] > this.__distTo[v] + 1) {
              StdOut.println$java_lang_Object(`edge ${v}-${w}`);
              StdOut.println$java_lang_Object(
                `distTo[${v}] = ${this.__distTo[v]}`
              );
              StdOut.println$java_lang_Object(
                `distTo[${w}] = ${this.__distTo[w]}`
              );
              return false;
            }
          }
        }
      }
    }
    for (let w = 0; w < G.V(); w++) {
      {
        if (!this.hasPathTo(w) || w === s) continue;
        const v: number = this.edgeTo[w];
        if (this.__distTo[w] !== this.__distTo[v] + 1) {
          StdOut.println$java_lang_Object(`shortest path edge ${v}-${w}`);
          StdOut.println$java_lang_Object(`distTo[${v}] = ${this.__distTo[v]}`);
          StdOut.println$java_lang_Object(`distTo[${w}] = ${this.__distTo[w]}`);
          return false;
        }
      }
    }
    return true;
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
    for (let index169 = vertices.iterator(); index169.hasNext(); ) {
      const v = index169.next();
      {
        if (v < 0 || v >= V) {
          throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
        }
      }
    }
  }

  /**
   * Unit tests the `BreadthFirstPaths` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const __in: In = new In(args[0]);
    const G: Graph = new Graph(__in);
    const s: number = parseInt(args[1]);
    const bfs: BreadthFirstPaths = new BreadthFirstPaths(G, s);
    for (let v = 0; v < G.V(); v++) {
      {
        if (bfs.hasPathTo(v)) {
          StdOut.printf('%d to %d (%d):  ', s, v, bfs.distTo(v));
          for (let index170 = bfs.pathTo(v).iterator(); index170.hasNext(); ) {
            const x = index170.next();
            {
              if (x === s) StdOut.print$int(x);
              else StdOut.print$java_lang_Object(`-${x}`);
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
BreadthFirstPaths.__class = 'edu.princeton.cs.algs4.BreadthFirstPaths';

BreadthFirstPaths.INFINITY_$LI$();

BreadthFirstPaths.main(null);
