import { FlowEdge } from './FlowEdge';
import { FlowNetwork } from './FlowNetwork';
import { Queue } from './Queue';
import { StdOut } from './StdOut';

/**
 * Compute a maximum flow and minimum cut in the network {@code G}
 * from vertex {@code s} to vertex {@code t}.
 *
 * @param  {FlowNetwork} G the flow network
 * @param   s the source vertex
 * @param   t the sink vertex
 * @throws IllegalArgumentException unless {@code 0 <= s < V}
 * @throws IllegalArgumentException unless {@code 0 <= t < V}
 * @throws IllegalArgumentException if {@code s == t}
 * @throws IllegalArgumentException if initial flow is infeasible
 * @class
 * @author Robert Sedgewick
 */
export class FordFulkerson {
  static FLOATING_POINT_EPSILON = 1.0e-11;

  private V: number;

  private marked: boolean[];

  private edgeTo: FlowEdge[];

  private __value: number;

  public constructor(G: FlowNetwork, s: number, t: number) {
    if (this.V === undefined) this.V = 0;
    if (this.marked === undefined) this.marked = null;
    if (this.edgeTo === undefined) this.edgeTo = null;
    if (this.__value === undefined) this.__value = 0;
    this.V = G.V();
    this.validate(s);
    this.validate(t);
    if (s === t) throw new Error('Source equals sink');
    if (!this.isFeasible(G, s, t))
      throw new Error('Initial flow is infeasible');
    this.__value = this.excess(G, t);
    while (this.hasAugmentingPath(G, s, t)) {
      {
        let bottle: number = Number.POSITIVE_INFINITY;
        for (let v: number = t; v !== s; v = this.edgeTo[v].other(v)) {
          {
            bottle = Math.min(bottle, this.edgeTo[v].residualCapacityTo(v));
          }
        }
        for (let v: number = t; v !== s; v = this.edgeTo[v].other(v)) {
          {
            this.edgeTo[v].addResidualFlowTo(v, bottle);
          }
        }
        this.__value += bottle;
      }
    }
  }

  /**
   * Returns the value of the maximum flow.
   *
   * @return  the value of the maximum flow
   */
  public value(): number {
    return this.__value;
  }

  /**
   * Returns true if the specified vertex is on the {@code s} side of the mincut.
   *
   * @param   v vertex
   * @return  {@code true} if vertex {@code v} is on the {@code s} side of the micut;
   * {@code false} otherwise
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public inCut(v: number): boolean {
    this.validate(v);
    return this.marked[v];
  }

  private validate(v: number) {
    if (v < 0 || v >= this.V)
      throw new Error(`vertex ${v} is not between 0 and ${this.V - 1}`);
  }

  private hasAugmentingPath(G: FlowNetwork, s: number, t: number): boolean {
    this.edgeTo = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(G.V());
    this.marked = (s => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    const queue: Queue<number> = <any>new Queue<number>();
    queue.enqueue(s);
    this.marked[s] = true;
    while (!queue.isEmpty() && !this.marked[t]) {
      {
        const v: number = queue.dequeue();
        for (let index265 = G.adj(v).iterator(); index265.hasNext(); ) {
          const e = index265.next();
          {
            const w: number = e.other(v);
            if (e.residualCapacityTo(w) > 0) {
              if (!this.marked[w]) {
                this.edgeTo[w] = e;
                this.marked[w] = true;
                queue.enqueue(w);
              }
            }
          }
        }
      }
    }
    return this.marked[t];
  }

  private excess(G: FlowNetwork, v: number): number {
    let excess = 0.0;
    for (let index266 = G.adj(v).iterator(); index266.hasNext(); ) {
      const e = index266.next();
      {
        if (v === e.from()) excess -= e.flow();
        else excess += e.flow();
      }
    }
    return excess;
  }

  private isFeasible(G: FlowNetwork, s: number, t: number): boolean {
    for (let v = 0; v < G.V(); v++) {
      {
        for (let index267 = G.adj(v).iterator(); index267.hasNext(); ) {
          const e = index267.next();
          {
            if (
              e.flow() < -FordFulkerson.FLOATING_POINT_EPSILON ||
              e.flow() > e.capacity() + FordFulkerson.FLOATING_POINT_EPSILON
            ) {
              console.error(`Edge does not satisfy capacity constraints: ${e}`);
              return false;
            }
          }
        }
      }
    }
    if (
      Math.abs(this.__value + this.excess(G, s)) >
      FordFulkerson.FLOATING_POINT_EPSILON
    ) {
      console.error(`Excess at source = ${this.excess(G, s)}`);
      console.error(`Max flow         = ${this.__value}`);
      return false;
    }
    if (
      Math.abs(this.__value - this.excess(G, t)) >
      FordFulkerson.FLOATING_POINT_EPSILON
    ) {
      console.error(`Excess at sink   = ${this.excess(G, t)}`);
      console.error(`Max flow         = ${this.__value}`);
      return false;
    }
    for (let v = 0; v < G.V(); v++) {
      {
        if (v === s || v === t) continue;
        else if (
          Math.abs(this.excess(G, v)) > FordFulkerson.FLOATING_POINT_EPSILON
        ) {
          console.error(`Net flow out of ${v} doesn't equal zero`);
          return false;
        }
      }
    }
    return true;
  }

  private check(G: FlowNetwork, s: number, t: number): boolean {
    if (!this.isFeasible(G, s, t)) {
      console.error('Flow is infeasible');
      return false;
    }
    if (!this.inCut(s)) {
      console.error(`source ${s} is not on source side of min cut`);
      return false;
    }
    if (this.inCut(t)) {
      console.error(`sink ${t} is on source side of min cut`);
      return false;
    }
    let mincutValue = 0.0;
    for (let v = 0; v < G.V(); v++) {
      {
        for (let index268 = G.adj(v).iterator(); index268.hasNext(); ) {
          const e = index268.next();
          {
            if (v === e.from() && this.inCut(e.from()) && !this.inCut(e.to()))
              mincutValue += e.capacity();
          }
        }
      }
    }
    if (
      Math.abs(mincutValue - this.__value) >
      FordFulkerson.FLOATING_POINT_EPSILON
    ) {
      console.error(
        `Max flow value = ${this.__value}, min cut value = ${mincutValue}`
      );
      return false;
    }
    return true;
  }

  /**
   * Unit tests the {@code FordFulkerson} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const V: number = parseInt(args[0]);
    const E: number = parseInt(args[1]);
    const s = 0;
    const t: number = V - 1;
    const G: FlowNetwork = new FlowNetwork(V, E);
    StdOut.println$java_lang_Object(G);
    const maxflow: FordFulkerson = new FordFulkerson(G, s, t);
    StdOut.println$java_lang_Object(`Max flow from ${s} to ${t}`);
    for (let v = 0; v < G.V(); v++) {
      {
        for (let index269 = G.adj(v).iterator(); index269.hasNext(); ) {
          const e = index269.next();
          {
            if (v === e.from() && e.flow() > 0)
              StdOut.println$java_lang_Object(`   ${e}`);
          }
        }
      }
    }
    StdOut.print$java_lang_Object('Min cut: ');
    for (let v = 0; v < G.V(); v++) {
      {
        if (maxflow.inCut(v)) StdOut.print$java_lang_Object(`${v} `);
      }
    }
    StdOut.println();
    StdOut.println$java_lang_Object(`Max flow value = ${maxflow.value()}`);
  }
}
FordFulkerson.__class = 'edu.princeton.cs.algs4.FordFulkerson';

FordFulkerson.main(null);
