import { Stack } from './Stack';
import { Digraph } from './Digraph';
import { Queue } from './Queue';
import { DigraphGenerator } from './DigraphGenerator';
import { StdRandom } from './StdRandom';
import { StdOut } from './StdOut';

/**
 * The {@code DirectedCycleX} class represents a data type for
 * determining whether a digraph has a directed cycle.
 * The <em>hasCycle</em> operation determines whether the digraph has
 * a simple directed cycle and, if so, the <em>cycle</em> operation
 * returns one.
 * <p>
 * This implementation uses a nonrecursive, queue-based algorithm.
 * The constructor takes time proportional to <em>V</em> + <em>E</em>
 * (in the worst case),
 * where <em>V</em> is the number of vertices and <em>E</em> is the number of edges.
 * Afterwards, the <em>hasCycle</em> operation takes constant time;
 * the <em>cycle</em> operation takes time proportional
 * to the length of the cycle.
 * <p>
 * See {@link DirectedCycle} for a recursive version that uses depth-first search.
 * See {@link Topological} or {@link TopologicalX} to compute a topological order
 * when the digraph is acyclic.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/42digraph">Section 4.2</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @param {Digraph} G
 * @class
 */
export class DirectedCycleX {
  private __cycle: Stack<number>;

  public constructor(G: Digraph) {
    if (this.__cycle === undefined) this.__cycle = null;
    const indegree: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      {
        indegree[v] = G.indegree(v);
      }
    }
    const queue: Queue<number> = <any>new Queue<number>();
    for (let v = 0; v < G.V(); v++) {
      if (indegree[v] === 0) queue.enqueue(v);
    }
    while (!queue.isEmpty()) {
      {
        const v: number = queue.dequeue();
        for (let index214 = G.adj(v).iterator(); index214.hasNext(); ) {
          const w = index214.next();
          {
            indegree[w]--;
            if (indegree[w] === 0) queue.enqueue(w);
          }
        }
      }
    }
    const edgeTo: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(G.V());
    let root = -1;
    for (let v = 0; v < G.V(); v++) {
      {
        if (indegree[v] === 0) continue;
        else root = v;
        for (let index215 = G.adj(v).iterator(); index215.hasNext(); ) {
          const w = index215.next();
          {
            if (indegree[w] > 0) {
              edgeTo[w] = v;
            }
          }
        }
      }
    }
    if (root !== -1) {
      const visited: boolean[] = (s => {
        const a = [];
        while (s-- > 0) a.push(false);
        return a;
      })(G.V());
      while (!visited[root]) {
        {
          visited[root] = true;
          root = edgeTo[root];
        }
      }
      this.__cycle = <any>new Stack<number>();
      let v: number = root;
      do {
        {
          this.__cycle.push(v);
          v = edgeTo[v];
        }
      } while (v !== root);
      this.__cycle.push(root);
    }
  }

  /**
   * Returns a directed cycle if the digraph has a directed cycle, and {@code null} otherwise.
   * @return  a directed cycle (as an iterable) if the digraph has a directed cycle,
   * and {@code null} otherwise
   */
  public cycle(): Iterable<number> {
    return this.__cycle;
  }

  /**
   * Does the digraph have a directed cycle?
   * @return  {@code true} if the digraph has a directed cycle, {@code false} otherwise
   */
  public hasCycle(): boolean {
    return this.__cycle != null;
  }

  private check(): boolean {
    if (this.hasCycle()) {
      let first = -1;
      let last = -1;
      for (let index216 = this.cycle().iterator(); index216.hasNext(); ) {
        const v = index216.next();
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

  public static main(args: string[]) {
    const V: number = parseInt(args[0]);
    const E: number = parseInt(args[1]);
    const F: number = parseInt(args[2]);
    const G: Digraph = DigraphGenerator.dag(V, E);
    for (let i = 0; i < F; i++) {
      {
        const v: number = StdRandom.uniform$int(V);
        const w: number = StdRandom.uniform$int(V);
        G.addEdge(v, w);
      }
    }
    StdOut.println$java_lang_Object(G);
    const finder: DirectedCycleX = new DirectedCycleX(G);
    if (finder.hasCycle()) {
      StdOut.print$java_lang_Object('Directed cycle: ');
      for (let index217 = finder.cycle().iterator(); index217.hasNext(); ) {
        const v = index217.next();
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
DirectedCycleX.__class = 'edu.princeton.cs.algs4.DirectedCycleX';

DirectedCycleX.main(null);
