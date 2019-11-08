import { Stack } from './Stack';
import { Digraph } from './Digraph';
import { Graph } from './Graph';
import { BreadthFirstPaths } from './BreadthFirstPaths';
import { StdOut } from './StdOut';
import { DigraphGenerator } from './DigraphGenerator';
import { StdRandom } from './StdRandom';
import { In } from './In';

/**
 * Computes an Eulerian path in the specified digraph, if one exists.
 *
 * @param {Digraph} G the digraph
 * @class
 * @author Robert Sedgewick
 */
export class DirectedEulerianPath {
  private __path: Stack<number> = null;

  public constructor(G: Digraph) {
    let deficit = 0;
    let s: number = DirectedEulerianPath.nonIsolatedVertex(G);
    for (let v = 0; v < G.V(); v++) {
      {
        if (G.outdegree(v) > G.indegree(v)) {
          deficit += G.outdegree(v) - G.indegree(v);
          s = v;
        }
      }
    }
    if (deficit > 1) return;
    if (s === -1) s = 0;
    const adj: Iterator<number>[] = <Iterator<number>[]>(s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      adj[v] = G.adj(v).iterator();
    }
    const stack: Stack<number> = <any>new Stack<number>();
    stack.push(s);
    this.__path = <any>new Stack<number>();
    while (!stack.isEmpty()) {
      {
        let v: number = stack.pop();
        while (adj[v].hasNext()) {
          {
            stack.push(v);
            v = adj[v].next();
          }
        }
        this.__path.push(v);
      }
    }
    if (this.__path.size() !== G.E() + 1) this.__path = null;
  }

  /**
   * Returns the sequence of vertices on an Eulerian path.
   *
   * @return  the sequence of vertices on an Eulerian path;
   * {@code null} if no such path
   */
  public path(): Iterable<number> {
    return this.__path;
  }

  /**
   * Returns true if the digraph has an Eulerian path.
   *
   * @return  {@code true} if the digraph has an Eulerian path;
   * {@code false} otherwise
   */
  public hasEulerianPath(): boolean {
    return this.__path != null;
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
    if (G.E() === 0) return true;
    let deficit = 0;
    for (let v = 0; v < G.V(); v++) {
      if (G.outdegree(v) > G.indegree(v))
        deficit += G.outdegree(v) - G.indegree(v);
    }
    if (deficit > 1) return false;
    const H: Graph = new Graph(G.V());
    for (let v = 0; v < G.V(); v++) {
      for (let index225 = G.adj(v).iterator(); index225.hasNext(); ) {
        const w = index225.next();
        H.addEdge(v, w);
      }
    }
    const s: number = DirectedEulerianPath.nonIsolatedVertex(G);
    const bfs: BreadthFirstPaths = new BreadthFirstPaths(H, s);
    for (let v = 0; v < G.V(); v++) {
      if (H.degree(v) > 0 && !bfs.hasPathTo(v)) return false;
    }
    return true;
  }

  private check(G: Digraph): boolean {
    if (this.hasEulerianPath() === (this.path() == null)) return false;
    if (
      this.hasEulerianPath() !==
      DirectedEulerianPath.satisfiesNecessaryAndSufficientConditions(G)
    )
      return false;
    if (this.__path == null) return true;
    if (this.__path.size() !== G.E() + 1) return false;
    return true;
  }

  private static unitTest(G: Digraph, description: string) {
    StdOut.println$java_lang_Object(description);
    StdOut.println$java_lang_Object('-------------------------------------');
    StdOut.print$java_lang_Object(G);
    const euler: DirectedEulerianPath = new DirectedEulerianPath(G);
    StdOut.print$java_lang_Object('Eulerian path:  ');
    if (euler.hasEulerianPath()) {
      for (let index226 = euler.path().iterator(); index226.hasNext(); ) {
        const v = index226.next();
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
   * Unit tests the {@code DirectedEulerianPath} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const V: number = parseInt(args[0]);
    const E: number = parseInt(args[1]);
    const G1: Digraph = DigraphGenerator.eulerianCycle(V, E);
    DirectedEulerianPath.unitTest(G1, 'Eulerian cycle');
    const G2: Digraph = DigraphGenerator.eulerianPath(V, E);
    DirectedEulerianPath.unitTest(G2, 'Eulerian path');
    const G3: Digraph = new Digraph(G2);
    G3.addEdge(StdRandom.uniform$int(V), StdRandom.uniform$int(V));
    DirectedEulerianPath.unitTest(G3, 'one random edge added to Eulerian path');
    const G4: Digraph = new Digraph(V);
    const v4: number = StdRandom.uniform$int(V);
    G4.addEdge(v4, v4);
    DirectedEulerianPath.unitTest(G4, 'single self loop');
    const G5: Digraph = new Digraph(V);
    G5.addEdge(StdRandom.uniform$int(V), StdRandom.uniform$int(V));
    DirectedEulerianPath.unitTest(G5, 'single edge');
    const G6: Digraph = new Digraph(V);
    DirectedEulerianPath.unitTest(G6, 'empty digraph');
    const G7: Digraph = DigraphGenerator.simple$int$int(V, E);
    DirectedEulerianPath.unitTest(G7, 'simple digraph');
    const G8: Digraph = new Digraph(new In('eulerianD.txt'));
    DirectedEulerianPath.unitTest(G8, '4-vertex Eulerian digraph');
  }
}
DirectedEulerianPath.__class = 'edu.princeton.cs.algs4.DirectedEulerianPath';

DirectedEulerianPath.main(null);
