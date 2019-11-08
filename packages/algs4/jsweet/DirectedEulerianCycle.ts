import { Stack } from './Stack';
import { Digraph } from './Digraph';
import { Graph } from './Graph';
import { BreadthFirstPaths } from './BreadthFirstPaths';
import { StdOut } from './StdOut';
import { DigraphGenerator } from './DigraphGenerator';
import { StdRandom } from './StdRandom';
import { In } from './In';

/**
 * Computes an Eulerian cycle in the specified digraph, if one exists.
 *
 * @param {Digraph} G the digraph
 * @class
 * @author Robert Sedgewick
 */
export class DirectedEulerianCycle {
  private __cycle: Stack<number> = null;

  public constructor(G: Digraph) {
    if (G.E() === 0) return;
    for (let v = 0; v < G.V(); v++) {
      if (G.outdegree(v) !== G.indegree(v)) return;
    }
    const adj: Iterator<number>[] = <Iterator<number>[]>(s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      adj[v] = G.adj(v).iterator();
    }
    const s: number = DirectedEulerianCycle.nonIsolatedVertex(G);
    const stack: Stack<number> = <any>new Stack<number>();
    stack.push(s);
    this.__cycle = <any>new Stack<number>();
    while (!stack.isEmpty()) {
      {
        let v: number = stack.pop();
        while (adj[v].hasNext()) {
          {
            stack.push(v);
            v = adj[v].next();
          }
        }
        this.__cycle.push(v);
      }
    }
    if (this.__cycle.size() !== G.E() + 1) this.__cycle = null;
  }

  /**
   * Returns the sequence of vertices on an Eulerian cycle.
   *
   * @return  the sequence of vertices on an Eulerian cycle;
   * {@code null} if no such cycle
   */
  public cycle(): Iterable<number> {
    return this.__cycle;
  }

  /**
   * Returns true if the digraph has an Eulerian cycle.
   *
   * @return  {@code true} if the digraph has an Eulerian cycle;
   * {@code false} otherwise
   */
  public hasEulerianCycle(): boolean {
    return this.__cycle != null;
  }

  private static nonIsolatedVertex(G: Digraph): number {
    for (let v = 0; v < G.V(); v++) {
      if (G.outdegree(v) > 0) return v;
    }
    return -1;
  }

  /**
   *
   * The code below is solely for testing correctness of the data type.
   * @param {Digraph} G
   * @return
   * @private
   */
  private static satisfiesNecessaryAndSufficientConditions(
    G: Digraph
  ): boolean {
    if (G.E() === 0) return false;
    for (let v = 0; v < G.V(); v++) {
      if (G.outdegree(v) !== G.indegree(v)) return false;
    }
    const H: Graph = new Graph(G.V());
    for (let v = 0; v < G.V(); v++) {
      for (let index221 = G.adj(v).iterator(); index221.hasNext(); ) {
        const w = index221.next();
        H.addEdge(v, w);
      }
    }
    const s: number = DirectedEulerianCycle.nonIsolatedVertex(G);
    const bfs: BreadthFirstPaths = new BreadthFirstPaths(H, s);
    for (let v = 0; v < G.V(); v++) {
      if (H.degree(v) > 0 && !bfs.hasPathTo(v)) return false;
    }
    return true;
  }

  private certifySolution(G: Digraph): boolean {
    if (this.hasEulerianCycle() === (this.cycle() == null)) return false;
    if (
      this.hasEulerianCycle() !==
      DirectedEulerianCycle.satisfiesNecessaryAndSufficientConditions(G)
    )
      return false;
    if (this.__cycle == null) return true;
    if (this.__cycle.size() !== G.E() + 1) return false;
    return true;
  }

  private static unitTest(G: Digraph, description: string) {
    StdOut.println$java_lang_Object(description);
    StdOut.println$java_lang_Object('-------------------------------------');
    StdOut.print$java_lang_Object(G);
    const euler: DirectedEulerianCycle = new DirectedEulerianCycle(G);
    StdOut.print$java_lang_Object('Eulerian cycle: ');
    if (euler.hasEulerianCycle()) {
      for (let index222 = euler.cycle().iterator(); index222.hasNext(); ) {
        const v = index222.next();
        {
          StdOut.print$java_lang_Object(`${v} `);
        }
      }
      StdOut.println();
    } else {
      StdOut.println$java_lang_Object('none');
    }
    StdOut.println();
  }

  /**
   * Unit tests the {@code DirectedEulerianCycle} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const V: number = parseInt(args[0]);
    const E: number = parseInt(args[1]);
    const G1: Digraph = DigraphGenerator.eulerianCycle(V, E);
    DirectedEulerianCycle.unitTest(G1, 'Eulerian cycle');
    const G2: Digraph = DigraphGenerator.eulerianPath(V, E);
    DirectedEulerianCycle.unitTest(G2, 'Eulerian path');
    const G3: Digraph = new Digraph(V);
    DirectedEulerianCycle.unitTest(G3, 'empty digraph');
    const G4: Digraph = new Digraph(V);
    const v4: number = StdRandom.uniform$int(V);
    G4.addEdge(v4, v4);
    DirectedEulerianCycle.unitTest(G4, 'single self loop');
    const H1: Digraph = DigraphGenerator.eulerianCycle(
      (V / 2) | 0,
      (E / 2) | 0
    );
    const H2: Digraph = DigraphGenerator.eulerianCycle(
      V - ((V / 2) | 0),
      E - ((E / 2) | 0)
    );
    const perm: number[] = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let i = 0; i < V; i++) {
      perm[i] = i;
    }
    StdRandom.shuffle$int_A(perm);
    const G5: Digraph = new Digraph(V);
    for (let v = 0; v < H1.V(); v++) {
      for (let index223 = H1.adj(v).iterator(); index223.hasNext(); ) {
        const w = index223.next();
        G5.addEdge(perm[v], perm[w]);
      }
    }
    for (let v = 0; v < H2.V(); v++) {
      for (let index224 = H2.adj(v).iterator(); index224.hasNext(); ) {
        const w = index224.next();
        G5.addEdge(perm[((V / 2) | 0) + v], perm[((V / 2) | 0) + w]);
      }
    }
    DirectedEulerianCycle.unitTest(G5, 'Union of two disjoint cycles');
    const G6: Digraph = DigraphGenerator.simple$int$int(V, E);
    DirectedEulerianCycle.unitTest(G6, 'simple digraph');
    const G7: Digraph = new Digraph(new In('eulerianD.txt'));
    DirectedEulerianCycle.unitTest(G7, '4-vertex Eulerian digraph');
  }
}
DirectedEulerianCycle.__class = 'edu.princeton.cs.algs4.DirectedEulerianCycle';

DirectedEulerianCycle.main(null);
