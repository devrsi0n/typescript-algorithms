import { Stack } from './Stack';
import { Digraph } from './Digraph';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Determines whether the digraph `G` has a directed cycle and, if so,
 * finds such a cycle.
 * @param {Digraph} G the digraph
 * @class
 * @author Robert Sedgewick
 */
export class DirectedCycle {
  private marked: boolean[];

  private edgeTo: number[];

  private onStack: boolean[];

  private __cycle: Stack<number>;

  public constructor(G: Digraph) {
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
      while (s-- > 0) a.push(0);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      if (!this.marked[v] && this.__cycle == null) this.dfs(G, v);
    }
  }

  private dfs(G: Digraph, v: number) {
    this.onStack[v] = true;
    this.marked[v] = true;
    for (let index211 = G.adj(v).iterator(); index211.hasNext(); ) {
      const w = index211.next();
      {
        if (this.__cycle != null) return;
        if (!this.marked[w]) {
          this.edgeTo[w] = v;
          this.dfs(G, w);
        } else if (this.onStack[w]) {
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
    this.onStack[v] = false;
  }

  /**
   * Does the digraph have a directed cycle?
   * @return  `true` if the digraph has a directed cycle, `false` otherwise
   */
  public hasCycle(): boolean {
    return this.__cycle != null;
  }

  /**
   * Returns a directed cycle if the digraph has a directed cycle, and `null` otherwise.
   * @return  a directed cycle (as an iterable) if the digraph has a directed cycle,
   * and `null` otherwise
   */
  public cycle(): Iterable<number> {
    return this.__cycle;
  }

  private check(): boolean {
    if (this.hasCycle()) {
      let first = -1;
      let last = -1;
      for (let index212 = this.cycle().iterator(); index212.hasNext(); ) {
        const v = index212.next();
        {
          if (first === -1) first = v;
          last = v;
        }
      }
      if (first !== last) {
        console.error('cycle begins with %d and ends with %d\n');
        return false;
      }
    }
    return true;
  }

  /**
   * Unit tests the `DirectedCycle` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Digraph = new Digraph(__in);
    const finder: DirectedCycle = new DirectedCycle(G);
    if (finder.hasCycle()) {
      StdOut.print$java_lang_Object('Directed cycle: ');
      for (let index213 = finder.cycle().iterator(); index213.hasNext(); ) {
        const v = index213.next();
        {
          StdOut.print$java_lang_Object(`${v} `);
        }
      }
      StdOut.println();
    } else {
      StdOut.println$java_lang_Object('No directed cycle');
    }
    StdOut.println();
  }
}
DirectedCycle.__class = 'edu.princeton.cs.algs4.DirectedCycle';

DirectedCycle.main(null);
