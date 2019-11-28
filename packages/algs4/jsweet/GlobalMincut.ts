import { EdgeWeightedGraph } from './EdgeWeightedGraph';
import { Edge } from './Edge';
import { UF } from './UF';
import { IndexMaxPQ } from './IndexMaxPQ';
import { FlowNetwork } from './FlowNetwork';
import { FlowEdge } from './FlowEdge';
import { FordFulkerson } from './FordFulkerson';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Computes a minimum cut of an edge-weighted graph.
 *
 * @param {EdgeWeightedGraph} G the edge-weighted graph
 * @throws IllegalArgumentException if the number of vertices of `G`
 * is less than `2` or if anny edge weight is negative
 * @class
 * @author Marcelo Silva
 */
export class GlobalMincut {
  static FLOATING_POINT_EPSILON = 1.0e-11;

  private __weight: number = Number.POSITIVE_INFINITY;

  private __cut: boolean[];

  private V: number;

  public constructor(G: EdgeWeightedGraph) {
    if (this.__cut === undefined) this.__cut = null;
    if (this.V === undefined) this.V = 0;
    this.V = G.V();
    this.validate(G);
    this.minCut(G, 0);
  }

  /**
   * Validates the edge-weighted graph.
   *
   * @param {EdgeWeightedGraph} G the edge-weighted graph
   * @throws IllegalArgumentException if the number of vertices of `G`
   * is less than `2` or if any edge weight is negative
   * @private
   */
  validate(G: EdgeWeightedGraph) {
    if (G.V() < 2) throw new Error('number of vertices of G is less than 2');
    for (let index273 = G.edges().iterator(); index273.hasNext(); ) {
      const e = index273.next();
      {
        if (e.weight() < 0) throw new Error(`edge ${e} has negative weight`);
      }
    }
  }

  /**
   * Returns the weight of the minimum cut.
   *
   * @return  the weight of the minimum cut
   */
  public weight(): number {
    return this.__weight;
  }

  /**
   * Returns `true` if the vertex `v` is on the first subset of
   * vertices of the minimum cut; or `false` if the vertex `v` is
   * on the second subset.
   *
   * @param  v the vertex to check
   * @return  `true` if the vertex `v` is on the first subset of
   * vertices of the minimum cut; or `false` if the vertex
   * `v` is on the second subset.
   * @throws IllegalArgumentException unless vertex `v` is between
   * `0` and `(G.V() - 1)`
   */
  public cut(v: number): boolean {
    this.validateVertex(v);
    return this.__cut[v];
  }

  /**
   * Makes a cut for the current edge-weighted graph by partitioning its set
   * of vertices into two nonempty subsets. The vertices connected to the
   * vertex `t` belong to the first subset. Other vertices not connected
   * to `t` belong to the second subset.
   *
   * @param  t the vertex `t`
   * @param {UF} uf the union-find data type
   * @private
   */
  makeCut(t: number, uf: UF) {
    for (let v = 0; v < this.__cut.length; v++) {
      {
        this.__cut[v] = uf.connected(v, t);
      }
    }
  }

