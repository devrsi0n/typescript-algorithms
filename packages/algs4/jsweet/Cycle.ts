import { Stack } from './Stack';
import { Graph } from './Graph';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Determines whether the undirected graph {@code G} has a cycle and,
 * if so, finds such a cycle.
 *
 * @param {Graph} G the undirected graph
 * @class
 * @author Robert Sedgewick
 */
export class Cycle {
  private marked: boolean[];

  private edgeTo: number[];

  private __cycle: Stack<number>;

  public constructor(G: Graph) {
    if (this.marked === undefined) this.marked = null;
    if (this.edgeTo === undefined) this.edgeTo = null;
    if (this.__cycle === undefined) this.__cycle = null;
    if (this.hasSelfLoop(G)) return;
    if (this.hasParallelEdges(G)) return;
    this.marked = (s => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    this.edgeTo = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v]) this.dfs(G, -1, v);
    }
  }

  private hasSelfLoop(G: Graph): boolean {
    for (let v = 0; v < G.V(); v++) {
      {
        for (let index177 = G.adj(v).iterator(); index177.hasNext(); ) {
          const w = index177.next();
          {
            if (v === w) {
              this.__cycle = <any>new Stack<number>();
              this.__cycle.push(v);
              this.__cycle.push(v);
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  private hasParallelEdges(G: Graph): boolean {
    this.marked = (s => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      {
        for (let index178 = G.adj(v).iterator(); index178.hasNext(); ) {
          const w = index178.next();
          {
            if (this.marked[w]) {
              this.__cycle = <any>new Stack<number>();
              this.__cycle.push(v);
              this.__cycle.push(w);
              this.__cycle.push(v);
              return true;
            }
            this.marked[w] = true;
          }
        }
        for (let index179 = G.adj(v).iterator(); index179.hasNext(); ) {
          const w = index179.next();
          {
            this.marked[w] = false;
          }
        }
      }
    }
    return false;
  }

  /**
   * Returns true if the graph {@code G} has a cycle.
   *
   * @return  {@code true} if the graph has a cycle; {@code false} otherwise
   */
  public hasCycle(): boolean {
    return this.__cycle != null;
  }

  /**
   * Returns a cycle in the graph {@code G}.
   * @return  a cycle if the graph {@code G} has a cycle,
   * and {@code null} otherwise
   */
  public cycle(): Iterable<number> {
    return this.__cycle;
  }

  private dfs(G: Graph, u: number, v: number) {
    this.marked[v] = true;
    for (let index180 = G.adj(v).iterator(); index180.hasNext(); ) {
      const w = index180.next();
      {
        if (this.__cycle != null) return;
        if (!this.marked[w]) {
          this.edgeTo[w] = v;
          this.dfs(G, v, w);
        } else if (w !== u) {
          this.__cycle = <any>new Stack<number>();
          for (let x: number = v; x !== w; x = this.edgeTo[x]) {
            {
              this.__cycle.push(x);
            }
          }
          this.__cycle.push(w);
          this.__cycle.push(v);
        }
      }
    }
  }

  /**
   * Unit tests the {@code Cycle} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Graph = new Graph(__in);
    const finder: Cycle = new Cycle(G);
    if (finder.hasCycle()) {
      for (let index181 = finder.cycle().iterator(); index181.hasNext(); ) {
        const v = index181.next();
        {
          StdOut.print$java_lang_Object(`${v} `);
        }
      }
      StdOut.println();
    } else {
      StdOut.println$java_lang_Object('Graph is acyclic');
    }
  }
}
Cycle.__class = 'edu.princeton.cs.algs4.Cycle';

Cycle.main(null);
