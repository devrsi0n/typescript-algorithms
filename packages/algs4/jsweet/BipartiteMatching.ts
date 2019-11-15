import { BipartiteX } from './BipartiteX';
import { Graph } from './Graph';
import { Queue } from './Queue';
import { GraphGenerator } from './GraphGenerator';
import { StdOut } from './StdOut';

/**
 * Determines a maximum matching (and a minimum vertex cover)
 * in a bipartite graph.
 *
 * @param  {Graph} G the bipartite graph
 * @throws IllegalArgumentException if `G` is not bipartite
 * @class
 * @author Robert Sedgewick
 */
export class BipartiteMatching {
  static UNMATCHED = -1;

  private V: number;

  private bipartition: BipartiteX;

  private cardinality: number;

  private __mate: number[];

  private __inMinVertexCover: boolean[];

  private marked: boolean[];

  private edgeTo: number[];

  public constructor(G: Graph) {
    if (this.V === undefined) this.V = 0;
    if (this.bipartition === undefined) this.bipartition = null;
    if (this.cardinality === undefined) this.cardinality = 0;
    if (this.__mate === undefined) this.__mate = null;
    if (this.__inMinVertexCover === undefined) this.__inMinVertexCover = null;
    if (this.marked === undefined) this.marked = null;
    if (this.edgeTo === undefined) this.edgeTo = null;
    this.bipartition = new BipartiteX(G);
    if (!this.bipartition.isBipartite()) {
      throw new Error('graph is not bipartite');
    }
    this.V = G.V();
    this.__mate = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.V);
    for (let v = 0; v < this.V; v++) {
      this.__mate[v] = BipartiteMatching.UNMATCHED;
    }
    while (this.hasAugmentingPath(G)) {
      {
        let t = -1;
        for (let v = 0; v < G.V(); v++) {
          {
            if (!this.isMatched(v) && this.edgeTo[v] !== -1) {
              t = v;
              break;
            }
          }
        }
        for (let v: number = t; v !== -1; v = this.edgeTo[this.edgeTo[v]]) {
          {
            const w: number = this.edgeTo[v];
            this.__mate[v] = w;
            this.__mate[w] = v;
          }
        }
        this.cardinality++;
      }
    }
    this.__inMinVertexCover = ((s) => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(this.V);
    for (let v = 0; v < this.V; v++) {
      {
        if (this.bipartition.color(v) && !this.marked[v])
          this.__inMinVertexCover[v] = true;
        if (!this.bipartition.color(v) && this.marked[v])
          this.__inMinVertexCover[v] = true;
      }
    }
  }