  /**
   * Computes a minimum cut of the edge-weighted graph. Precisely, it computes
   * the lightest of the cuts-of-the-phase which yields the desired minimum
   * cut.
   *
   * @param {EdgeWeightedGraph} G the edge-weighted graph
   * @param  a the starting vertex
   * @private
   */
  minCut(G: EdgeWeightedGraph, a: number) {
    const uf: UF = new UF(G.V());
    const marked: boolean[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    this.__cut = ((s) => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    let cp: GlobalMincut.CutPhase = new GlobalMincut.CutPhase(this, 0.0, a, a);
    for (let v: number = G.V(); v > 1; v--) {
      {
        cp = this.minCutPhase(G, marked, cp);
        if (cp.weight < this.__weight) {
          this.__weight = cp.weight;
          this.makeCut(cp.t, uf);
        }
        G = this.contractEdge(G, cp.s, cp.t);
        marked[cp.t] = true;
        uf.union(cp.s, cp.t);
      }
    }
  }

  /**
   * Returns the cut-of-the-phase. The cut-of-the-phase is a minimum s-t-cut
   * in the current graph, where `s` and `t` are the two vertices
   * added last in the phase. This algorithm is known in the literature as
   * <em>maximum adjacency search</em> or <em>maximum cardinality search</em>.
   *
   * @param {EdgeWeightedGraph} G the edge-weighted graph
   * @param  marked the array of contracted vertices, where `marked[v]`
   * is `true` if the vertex `v` was already
   * contracted; or `false` otherwise
   * @param {GlobalMincut.CutPhase} cp the previous cut-of-the-phase
   * @return {GlobalMincut.CutPhase} the cut-of-the-phase
   * @private
   */
  minCutPhase(
    G: EdgeWeightedGraph,
    marked: boolean[],
    cp: GlobalMincut.CutPhase
  ): GlobalMincut.CutPhase {
    const pq: IndexMaxPQ<number> = <any>new IndexMaxPQ<number>(G.V());
    for (let v = 0; v < G.V(); v++) {
      {
        if (v !== cp.s && !marked[v]) pq.insert(v, 0.0);
      }
    }
    pq.insert(cp.s, Number.POSITIVE_INFINITY);
    while (!pq.isEmpty()) {
      {
        const v: number = pq.delMax();
        cp.s = cp.t;
        cp.t = v;
        for (let index274 = G.adj(v).iterator(); index274.hasNext(); ) {
          const e = index274.next();
          {
            const w: number = e.other(v);
            if (pq.contains(w)) pq.increaseKey(w, pq.keyOf(w) + e.weight());
          }
        }
      }
    }
    cp.weight = 0.0;
    for (let index275 = G.adj(cp.t).iterator(); index275.hasNext(); ) {
      const e = index275.next();
      {
        cp.weight += e.weight();
      }
    }
    return cp;
  }

  /**
   * Contracts the edges incidents on the vertices `s` and `t` of
   * the given edge-weighted graph.
   *
   * @param {EdgeWeightedGraph} G the edge-weighted graph
   * @param  s the vertex `s`
   * @param  t the vertex `t`
   * @return {EdgeWeightedGraph} a new edge-weighted graph for which the edges incidents on the
   * vertices `s` and `t` were contracted
   * @private
   */
  contractEdge(G: EdgeWeightedGraph, s: number, t: number): EdgeWeightedGraph {
    const H: EdgeWeightedGraph = new EdgeWeightedGraph(G.V());
    for (let v = 0; v < G.V(); v++) {
      {
        for (let index276 = G.adj(v).iterator(); index276.hasNext(); ) {
          const e = index276.next();
          {
            const w: number = e.other(v);
            if ((v === s && w === t) || (v === t && w === s)) continue;
            if (v < w) {
              if (w === t) H.addEdge(new Edge(v, s, e.weight()));
              else if (v === t) H.addEdge(new Edge(w, s, e.weight()));
              else H.addEdge(new Edge(v, w, e.weight()));
            }
          }
        }
      }
    }
    return H;
  }

  /**
   * Checks optimality conditions.
   *
   * @param {EdgeWeightedGraph} G the edge-weighted graph
   * @return  `true` if optimality conditions are fine
   * @private
   */
  check(G: EdgeWeightedGraph): boolean {
    let value: number = Number.POSITIVE_INFINITY;
    for (let s = 0, t = 1; t < G.V(); t++) {
      {
        const F: FlowNetwork = new FlowNetwork(G.V());
        for (let index277 = G.edges().iterator(); index277.hasNext(); ) {
          const e = index277.next();
          {
            const v: number = e.either();
            const w: number = e.other(v);
            F.addEdge(new FlowEdge(v, w, e.weight()));
            F.addEdge(new FlowEdge(w, v, e.weight()));
          }
        }
        const maxflow: FordFulkerson = new FordFulkerson(F, s, t);
        value = Math.min(value, maxflow.value());
      }
    }
    if (Math.abs(this.__weight - value) > GlobalMincut.FLOATING_POINT_EPSILON) {
      console.error(
        `Min cut weight = ${this.__weight} , max flow value = ${value}`
      );
      return false;
    }
    return true;
  }

  validateVertex(v: number) {
    if (v < 0 || v >= this.V)
      throw new Error(`vertex ${v} is not between 0 and ${this.V - 1}`);
  }

  /**
   * Unit tests the `GlobalMincut` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const __in: In = new In(args[0]);
    const G: EdgeWeightedGraph = new EdgeWeightedGraph(__in);
    const mc: GlobalMincut = new GlobalMincut(G);
    StdOut.print$java_lang_Object('Min cut: ');
    for (let v = 0; v < G.V(); v++) {
      {
        if (mc.cut(v)) StdOut.print$java_lang_Object(`${v} `);
      }
    }
    StdOut.println();
    StdOut.println$java_lang_Object(`Min cut weight = ${mc.weight()}`);
  }
}
GlobalMincut.__class = 'edu.princeton.cs.algs4.GlobalMincut';

export namespace GlobalMincut {
  /**
   * This helper class represents the <em>cut-of-the-phase</em>. The
   * cut-of-the-phase is a <em>minimum s-t-cut</em> in the current graph,
   * where `s` and `t` are the two vertices added last in the
   * phase.
   * @param  weight
   * @param  s
   * @param  t
   * @class
   */
  export class CutPhase {
    public __parent: any;
    weight: number;

    s: number;

    t: number;

    public constructor(__parent: any, weight: number, s: number, t: number) {
      this.__parent = __parent;
      if (this.weight === undefined) this.weight = 0;
      if (this.s === undefined) this.s = 0;
      if (this.t === undefined) this.t = 0;
      this.weight = weight;
      this.s = s;
      this.t = t;
    }
  }
  CutPhase.__class = 'edu.princeton.cs.algs4.GlobalMincut.CutPhase';
}

GlobalMincut.main(null);
