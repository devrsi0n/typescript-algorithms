import { Graph } from './Graph';
import { SET } from './SET';
import { StdRandom } from './StdRandom';
import { MinPQ } from './MinPQ';
import { StdOut } from './StdOut';

/**
 * The `GraphGenerator` class provides static methods for creating
 * various graphs, including Erdos-Renyi random graphs, random bipartite
 * graphs, random k-regular graphs, and random rooted trees.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/41graph">Section 4.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class GraphGenerator {
  public static simple$int$int(V: number, E: number): Graph {
    if (
      E >
      ((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
        (((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(<number>V) * (V - 1)) /
          2
      )
    )
      throw new Error('Too many edges');
    if (E < 0) throw new Error('Too few edges');
    const G: Graph = new Graph(V);
    const set: SET<GraphGenerator.Edge> = <any>new SET<GraphGenerator.Edge>();
    while (G.E() < E) {
      {
        const v: number = StdRandom.uniform$int(V);
        const w: number = StdRandom.uniform$int(V);
        const e: GraphGenerator.Edge = new GraphGenerator.Edge(v, w);
        if (v !== w && !set.contains(e)) {
          set.add(e);
          G.addEdge(v, w);
        }
      }
    }
    return G;
  }

  /**
   * Returns a random simple graph containing `V` vertices and `E` edges.
   * @param  V the number of vertices
   * @param  E the number of vertices
   * @return {Graph} a random simple graph on `V` vertices, containing a total
   * of `E` edges
   * @throws IllegalArgumentException if no such simple graph exists
   */
  public static simple(V?: any, E?: any): any {
    if (
      (typeof V === 'number' || V === null) &&
      (typeof E === 'number' || E === null)
    ) {
      return <any>GraphGenerator.simple$int$int(V, E);
    }
    if (
      (typeof V === 'number' || V === null) &&
      (typeof E === 'number' || E === null)
    ) {
      return <any>GraphGenerator.simple$int$double(V, E);
    }
    throw new Error('invalid overload');
  }

  public static simple$int$double(V: number, p: number): Graph {
    if (p < 0.0 || p > 1.0)
      throw new Error('Probability must be between 0 and 1');
    const G: Graph = new Graph(V);
    for (let v = 0; v < V; v++) {
      for (let w: number = v + 1; w < V; w++) {
        if (StdRandom.bernoulli$double(p)) G.addEdge(v, w);
      }
    }
    return G;
  }

  /**
   * Returns the complete graph on `V` vertices.
   * @param  V the number of vertices
   * @return {Graph} the complete graph on `V` vertices
   */
  public static complete(V: number): Graph {
    return GraphGenerator.simple$int$double(V, 1.0);
  }

  /**
   * Returns a complete bipartite graph on `V1` and `V2` vertices.
   * @param  V1 the number of vertices in one partition
   * @param  V2 the number of vertices in the other partition
   * @return {Graph} a complete bipartite graph on `V1` and `V2` vertices
   * @throws IllegalArgumentException if probability is not between 0 and 1
   */
  public static completeBipartite(V1: number, V2: number): Graph {
    return GraphGenerator.bipartite$int$int$int(V1, V2, V1 * V2);
  }

  public static bipartite$int$int$int(
    V1: number,
    V2: number,
    E: number
  ): Graph {
    if (E > ((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(<number>V1) * V2)
      throw new Error('Too many edges');
    if (E < 0) throw new Error('Too few edges');
    const G: Graph = new Graph(V1 + V2);
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V1 + V2);
    for (let i = 0; i < V1 + V2; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    const set: SET<GraphGenerator.Edge> = <any>new SET<GraphGenerator.Edge>();
    while (G.E() < E) {
      {
        const i: number = StdRandom.uniform$int(V1);
        const j: number = V1 + StdRandom.uniform$int(V2);
        const e: GraphGenerator.Edge = new GraphGenerator.Edge(
          vertices[i],
          vertices[j]
        );
        if (!set.contains(e)) {
          set.add(e);
          G.addEdge(vertices[i], vertices[j]);
        }
      }
    }
    return G;
  }

  /**
   * Returns a random simple bipartite graph on `V1` and `V2` vertices
   * with `E` edges.
   * @param  V1 the number of vertices in one partition
   * @param  V2 the number of vertices in the other partition
   * @param  E the number of edges
   * @return {Graph} a random simple bipartite graph on `V1` and `V2` vertices,
   * containing a total of `E` edges
   * @throws IllegalArgumentException if no such simple bipartite graph exists
   */
  public static bipartite(V1?: any, V2?: any, E?: any): any {
    if (
      (typeof V1 === 'number' || V1 === null) &&
      (typeof V2 === 'number' || V2 === null) &&
      (typeof E === 'number' || E === null)
    ) {
      return <any>GraphGenerator.bipartite$int$int$int(V1, V2, E);
    }
    if (
      (typeof V1 === 'number' || V1 === null) &&
      (typeof V2 === 'number' || V2 === null) &&
      (typeof E === 'number' || E === null)
    ) {
      return <any>GraphGenerator.bipartite$int$int$double(V1, V2, E);
    }
    throw new Error('invalid overload');
  }

  public static bipartite$int$int$double(
    V1: number,
    V2: number,
    p: number
  ): Graph {
    if (p < 0.0 || p > 1.0)
      throw new Error('Probability must be between 0 and 1');
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V1 + V2);
    for (let i = 0; i < V1 + V2; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    const G: Graph = new Graph(V1 + V2);
    for (let i = 0; i < V1; i++) {
      for (let j = 0; j < V2; j++) {
        if (StdRandom.bernoulli$double(p))
          G.addEdge(vertices[i], vertices[V1 + j]);
      }
    }
    return G;
  }

  /**
   * Returns a path graph on `V` vertices.
   * @param  V the number of vertices in the path
   * @return {Graph} a path graph on `V` vertices
   */
  public static path(V: number): Graph {
    const G: Graph = new Graph(V);
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let i = 0; i < V; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    for (let i = 0; i < V - 1; i++) {
      {
        G.addEdge(vertices[i], vertices[i + 1]);
      }
    }
    return G;
  }

  /**
   * Returns a complete binary tree graph on `V` vertices.
   * @param  V the number of vertices in the binary tree
   * @return {Graph} a complete binary tree graph on `V` vertices
   */
  public static binaryTree(V: number): Graph {
    const G: Graph = new Graph(V);
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let i = 0; i < V; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    for (let i = 1; i < V; i++) {
      {
        G.addEdge(vertices[i], vertices[((i - 1) / 2) | 0]);
      }
    }
    return G;
  }

  /**
   * Returns a cycle graph on `V` vertices.
   * @param  V the number of vertices in the cycle
   * @return {Graph} a cycle graph on `V` vertices
   */
  public static cycle(V: number): Graph {
    const G: Graph = new Graph(V);
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let i = 0; i < V; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    for (let i = 0; i < V - 1; i++) {
      {
        G.addEdge(vertices[i], vertices[i + 1]);
      }
    }
    G.addEdge(vertices[V - 1], vertices[0]);
    return G;
  }

  /**
   * Returns an Eulerian cycle graph on `V` vertices.
   *
   * @param   V the number of vertices in the cycle
   * @param   E the number of edges in the cycle
   * @return {Graph} a graph that is an Eulerian cycle on `V` vertices
   * and `E` edges
   * @throws IllegalArgumentException if either `V <= 0` or `E <= 0`
   */
  public static eulerianCycle(V: number, E: number): Graph {
    if (E <= 0)
      throw new Error('An Eulerian cycle must have at least one edge');
    if (V <= 0)
      throw new Error('An Eulerian cycle must have at least one vertex');
    const G: Graph = new Graph(V);
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(E);
    for (let i = 0; i < E; i++) {
      vertices[i] = StdRandom.uniform$int(V);
    }
    for (let i = 0; i < E - 1; i++) {
      {
        G.addEdge(vertices[i], vertices[i + 1]);
      }
    }
    G.addEdge(vertices[E - 1], vertices[0]);
    return G;
  }

  /**
   * Returns an Eulerian path graph on `V` vertices.
   *
   * @param   V the number of vertices in the path
   * @param   E the number of edges in the path
   * @return {Graph} a graph that is an Eulerian path on `V` vertices
   * and `E` edges
   * @throws IllegalArgumentException if either `V <= 0` or `E < 0`
   */
  public static eulerianPath(V: number, E: number): Graph {
    if (E < 0) throw new Error('negative number of edges');
    if (V <= 0)
      throw new Error('An Eulerian path must have at least one vertex');
    const G: Graph = new Graph(V);
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(E + 1);
    for (let i = 0; i < E + 1; i++) {
      vertices[i] = StdRandom.uniform$int(V);
    }
    for (let i = 0; i < E; i++) {
      {
        G.addEdge(vertices[i], vertices[i + 1]);
      }
    }
    return G;
  }

  /**
   * Returns a wheel graph on `V` vertices.
   * @param  V the number of vertices in the wheel
   * @return {Graph} a wheel graph on `V` vertices: a single vertex connected to
   * every vertex in a cycle on `V-1` vertices
   */
  public static wheel(V: number): Graph {
    if (V <= 1) throw new Error('Number of vertices must be at least 2');
    const G: Graph = new Graph(V);
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let i = 0; i < V; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    for (let i = 1; i < V - 1; i++) {
      {
        G.addEdge(vertices[i], vertices[i + 1]);
      }
    }
    G.addEdge(vertices[V - 1], vertices[1]);
    for (let i = 1; i < V; i++) {
      {
        G.addEdge(vertices[0], vertices[i]);
      }
    }
    return G;
  }

  /**
   * Returns a star graph on `V` vertices.
   * @param  V the number of vertices in the star
   * @return {Graph} a star graph on `V` vertices: a single vertex connected to
   * every other vertex
   */
  public static star(V: number): Graph {
    if (V <= 0) throw new Error('Number of vertices must be at least 1');
    const G: Graph = new Graph(V);
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let i = 0; i < V; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    for (let i = 1; i < V; i++) {
      {
        G.addEdge(vertices[0], vertices[i]);
      }
    }
    return G;
  }

  /**
   * Returns a uniformly random `k`-regular graph on `V` vertices
   * (not necessarily simple). The graph is simple with probability only about e^(-k^2/4),
   * which is tiny when k = 14.
   *
   * @param  V the number of vertices in the graph
   * @param  k degree of each vertex
   * @return {Graph} a uniformly random `k`-regular graph on `V` vertices.
   */
  public static regular(V: number, k: number): Graph {
    if ((V * k) % 2 !== 0)
      throw new Error('Number of vertices * k must be even');
    const G: Graph = new Graph(V);
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V * k);
    for (let v = 0; v < V; v++) {
      {
        for (let j = 0; j < k; j++) {
          {
            vertices[v + V * j] = v;
          }
        }
      }
    }
    StdRandom.shuffle$int_A(vertices);
    for (let i = 0; i < (((V * k) / 2) | 0); i++) {
      {
        G.addEdge(vertices[2 * i], vertices[2 * i + 1]);
      }
    }
    return G;
  }

  /**
   * Returns a uniformly random tree on `V` vertices.
   * This algorithm uses a Prufer sequence and takes time proportional to <em>V log V</em>.
   * @param  V the number of vertices in the tree
   * @return {Graph} a uniformly random tree on `V` vertices
   */
  public static tree(V: number): Graph {
    const G: Graph = new Graph(V);
    if (V === 1) return G;
    const prufer: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V - 2);
    for (let i = 0; i < V - 2; i++) {
      prufer[i] = StdRandom.uniform$int(V);
    }
    const degree: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let v = 0; v < V; v++) {
      degree[v] = 1;
    }
    for (let i = 0; i < V - 2; i++) {
      degree[prufer[i]]++;
    }
    const pq: MinPQ<number> = <any>new MinPQ<number>();
    for (let v = 0; v < V; v++) {
      if (degree[v] === 1) pq.insert(v);
    }
    for (let i = 0; i < V - 2; i++) {
      {
        const v: number = pq.delMin();
        G.addEdge(v, prufer[i]);
        degree[v]--;
        degree[prufer[i]]--;
        if (degree[prufer[i]] === 1) pq.insert(prufer[i]);
      }
    }
    G.addEdge(pq.delMin(), pq.delMin());
    return G;
  }

  /**
   * Unit tests the `GraphGenerator` library.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const V: number = parseInt(args[0]);
    const E: number = parseInt(args[1]);
    const V1: number = (V / 2) | 0;
    const V2: number = V - V1;
    StdOut.println$java_lang_Object('complete graph');
    StdOut.println$java_lang_Object(GraphGenerator.complete(V));
    StdOut.println();
    StdOut.println$java_lang_Object('simple');
    StdOut.println$java_lang_Object(GraphGenerator.simple$int$int(V, E));
    StdOut.println();
    StdOut.println$java_lang_Object('Erdos-Renyi');
    const p: number = <number>E / ((V * (V - 1)) / 2.0);
    StdOut.println$java_lang_Object(GraphGenerator.simple$int$double(V, p));
    StdOut.println();
    StdOut.println$java_lang_Object('complete bipartite');
    StdOut.println$java_lang_Object(GraphGenerator.completeBipartite(V1, V2));
    StdOut.println();
    StdOut.println$java_lang_Object('bipartite');
    StdOut.println$java_lang_Object(
      GraphGenerator.bipartite$int$int$int(V1, V2, E)
    );
    StdOut.println();
    StdOut.println$java_lang_Object('Erdos Renyi bipartite');
    const q: number = <number>E / (V1 * V2);
    StdOut.println$java_lang_Object(
      GraphGenerator.bipartite$int$int$double(V1, V2, q)
    );
    StdOut.println();
    StdOut.println$java_lang_Object('path');
    StdOut.println$java_lang_Object(GraphGenerator.path(V));
    StdOut.println();
    StdOut.println$java_lang_Object('cycle');
    StdOut.println$java_lang_Object(GraphGenerator.cycle(V));
    StdOut.println();
    StdOut.println$java_lang_Object('binary tree');
    StdOut.println$java_lang_Object(GraphGenerator.binaryTree(V));
    StdOut.println();
    StdOut.println$java_lang_Object('tree');
    StdOut.println$java_lang_Object(GraphGenerator.tree(V));
    StdOut.println();
    StdOut.println$java_lang_Object('4-regular');
    StdOut.println$java_lang_Object(GraphGenerator.regular(V, 4));
    StdOut.println();
    StdOut.println$java_lang_Object('star');
    StdOut.println$java_lang_Object(GraphGenerator.star(V));
    StdOut.println();
    StdOut.println$java_lang_Object('wheel');
    StdOut.println$java_lang_Object(GraphGenerator.wheel(V));
    StdOut.println();
  }
}
GraphGenerator.__class = 'edu.princeton.cs.algs4.GraphGenerator';

export namespace GraphGenerator {
  export class Edge implements java.lang.Comparable<GraphGenerator.Edge> {
    v: number;

    w: number;

    constructor(v: number, w: number) {
      if (this.v === undefined) this.v = 0;
      if (this.w === undefined) this.w = 0;
      if (v < w) {
        this.v = v;
        this.w = w;
      } else {
        this.v = w;
        this.w = v;
      }
    }

    public compareTo(that: GraphGenerator.Edge): number {
      if (this.v < that.v) return -1;
      if (this.v > that.v) return +1;
      if (this.w < that.w) return -1;
      if (this.w > that.w) return +1;
      return 0;
    }
  }
  Edge.__class = 'edu.princeton.cs.algs4.GraphGenerator.Edge';
  Edge.__interfaces = ['java.lang.Comparable'];
}

GraphGenerator.main(null);
