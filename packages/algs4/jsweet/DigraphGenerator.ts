import { Digraph } from './Digraph';
import { SET } from './SET';
import { StdRandom } from './StdRandom';
import { StdOut } from './StdOut';

/**
 * The `DigraphGenerator` class provides static methods for creating
 * various digraphs, including Erdos-Renyi random digraphs, random DAGs,
 * random rooted trees, random rooted DAGs, random tournaments, path digraphs,
 * cycle digraphs, and the complete digraph.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/42digraph">Section 4.2</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class DigraphGenerator {
  public static simple$int$int(V: number, E: number): Digraph {
    if (
      E >
      ((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(<number>V) * (V - 1)
    )
      throw new Error('Too many edges');
    if (E < 0) throw new Error('Too few edges');
    const G: Digraph = new Digraph(V);
    const set: SET<DigraphGenerator.Edge> = <any>(
      new SET<DigraphGenerator.Edge>()
    );
    while (G.E() < E) {
      {
        const v: number = StdRandom.uniform$int(V);
        const w: number = StdRandom.uniform$int(V);
        const e: DigraphGenerator.Edge = new DigraphGenerator.Edge(v, w);
        if (v !== w && !set.contains(e)) {
          set.add(e);
          G.addEdge(v, w);
        }
      }
    }
    return G;
  }

  /**
   * Returns a random simple digraph containing `V` vertices and `E` edges.
   * @param  V the number of vertices
   * @param  E the number of vertices
   * @return {Digraph} a random simple digraph on `V` vertices, containing a total
   * of `E` edges
   * @throws IllegalArgumentException if no such simple digraph exists
   */
  public static simple(V?: any, E?: any): any {
    if (
      (typeof V === 'number' || V === null) &&
      (typeof E === 'number' || E === null)
    ) {
      return <any>DigraphGenerator.simple$int$int(V, E);
    }
    if (
      (typeof V === 'number' || V === null) &&
      (typeof E === 'number' || E === null)
    ) {
      return <any>DigraphGenerator.simple$int$double(V, E);
    }
    throw new Error('invalid overload');
  }

  public static simple$int$double(V: number, p: number): Digraph {
    if (p < 0.0 || p > 1.0)
      throw new Error('Probability must be between 0 and 1');
    const G: Digraph = new Digraph(V);
    for (let v = 0; v < V; v++) {
      for (let w = 0; w < V; w++) {
        if (v !== w) if (StdRandom.bernoulli$double(p)) G.addEdge(v, w);
      }
    }
    return G;
  }

  /**
   * Returns the complete digraph on `V` vertices.
   * In a complete digraph, every pair of distinct vertices is connected
   * by two antiparallel edges. There are `V*(V-1)` edges.
   * @param  V the number of vertices
   * @return {Digraph} the complete digraph on `V` vertices
   */
  public static complete(V: number): Digraph {
    const G: Digraph = new Digraph(V);
    for (let v = 0; v < V; v++) {
      for (let w = 0; w < V; w++) {
        if (v !== w) G.addEdge(v, w);
      }
    }
    return G;
  }

  /**
   * Returns a random simple DAG containing `V` vertices and `E` edges.
   * Note: it is not uniformly selected at random among all such DAGs.
   * @param  V the number of vertices
   * @param  E the number of vertices
   * @return {Digraph} a random simple DAG on `V` vertices, containing a total
   * of `E` edges
   * @throws IllegalArgumentException if no such simple DAG exists
   */
  public static dag(V: number, E: number): Digraph {
    if (
      E >
      ((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
        (((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(<number>V) * (V - 1)) /
          2
      )
    )
      throw new Error('Too many edges');
    if (E < 0) throw new Error('Too few edges');
    const G: Digraph = new Digraph(V);
    const set: SET<DigraphGenerator.Edge> = <any>(
      new SET<DigraphGenerator.Edge>()
    );
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let i = 0; i < V; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    while (G.E() < E) {
      {
        const v: number = StdRandom.uniform$int(V);
        const w: number = StdRandom.uniform$int(V);
        const e: DigraphGenerator.Edge = new DigraphGenerator.Edge(v, w);
        if (v < w && !set.contains(e)) {
          set.add(e);
          G.addEdge(vertices[v], vertices[w]);
        }
      }
    }
    return G;
  }

  /**
   * Returns a random tournament digraph on `V` vertices. A tournament digraph
   * is a digraph in which, for every pair of vertices, there is one and only one
   * directed edge connecting them. A tournament is an oriented complete graph.
   * @param  V the number of vertices
   * @return {Digraph} a random tournament digraph on `V` vertices
   */
  public static tournament(V: number): Digraph {
    const G: Digraph = new Digraph(V);
    for (let v = 0; v < G.V(); v++) {
      {
        for (let w: number = v + 1; w < G.V(); w++) {
          {
            if (StdRandom.bernoulli$double(0.5)) G.addEdge(v, w);
            else G.addEdge(w, v);
          }
        }
      }
    }
    return G;
  }

  /**
   * Returns a complete rooted-in DAG on `V` vertices.
   * A rooted in-tree is a DAG in which there is a single vertex
   * reachable from every other vertex. A complete rooted in-DAG
   * has V*(V-1)/2 edges.
   * @param  V the number of vertices
   * @return {Digraph} a complete rooted-in DAG on `V` vertices
   */
  public static completeRootedInDAG(V: number): Digraph {
    const G: Digraph = new Digraph(V);
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let i = 0; i < V; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    for (let i = 0; i < V; i++) {
      for (let j: number = i + 1; j < V; j++) {
        G.addEdge(vertices[i], vertices[j]);
      }
    }
    return G;
  }

  /**
   * Returns a random rooted-in DAG on `V` vertices and `E` edges.
   * A rooted in-tree is a DAG in which there is a single vertex
   * reachable from every other vertex.
   * The DAG returned is not chosen uniformly at random among all such DAGs.
   * @param  V the number of vertices
   * @param  E the number of edges
   * @return {Digraph} a random rooted-in DAG on `V` vertices and `E` edges
   */
  public static rootedInDAG(V: number, E: number): Digraph {
    if (
      E >
      ((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
        (((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(<number>V) * (V - 1)) /
          2
      )
    )
      throw new Error('Too many edges');
    if (E < V - 1) throw new Error('Too few edges');
    const G: Digraph = new Digraph(V);
    const set: SET<DigraphGenerator.Edge> = <any>(
      new SET<DigraphGenerator.Edge>()
    );
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let i = 0; i < V; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    for (let v = 0; v < V - 1; v++) {
      {
        const w: number = StdRandom.uniform$int$int(v + 1, V);
        const e: DigraphGenerator.Edge = new DigraphGenerator.Edge(v, w);
        set.add(e);
        G.addEdge(vertices[v], vertices[w]);
      }
    }
    while (G.E() < E) {
      {
        const v: number = StdRandom.uniform$int(V);
        const w: number = StdRandom.uniform$int(V);
        const e: DigraphGenerator.Edge = new DigraphGenerator.Edge(v, w);
        if (v < w && !set.contains(e)) {
          set.add(e);
          G.addEdge(vertices[v], vertices[w]);
        }
      }
    }
    return G;
  }

  /**
   * Returns a complete rooted-out DAG on `V` vertices.
   * A rooted out-tree is a DAG in which every vertex is reachable
   * from a single vertex. A complete rooted in-DAG has V*(V-1)/2 edges.
   * @param  V the number of vertices
   * @return {Digraph} a complete rooted-out DAG on `V` vertices
   */
  public static completeRootedOutDAG(V: number): Digraph {
    const G: Digraph = new Digraph(V);
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let i = 0; i < V; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    for (let i = 0; i < V; i++) {
      for (let j: number = i + 1; j < V; j++) {
        G.addEdge(vertices[j], vertices[i]);
      }
    }
    return G;
  }

  /**
   * Returns a random rooted-out DAG on `V` vertices and `E` edges.
   * A rooted out-tree is a DAG in which every vertex is reachable from a
   * single vertex.
   * The DAG returned is not chosen uniformly at random among all such DAGs.
   * @param  V the number of vertices
   * @param  E the number of edges
   * @return {Digraph} a random rooted-out DAG on `V` vertices and `E` edges
   */
  public static rootedOutDAG(V: number, E: number): Digraph {
    if (
      E >
      ((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
        (((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(<number>V) * (V - 1)) /
          2
      )
    )
      throw new Error('Too many edges');
    if (E < V - 1) throw new Error('Too few edges');
    const G: Digraph = new Digraph(V);
    const set: SET<DigraphGenerator.Edge> = <any>(
      new SET<DigraphGenerator.Edge>()
    );
    const vertices: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let i = 0; i < V; i++) {
      vertices[i] = i;
    }
    StdRandom.shuffle$int_A(vertices);
    for (let v = 0; v < V - 1; v++) {
      {
        const w: number = StdRandom.uniform$int$int(v + 1, V);
        const e: DigraphGenerator.Edge = new DigraphGenerator.Edge(w, v);
        set.add(e);
        G.addEdge(vertices[w], vertices[v]);
      }
    }
    while (G.E() < E) {
      {
        const v: number = StdRandom.uniform$int(V);
        const w: number = StdRandom.uniform$int(V);
        const e: DigraphGenerator.Edge = new DigraphGenerator.Edge(w, v);
        if (v < w && !set.contains(e)) {
          set.add(e);
          G.addEdge(vertices[w], vertices[v]);
        }
      }
    }
    return G;
  }

  /**
   * Returns a random rooted-in tree on `V` vertices.
   * A rooted in-tree is an oriented tree in which there is a single vertex
   * reachable from every other vertex.
   * The tree returned is not chosen uniformly at random among all such trees.
   * @param  V the number of vertices
   * @return {Digraph} a random rooted-in tree on `V` vertices
   */
  public static rootedInTree(V: number): Digraph {
    return DigraphGenerator.rootedInDAG(V, V - 1);
  }

  /**
   * Returns a random rooted-out tree on `V` vertices. A rooted out-tree
   * is an oriented tree in which each vertex is reachable from a single vertex.
   * It is also known as a <em>arborescence</em> or <em>branching</em>.
   * The tree returned is not chosen uniformly at random among all such trees.
   * @param  V the number of vertices
   * @return {Digraph} a random rooted-out tree on `V` vertices
   */
  public static rootedOutTree(V: number): Digraph {
    return DigraphGenerator.rootedOutDAG(V, V - 1);
  }

  /**
   * Returns a path digraph on `V` vertices.
   * @param  V the number of vertices in the path
   * @return {Digraph} a digraph that is a directed path on `V` vertices
   */
  public static path(V: number): Digraph {
    const G: Digraph = new Digraph(V);
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
   * Returns a complete binary tree digraph on `V` vertices.
   * @param  V the number of vertices in the binary tree
   * @return {Digraph} a digraph that is a complete binary tree on `V` vertices
   */
  public static binaryTree(V: number): Digraph {
    const G: Digraph = new Digraph(V);
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
   * Returns a cycle digraph on `V` vertices.
   * @param  V the number of vertices in the cycle
   * @return {Digraph} a digraph that is a directed cycle on `V` vertices
   */
  public static cycle(V: number): Digraph {
    const G: Digraph = new Digraph(V);
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
   * Returns an Eulerian cycle digraph on `V` vertices.
   *
   * @param   V the number of vertices in the cycle
   * @param   E the number of edges in the cycle
   * @return {Digraph} a digraph that is a directed Eulerian cycle on `V` vertices
   * and `E` edges
   * @throws IllegalArgumentException if either `V <= 0` or `E <= 0`
   */
  public static eulerianCycle(V: number, E: number): Digraph {
    if (E <= 0)
      throw new Error('An Eulerian cycle must have at least one edge');
    if (V <= 0)
      throw new Error('An Eulerian cycle must have at least one vertex');
    const G: Digraph = new Digraph(V);
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
   * Returns an Eulerian path digraph on `V` vertices.
   *
   * @param   V the number of vertices in the path
   * @param   E the number of edges in the path
   * @return {Digraph} a digraph that is a directed Eulerian path on `V` vertices
   * and `E` edges
   * @throws IllegalArgumentException if either `V <= 0` or `E < 0`
   */
  public static eulerianPath(V: number, E: number): Digraph {
    if (E < 0) throw new Error('negative number of edges');
    if (V <= 0)
      throw new Error('An Eulerian path must have at least one vertex');
    const G: Digraph = new Digraph(V);
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
   * Returns a random simple digraph on `V` vertices, `E`
   * edges and (at least) `c` strong components. The vertices are randomly
   * assigned integer labels between `0` and `c-1` (corresponding to
   * strong components). Then, a strong component is creates among the vertices
   * with the same label. Next, random edges (either between two vertices with
   * the same labels or from a vetex with a smaller label to a vertex with a
   * larger label). The number of components will be equal to the number of
   * distinct labels that are assigned to vertices.
   *
   * @param  V the number of vertices
   * @param  E the number of edges
   * @param  c the (maximum) number of strong components
   * @return {Digraph} a random simple digraph on `V` vertices and
   * `E` edges, with (at most) `c` strong components
   * @throws IllegalArgumentException if `c` is larger than `V`
   */
  public static strong(V: number, E: number, c: number): Digraph {
    if (c >= V || c <= 0)
      throw new Error('Number of components must be between 1 and V');
    if (E <= 2 * (V - c))
      throw new Error('Number of edges must be at least 2(V-c)');
    if (
      E >
      ((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(
        (((n) => (n < 0 ? Math.ceil(n) : Math.floor(n)))(<number>V) * (V - 1)) /
          2
      )
    )
      throw new Error('Too many edges');
    const G: Digraph = new Digraph(V);
    const set: SET<DigraphGenerator.Edge> = <any>(
      new SET<DigraphGenerator.Edge>()
    );
    const label: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(V);
    for (let v = 0; v < V; v++) {
      label[v] = StdRandom.uniform$int(c);
    }
    for (let i = 0; i < c; i++) {
      {
        let count = 0;
        for (let v = 0; v < G.V(); v++) {
          {
            if (label[v] === i) count++;
          }
        }
        const vertices: number[] = ((s) => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(count);
        let j = 0;
        for (let v = 0; v < V; v++) {
          {
            if (label[v] === i) vertices[j++] = v;
          }
        }
        StdRandom.shuffle$int_A(vertices);
        for (let v = 0; v < count - 1; v++) {
          {
            const w: number = StdRandom.uniform$int$int(v + 1, count);
            const e: DigraphGenerator.Edge = new DigraphGenerator.Edge(w, v);
            set.add(e);
            G.addEdge(vertices[w], vertices[v]);
          }
        }
        for (let v = 0; v < count - 1; v++) {
          {
            const w: number = StdRandom.uniform$int$int(v + 1, count);
            const e: DigraphGenerator.Edge = new DigraphGenerator.Edge(v, w);
            set.add(e);
            G.addEdge(vertices[v], vertices[w]);
          }
        }
      }
    }
    while (G.E() < E) {
      {
        const v: number = StdRandom.uniform$int(V);
        const w: number = StdRandom.uniform$int(V);
        const e: DigraphGenerator.Edge = new DigraphGenerator.Edge(v, w);
        if (!set.contains(e) && v !== w && label[v] <= label[w]) {
          set.add(e);
          G.addEdge(v, w);
        }
      }
    }
    return G;
  }

  /**
   * Unit tests the `DigraphGenerator` library.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const V: number = parseInt(args[0]);
    const E: number = parseInt(args[1]);
    StdOut.println$java_lang_Object('complete graph');
    StdOut.println$java_lang_Object(DigraphGenerator.complete(V));
    StdOut.println();
    StdOut.println$java_lang_Object('simple');
    StdOut.println$java_lang_Object(DigraphGenerator.simple$int$int(V, E));
    StdOut.println();
    StdOut.println$java_lang_Object('path');
    StdOut.println$java_lang_Object(DigraphGenerator.path(V));
    StdOut.println();
    StdOut.println$java_lang_Object('cycle');
    StdOut.println$java_lang_Object(DigraphGenerator.cycle(V));
    StdOut.println();
    StdOut.println$java_lang_Object('Eulierian path');
    StdOut.println$java_lang_Object(DigraphGenerator.eulerianPath(V, E));
    StdOut.println();
    StdOut.println$java_lang_Object('Eulierian cycle');
    StdOut.println$java_lang_Object(DigraphGenerator.eulerianCycle(V, E));
    StdOut.println();
    StdOut.println$java_lang_Object('binary tree');
    StdOut.println$java_lang_Object(DigraphGenerator.binaryTree(V));
    StdOut.println();
    StdOut.println$java_lang_Object('tournament');
    StdOut.println$java_lang_Object(DigraphGenerator.tournament(V));
    StdOut.println();
    StdOut.println$java_lang_Object('DAG');
    StdOut.println$java_lang_Object(DigraphGenerator.dag(V, E));
    StdOut.println();
    StdOut.println$java_lang_Object('rooted-in DAG');
    StdOut.println$java_lang_Object(DigraphGenerator.rootedInDAG(V, E));
    StdOut.println();
    StdOut.println$java_lang_Object('rooted-out DAG');
    StdOut.println$java_lang_Object(DigraphGenerator.rootedOutDAG(V, E));
    StdOut.println();
    StdOut.println$java_lang_Object('rooted-in tree');
    StdOut.println$java_lang_Object(DigraphGenerator.rootedInTree(V));
    StdOut.println();
    StdOut.println$java_lang_Object('rooted-out DAG');
    StdOut.println$java_lang_Object(DigraphGenerator.rootedOutTree(V));
    StdOut.println();
  }
}
DigraphGenerator.__class = 'edu.princeton.cs.algs4.DigraphGenerator';

export namespace DigraphGenerator {
  export class Edge implements java.lang.Comparable<DigraphGenerator.Edge> {
    v: number;

    w: number;

    constructor(v: number, w: number) {
      if (this.v === undefined) this.v = 0;
      if (this.w === undefined) this.w = 0;
      this.v = v;
      this.w = w;
    }

    public compareTo(that: DigraphGenerator.Edge): number {
      if (this.v < that.v) return -1;
      if (this.v > that.v) return +1;
      if (this.w < that.w) return -1;
      if (this.w > that.w) return +1;
      return 0;
    }
  }
  Edge.__class = 'edu.princeton.cs.algs4.DigraphGenerator.Edge';
  Edge.__interfaces = ['java.lang.Comparable'];
}

DigraphGenerator.main(null);
