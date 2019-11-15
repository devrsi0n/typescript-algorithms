import { DirectedEdge } from './DirectedEdge';
import { Stack } from './Stack';
import { EdgeWeightedDigraph } from './EdgeWeightedDigraph';
import { StdRandom } from './StdRandom';
import { StdOut } from './StdOut';

/**
 * Determines whether the edge-weighted digraph `G` has a directed cycle and,
 * if so, finds such a cycle.
 * @param {EdgeWeightedDigraph} G the edge-weighted digraph
 * @class
 * @author Robert Sedgewick
 */
export class EdgeWeightedDirectedCycle {
  private marked: boolean[];

  private edgeTo: DirectedEdge[];

  private onStack: boolean[];

  private __cycle: Stack<DirectedEdge>;

  public constructor(G: EdgeWeightedDigraph) {
    if (this.marked === undefined) this.marked = null;
    if (this.edgeTo === undefined) this.edgeTo = null;
    if (this.onStack === undefined) this.onStack = null;
    if (this.__cycle === undefined) this.__cycle = null;
    this.marked = ((s) => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    this.onStack = ((s) => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    this.edgeTo = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) this.dfs(G, v);
    }
  }

  private dfs(G: EdgeWeightedDigraph, v: number) {
    this.onStack[v] = true;
    this.marked[v] = true;
    for (let index238 = G.adj(v).iterator(); index238.hasNext(); ) {
      const e = index238.next();
      {
        const w: number = e.to();
        if (this.__cycle != null) return;
        if (!this.marked[w]) {
          this.edgeTo[w] = e;
          this.dfs(G, w);
        } else if (this.onStack[w]) {
          this.__cycle = <any>new Stack<DirectedEdge>();
          let f: DirectedEdge = e;
          while (f.from() !== w) {
            {
              this.__cycle.push(f);
              f = this.edgeTo[f.from()];
            }
          }
          this.__cycle.push(f);
          return;
        }
      }
    }
    this.onStack[v] = false;
  }

  /**
   * Does the edge-weighted digraph have a directed cycle?
   * @return  `true` if the edge-weighted digraph has a directed cycle,
   * `false` otherwise
   */
  public hasCycle(): boolean {
    return this.__cycle != null;
  }

  /**
   * Returns a directed cycle if the edge-weighted digraph has a directed cycle,
   * and `null` otherwise.
   * @return  a directed cycle (as an iterable) if the edge-weighted digraph
   * has a directed cycle, and `null` otherwise
   */
  public cycle(): Iterable<DirectedEdge> {
    return this.__cycle;
  }

  private check(): boolean {
    if (this.hasCycle()) {
      let first: DirectedEdge = null;
      let last: DirectedEdge = null;
      for (let index239 = this.cycle().iterator(); index239.hasNext(); ) {
        const e = index239.next();
        {
          if (first == null) first = e;
          if (last != null) {
            if (last.to() !== e.from()) {
              console.error('cycle edges %s and %s not incident\n');
              return false;
            }
          }
          last = e;
        }
      }
      if (last.to() !== first.from()) {
        console.error('cycle edges %s and %s not incident\n');
        return false;
      }
    }
    return true;
  }

  /**
   * Unit tests the `EdgeWeightedDirectedCycle` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const V: number = parseInt(args[0]);
    const E: number = parseInt(args[1]);
    const F: number = parseInt(args[2]);
    const G: EdgeWeightedDigraph = new EdgeWeightedDigraph(V);
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let i = 0; i < V; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    for (let i = 0; i < E; i++) {
      {
        let v: number;
        let w: number;
        do {
          {
            v = StdRandom.uniform$int(V);
            w = StdRandom.uniform$int(V);
          }
        } while (v >= w);
        const weight: number = StdRandom.uniform();
        G.addEdge(new DirectedEdge(v, w, weight));
      }
    }
    for (let i = 0; i < F; i++) {
      {
        const v: number = StdRandom.uniform$int(V);
        const w: number = StdRandom.uniform$int(V);
        const weight: number = StdRandom.uniform$double$double(0.0, 1.0);
        G.addEdge(new DirectedEdge(v, w, weight));
      }
    }
    StdOut.println$java_lang_Object(G);
    const finder: EdgeWeightedDirectedCycle = new EdgeWeightedDirectedCycle(G);
    if (finder.hasCycle()) {
      StdOut.print$java_lang_Object('Cycle: ');
      for (let index240 = finder.cycle().iterator(); index240.hasNext(); ) {
        const e = index240.next();
        {
          StdOut.print$java_lang_Object(`${e} `);
        }
      }
      StdOut.println();
    } else {
      StdOut.println$java_lang_Object('No directed cycle');
    }
  }
}
EdgeWeightedDirectedCycle.__class =
  'edu.princeton.cs.algs4.EdgeWeightedDirectedCycle';

EdgeWeightedDirectedCycle.main(null);
