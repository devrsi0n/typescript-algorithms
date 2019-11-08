import { Stack } from './Stack';
import { Graph } from './Graph';
import { Queue } from './Queue';
import { BreadthFirstPaths } from './BreadthFirstPaths';
import { StdOut } from './StdOut';
import { GraphGenerator } from './GraphGenerator';
import { StdRandom } from './StdRandom';

/**
 * Computes an Eulerian cycle in the specified graph, if one exists.
 *
 * @param {Graph} G the graph
 * @class
 * @author Robert Sedgewick
 */
export class EulerianCycle {
  private __cycle: Stack<number> = <any>new Stack<number>();

  public constructor(G: Graph) {
    if (G.E() === 0) return;
    for (let v = 0; v < G.V(); v++) {
      if (G.degree(v) % 2 !== 0) return;
    }
    const adj: Queue<EulerianCycle.Edge>[] = <Queue<EulerianCycle.Edge>[]>(
      (s => {
        const a = [];
        while (s-- > 0) a.push(null);
        return a;
      })(G.V())
    );
    for (let v = 0; v < G.V(); v++) {
      adj[v] = <any>new Queue<EulerianCycle.Edge>();
    }
    for (let v = 0; v < G.V(); v++) {
      {
        let selfLoops = 0;
        for (let index245 = G.adj(v).iterator(); index245.hasNext(); ) {
          const w = index245.next();
          {
            if (v === w) {
              if (selfLoops % 2 === 0) {
                const e: EulerianCycle.Edge = new EulerianCycle.Edge(v, w);
                adj[v].enqueue(e);
                adj[w].enqueue(e);
              }
              selfLoops++;
            } else if (v < w) {
              const e: EulerianCycle.Edge = new EulerianCycle.Edge(v, w);
              adj[v].enqueue(e);
              adj[w].enqueue(e);
            }
          }
        }
      }
    }
    const s: number = EulerianCycle.nonIsolatedVertex(G);
    const stack: Stack<number> = <any>new Stack<number>();
    stack.push(s);
    this.__cycle = <any>new Stack<number>();
    while (!stack.isEmpty()) {
      {
        let v: number = stack.pop();
        while (!adj[v].isEmpty()) {
          {
            const edge: EulerianCycle.Edge = adj[v].dequeue();
            if (edge.isUsed) continue;
            edge.isUsed = true;
            stack.push(v);
            v = edge.other(v);
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
   * Returns true if the graph has an Eulerian cycle.
   *
   * @return  {@code true} if the graph has an Eulerian cycle;
   * {@code false} otherwise
   */
  public hasEulerianCycle(): boolean {
    return this.__cycle != null;
  }

  static nonIsolatedVertex(G: Graph): number {
    for (let v = 0; v < G.V(); v++) {
      if (G.degree(v) > 0) return v;
    }
    return -1;
  }

  /**
   *
   * The code below is solely for testing correctness of the data type.
   * @param {Graph} G
   * @return
   * @private
   */
  static satisfiesNecessaryAndSufficientConditions(G: Graph): boolean {
    if (G.E() === 0) return false;
    for (let v = 0; v < G.V(); v++) {
      if (G.degree(v) % 2 !== 0) return false;
    }
    const s: number = EulerianCycle.nonIsolatedVertex(G);
    const bfs: BreadthFirstPaths = new BreadthFirstPaths(G, s);
    for (let v = 0; v < G.V(); v++) {
      if (G.degree(v) > 0 && !bfs.hasPathTo(v)) return false;
    }
    return true;
  }

  certifySolution(G: Graph): boolean {
    if (this.hasEulerianCycle() === (this.cycle() == null)) return false;
    if (
      this.hasEulerianCycle() !==
      EulerianCycle.satisfiesNecessaryAndSufficientConditions(G)
    )
      return false;
    if (this.__cycle == null) return true;
    if (this.__cycle.size() !== G.E() + 1) return false;
    let first = -1;
    let last = -1;
    for (let index246 = this.cycle().iterator(); index246.hasNext(); ) {
      const v = index246.next();
      {
        if (first === -1) first = v;
        last = v;
      }
    }
    if (first !== last) return false;
    return true;
  }

  static unitTest(G: Graph, description: string) {
    StdOut.println$java_lang_Object(description);
    StdOut.println$java_lang_Object('-------------------------------------');
    StdOut.print$java_lang_Object(G);
    const euler: EulerianCycle = new EulerianCycle(G);
    StdOut.print$java_lang_Object('Eulerian cycle: ');
    if (euler.hasEulerianCycle()) {
      for (let index247 = euler.cycle().iterator(); index247.hasNext(); ) {
        const v = index247.next();
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
   * Unit tests the {@code EulerianCycle} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const V: number = parseInt(args[0]);
    const E: number = parseInt(args[1]);
    const G1: Graph = GraphGenerator.eulerianCycle(V, E);
    EulerianCycle.unitTest(G1, 'Eulerian cycle');
    const G2: Graph = GraphGenerator.eulerianPath(V, E);
    EulerianCycle.unitTest(G2, 'Eulerian path');
    const G3: Graph = new Graph(V);
    EulerianCycle.unitTest(G3, 'empty graph');
    const G4: Graph = new Graph(V);
    const v4: number = StdRandom.uniform$int(V);
    G4.addEdge(v4, v4);
    EulerianCycle.unitTest(G4, 'single self loop');
    const H1: Graph = GraphGenerator.eulerianCycle((V / 2) | 0, (E / 2) | 0);
    const H2: Graph = GraphGenerator.eulerianCycle(
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
    const G5: Graph = new Graph(V);
    for (let v = 0; v < H1.V(); v++) {
      for (let index248 = H1.adj(v).iterator(); index248.hasNext(); ) {
        const w = index248.next();
        G5.addEdge(perm[v], perm[w]);
      }
    }
    for (let v = 0; v < H2.V(); v++) {
      for (let index249 = H2.adj(v).iterator(); index249.hasNext(); ) {
        const w = index249.next();
        G5.addEdge(perm[((V / 2) | 0) + v], perm[((V / 2) | 0) + w]);
      }
    }
    EulerianCycle.unitTest(G5, 'Union of two disjoint cycles');
    const G6: Graph = GraphGenerator.simple$int$int(V, E);
    EulerianCycle.unitTest(G6, 'simple graph');
  }
}
EulerianCycle.__class = 'edu.princeton.cs.algs4.EulerianCycle';

export namespace EulerianCycle {
  export class Edge {
    v: number;

    w: number;

    isUsed: boolean;

    public constructor(v: number, w: number) {
      if (this.v === undefined) this.v = 0;
      if (this.w === undefined) this.w = 0;
      if (this.isUsed === undefined) this.isUsed = false;
      this.v = v;
      this.w = w;
      this.isUsed = false;
    }

    public other(vertex: number): number {
      if (vertex === this.v) return this.w;
      if (vertex === this.w) return this.v;
      throw new Error('Illegal endpoint');
    }
  }
  Edge.__class = 'edu.princeton.cs.algs4.EulerianCycle.Edge';
}

EulerianCycle.main(null);