  private hasAugmentingPath(G: Graph): boolean {
    this.marked = ((s) => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(this.V);
    this.edgeTo = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(this.V);
    for (let v = 0; v < this.V; v++) {
      this.edgeTo[v] = -1;
    }
    const queue: Queue<number> = <any>new Queue<number>();
    for (let v = 0; v < this.V; v++) {
      {
        if (this.bipartition.color(v) && !this.isMatched(v)) {
          queue.enqueue(v);
          this.marked[v] = true;
        }
      }
    }
    while (!queue.isEmpty()) {
      {
        const v: number = queue.dequeue();
        for (let index145 = G.adj(v).iterator(); index145.hasNext(); ) {
          const w = index145.next();
          {
            if (this.isResidualGraphEdge(v, w) && !this.marked[w]) {
              this.edgeTo[w] = v;
              this.marked[w] = true;
              if (!this.isMatched(w)) return true;
              queue.enqueue(w);
            }
          }
        }
      }
    }
    return false;
  }

  private isResidualGraphEdge(v: number, w: number): boolean {
    if (this.__mate[v] !== w && this.bipartition.color(v)) return true;
    if (this.__mate[v] === w && !this.bipartition.color(v)) return true;
    return false;
  }

  /**
   * Returns the vertex to which the specified vertex is matched in
   * the maximum matching computed by the algorithm.
   *
   * @param   v the vertex
   * @return  the vertex to which vertex `v` is matched in the
   * maximum matching; `-1` if the vertex is not matched
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public mate(v: number): number {
    this.validate(v);
    return this.__mate[v];
  }

  /**
   * Returns true if the specified vertex is matched in the maximum matching
   * computed by the algorithm.
   *
   * @param   v the vertex
   * @return  `true` if vertex `v` is matched in maximum matching;
   * `false` otherwise
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public isMatched(v: number): boolean {
    this.validate(v);
    return this.__mate[v] !== BipartiteMatching.UNMATCHED;
  }

  /**
   * Returns the number of edges in a maximum matching.
   *
   * @return  the number of edges in a maximum matching
   */
  public size(): number {
    return this.cardinality;
  }

  /**
   * Returns true if the graph contains a perfect matching.
   * That is, the number of edges in a maximum matching is equal to one half
   * of the number of vertices in the graph (so that every vertex is matched).
   *
   * @return  `true` if the graph contains a perfect matching;
   * `false` otherwise
   */
  public isPerfect(): boolean {
    return this.cardinality * 2 === this.V;
  }

  /**
   * Returns true if the specified vertex is in the minimum vertex cover
   * computed by the algorithm.
   *
   * @param   v the vertex
   * @return  `true` if vertex `v` is in the minimum vertex cover;
   * `false` otherwise
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public inMinVertexCover(v: number): boolean {
    this.validate(v);
    return this.__inMinVertexCover[v];
  }

  private validate(v: number) {
    if (v < 0 || v >= this.V)
      throw new Error(`vertex ${v} is not between 0 and ${this.V - 1}`);
  }

  /**
   *
   * The code below is solely for testing correctness of the data type.
   * @param {Graph} G
   * @return
   * @private
   */
  private certifySolution(G: Graph): boolean {
    for (let v = 0; v < this.V; v++) {
      {
        if (this.mate(v) === -1) continue;
        if (this.mate(this.mate(v)) !== v) return false;
      }
    }
    let matchedVertices = 0;
    for (let v = 0; v < this.V; v++) {
      {
        if (this.mate(v) !== -1) matchedVertices++;
      }
    }
    if (2 * this.size() !== matchedVertices) return false;
    let sizeOfMinVertexCover = 0;
    for (let v = 0; v < this.V; v++) {
      if (this.inMinVertexCover(v)) sizeOfMinVertexCover++;
    }
    if (this.size() !== sizeOfMinVertexCover) return false;
    const isMatched: boolean[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(this.V);
    for (let v = 0; v < this.V; v++) {
      {
        const w: number = this.__mate[v];
        if (w === -1) continue;
        if (v === w) return false;
        if (v >= w) continue;
        if (isMatched[v] || isMatched[w]) return false;
        isMatched[v] = true;
        isMatched[w] = true;
      }
    }
    for (let v = 0; v < this.V; v++) {
      {
        if (this.mate(v) === -1) continue;
        let isEdge = false;
        for (let index146 = G.adj(v).iterator(); index146.hasNext(); ) {
          const w = index146.next();
          {
            if (this.mate(v) === w) isEdge = true;
          }
        }
        if (!isEdge) return false;
      }
    }
    for (let v = 0; v < this.V; v++) {
      for (let index147 = G.adj(v).iterator(); index147.hasNext(); ) {
        const w = index147.next();
        if (!this.inMinVertexCover(v) && !this.inMinVertexCover(w))
          return false;
      }
    }
    return true;
  }

  /**
   * Unit tests the `HopcroftKarp` data type.
   * Takes three command-line arguments `V1`, `V2`, and `E`;
   * creates a random bipartite graph with `V1` + `V2` vertices
   * and `E` edges; computes a maximum matching and minimum vertex cover;
   * and prints the results.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const V1: number = parseInt(args[0]);
    const V2: number = parseInt(args[1]);
    const E: number = parseInt(args[2]);
    const G: Graph = GraphGenerator.bipartite$int$int$int(V1, V2, E);
    if (G.V() < 1000) StdOut.println$java_lang_Object(G);
    const matching: BipartiteMatching = new BipartiteMatching(G);
    StdOut.printf(
      'Number of edges in max matching        = %d\n',
      matching.size()
    );
    StdOut.printf(
      'Number of vertices in min vertex cover = %d\n',
      matching.size()
    );
    StdOut.printf(
      'Graph has a perfect matching           = %b\n',
      matching.isPerfect()
    );
    StdOut.println();
    if (G.V() >= 1000) return;
    StdOut.print$java_lang_Object('Max matching: ');
    for (let v = 0; v < G.V(); v++) {
      {
        const w: number = matching.mate(v);
        if (matching.isMatched(v) && v < w)
          StdOut.print$java_lang_Object(`${v}-${w} `);
      }
    }
    StdOut.println();
    StdOut.print$java_lang_Object('Min vertex cover: ');
    for (let v = 0; v < G.V(); v++) {
      if (matching.inMinVertexCover(v)) StdOut.print$java_lang_Object(`${v} `);
    }
    StdOut.println();
  }
}
BipartiteMatching.__class = 'edu.princeton.cs.algs4.BipartiteMatching';

BipartiteMatching.main(null);
