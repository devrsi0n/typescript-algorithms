import { Stack } from './Stack';
import { Graph } from './Graph';
import { Queue } from './Queue';
import { BreadthFirstPaths } from './BreadthFirstPaths';
import { StdOut } from './StdOut';
import { GraphGenerator } from './GraphGenerator';
import { StdRandom } from './StdRandom';

/**
 * Computes an Eulerian path in the specified graph, if one exists.
 *
 * @param {Graph} G the graph
 * @class
 * @author Robert Sedgewick
 */
export class EulerianPath {
  private __path: Stack<number> = null;

  public constructor(G: Graph) {
    let oddDegreeVertices = 0;
    let s: number = EulerianPath.nonIsolatedVertex(G);
    for (let v = 0; v < G.V(); v++) {
      {
        if (G.degree(v) % 2 !== 0) {
          oddDegreeVertices++;
          s = v;
        }
      }
    }
    if (oddDegreeVertices > 2) return;
    if (s === -1) s = 0;
    const adj: Queue<EulerianPath.Edge>[] = <Queue<EulerianPath.Edge>[]>(s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      adj[v] = <any>new Queue<EulerianPath.Edge>();
    }
    for (let v = 0; v < G.V(); v++) {
      {
        let selfLoops = 0;
        for (let index250 = G.adj(v).iterator(); index250.hasNext(); ) {
          const w = index250.next();
          {
            if (v === w) {
              if (selfLoops % 2 === 0) {
                const e: EulerianPath.Edge = new EulerianPath.Edge(v, w);
                adj[v].enqueue(e);
                adj[w].enqueue(e);
              }
              selfLoops++;
            } else if (v < w) {
              const e: EulerianPath.Edge = new EulerianPath.Edge(v, w);
              adj[v].enqueue(e);
              adj[w].enqueue(e);
            }
          }
        }
      }
    }
    const stack: Stack<number> = <any>new Stack<number>();
    stack.push(s);
    this.__path = <any>new Stack<number>();
    while (!stack.isEmpty()) {
      {
        let v: number = stack.pop();
        while (!adj[v].isEmpty()) {
          {
            const edge: EulerianPath.Edge = adj[v].dequeue();
            if (edge.isUsed) continue;
            edge.isUsed = true;
            stack.push(v);
            v = edge.other(v);
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
   * Returns true if the graph has an Eulerian path.
   *
   * @return  {@code true} if the graph has an Eulerian path;
   * {@code false} otherwise
   */
  public hasEulerianPath(): boolean {
    return this.__path != null;
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
    if (G.E() === 0) return true;
    let oddDegreeVertices = 0;
    for (let v = 0; v < G.V(); v++) {
      if (G.degree(v) % 2 !== 0) oddDegreeVertices++;
    }
    if (oddDegreeVertices > 2) return false;
    const s: number = EulerianPath.nonIsolatedVertex(G);
    const bfs: BreadthFirstPaths = new BreadthFirstPaths(G, s);
    for (let v = 0; v < G.V(); v++) {
      if (G.degree(v) > 0 && !bfs.hasPathTo(v)) return false;
    }
    return true;
  }

  certifySolution(G: Graph): boolean {
    if (this.hasEulerianPath() === (this.path() == null)) return false;
    if (
      this.hasEulerianPath() !==
      EulerianPath.satisfiesNecessaryAndSufficientConditions(G)
    )
      return false;
    if (this.__path == null) return true;
    if (this.__path.size() !== G.E() + 1) return false;
    return true;
  }

  static unitTest(G: Graph, description: string) {
    StdOut.println$java_lang_Object(description);
    StdOut.println$java_lang_Object('-------------------------------------');
    StdOut.print$java_lang_Object(G);
    const euler: EulerianPath = new EulerianPath(G);
    StdOut.print$java_lang_Object('Eulerian path:  ');
    if (euler.hasEulerianPath()) {
      for (let index251 = euler.path().iterator(); index251.hasNext(); ) {
        const v = index251.next();
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
   * Unit tests the {@code EulerianPath} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const V: number = parseInt(args[0]);
    const E: number = parseInt(args[1]);
    const G1: Graph = GraphGenerator.eulerianCycle(V, E);
    EulerianPath.unitTest(G1, 'Eulerian cycle');
    const G2: Graph = GraphGenerator.eulerianPath(V, E);
    EulerianPath.unitTest(G2, 'Eulerian path');
    const G3: Graph = new Graph(G2);
    G3.addEdge(StdRandom.uniform$int(V), StdRandom.uniform$int(V));
    EulerianPath.unitTest(G3, 'one random edge added to Eulerian path');
    const G4: Graph = new Graph(V);
    const v4: number = StdRandom.uniform$int(V);
    G4.addEdge(v4, v4);
    EulerianPath.unitTest(G4, 'single self loop');
    const G5: Graph = new Graph(V);
    G5.addEdge(StdRandom.uniform$int(V), StdRandom.uniform$int(V));
    EulerianPath.unitTest(G5, 'single edge');
    const G6: Graph = new Graph(V);
    EulerianPath.unitTest(G6, 'empty graph');
    const G7: Graph = GraphGenerator.simple$int$int(V, E);
    EulerianPath.unitTest(G7, 'simple graph');
  }
}
EulerianPath.__class = 'edu.princeton.cs.algs4.EulerianPath';

export namespace EulerianPath {
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
  Edge.__class = 'edu.princeton.cs.algs4.EulerianPath.Edge';
}

EulerianPath.main(null);
