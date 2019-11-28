import { Queue } from './Queue';
import { Digraph } from './Digraph';
import { EdgeWeightedDigraph } from './EdgeWeightedDigraph';
import { DirectedEdge } from './DirectedEdge';
import { DigraphGenerator } from './DigraphGenerator';
import { StdRandom } from './StdRandom';
import { StdOut } from './StdOut';

/**
 * Determines whether the digraph `G` has a topological order and, if so,
 * finds such a topological order.
 * @param {Digraph} G the digraph
 * @class
 * @author Robert Sedgewick
 */
export class TopologicalX {
  private __order: Queue<number>;

  private ranks: number[];

  public constructor(G?: any) {
    if ((G != null && G instanceof <any>Digraph) || G === null) {
      const __args = arguments;
      if (this.__order === undefined) this.__order = null;
      if (this.ranks === undefined) this.ranks = null;
      if (this.__order === undefined) this.__order = null;
      if (this.ranks === undefined) this.ranks = null;
      (() => {
        const indegree: number[] = ((s) => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        for (let v = 0; v < G.V(); v++) {
          {
            indegree[v] = G.indegree(v);
          }
        }
        this.ranks = ((s) => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.__order = <any>new Queue<number>();
        let count = 0;
        const queue: Queue<number> = <any>new Queue<number>();
        for (let v = 0; v < G.V(); v++) {
          if (indegree[v] === 0) queue.enqueue(v);
        }
        while (!queue.isEmpty()) {
          {
            const v: number = queue.dequeue();
            this.__order.enqueue(v);
            this.ranks[v] = count++;
            for (let index368 = G.adj(v).iterator(); index368.hasNext(); ) {
              const w = index368.next();
              {
                indegree[w]--;
                if (indegree[w] === 0) queue.enqueue(w);
              }
            }
          }
        }
        if (count !== G.V()) {
          this.__order = null;
        }
      })();
    } else if (
      (G != null && G instanceof <any>EdgeWeightedDigraph) ||
      G === null
    ) {
      const __args = arguments;
      if (this.__order === undefined) this.__order = null;
      if (this.ranks === undefined) this.ranks = null;
      if (this.__order === undefined) this.__order = null;
      if (this.ranks === undefined) this.ranks = null;
      (() => {
        const indegree: number[] = ((s) => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        for (let v = 0; v < G.V(); v++) {
          {
            indegree[v] = G.indegree(v);
          }
        }
        this.ranks = ((s) => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.__order = <any>new Queue<number>();
        let count = 0;
        const queue: Queue<number> = <any>new Queue<number>();
        for (let v = 0; v < G.V(); v++) {
          if (indegree[v] === 0) queue.enqueue(v);
        }
        while (!queue.isEmpty()) {
          {
            const v: number = queue.dequeue();
            this.__order.enqueue(v);
            this.ranks[v] = count++;
            for (let index369 = G.adj(v).iterator(); index369.hasNext(); ) {
              const e = index369.next();
              {
                const w: number = e.to();
                indegree[w]--;
                if (indegree[w] === 0) queue.enqueue(w);
              }
            }
          }
        }
        if (count !== G.V()) {
          this.__order = null;
        }
      })();
    } else throw new Error('invalid overload');
  }

  /**
   * Returns a topological order if the digraph has a topologial order,
   * and `null` otherwise.
   * @return  a topological order of the vertices (as an interable) if the
   * digraph has a topological order (or equivalently, if the digraph is a DAG),
   * and `null` otherwise
   */
  public order(): Iterable<number> {
    return this.__order;
  }

  /**
   * Does the digraph have a topological order?
   * @return  `true` if the digraph has a topological order (or equivalently,
   * if the digraph is a DAG), and `false` otherwise
   */
  public hasOrder(): boolean {
    return this.__order != null;
  }

  /**
   * The the rank of vertex `v` in the topological order;
   * -1 if the digraph is not a DAG
   *
   * @param  v vertex
   * @return  the position of vertex `v` in a topological order
   * of the digraph; -1 if the digraph is not a DAG
   * @throws IllegalArgumentException unless `0 <= v < V`
   */
  public rank(v: number): number {
    this.validateVertex(v);
    if (this.hasOrder()) return this.ranks[v];
    return -1;
  }

  public check$edu_princeton_cs_algs4_Digraph(G: Digraph): boolean {
    if (this.hasOrder()) {
      const found: boolean[] = ((s) => {
        const a = [];
        while (s-- > 0) a.push(false);
        return a;
      })(G.V());
      for (let i = 0; i < G.V(); i++) {
        {
          found[this.rank(i)] = true;
        }
      }
      for (let i = 0; i < G.V(); i++) {
        {
          if (!found[i]) {
            console.error(`No vertex with rank ${i}`);
            return false;
          }
        }
      }
      for (let v = 0; v < G.V(); v++) {
        {
          for (let index370 = G.adj(v).iterator(); index370.hasNext(); ) {
            const w = index370.next();
            {
              if (this.rank(v) > this.rank(w)) {
                console.error('%d-%d: rank(%d) = %d, rank(%d) = %d\n');
                return false;
              }
            }
          }
        }
      }
      let r = 0;
      for (let index371 = this.order().iterator(); index371.hasNext(); ) {
        const v = index371.next();
        {
          if (this.rank(v) !== r) {
            console.error('order() and rank() inconsistent');
            return false;
          }
          r++;
        }
      }
    }
    return true;
  }

  public check(G?: any): any {
    if ((G != null && G instanceof <any>Digraph) || G === null) {
      return <any>this.check$edu_princeton_cs_algs4_Digraph(G);
    }
    if ((G != null && G instanceof <any>EdgeWeightedDigraph) || G === null) {
      return <any>this.check$edu_princeton_cs_algs4_EdgeWeightedDigraph(G);
    }
    throw new Error('invalid overload');
  }

  private check$edu_princeton_cs_algs4_EdgeWeightedDigraph(
    G: EdgeWeightedDigraph
  ): boolean {
    if (this.hasOrder()) {
      const found: boolean[] = ((s) => {
        const a = [];
        while (s-- > 0) a.push(false);
        return a;
      })(G.V());
      for (let i = 0; i < G.V(); i++) {
        {
          found[this.rank(i)] = true;
        }
      }
      for (let i = 0; i < G.V(); i++) {
        {
          if (!found[i]) {
            console.error(`No vertex with rank ${i}`);
            return false;
          }
        }
      }
      for (let v = 0; v < G.V(); v++) {
        {
          for (let index372 = G.adj(v).iterator(); index372.hasNext(); ) {
            const e = index372.next();
            {
              const w: number = e.to();
              if (this.rank(v) > this.rank(w)) {
                console.error('%d-%d: rank(%d) = %d, rank(%d) = %d\n');
                return false;
              }
            }
          }
        }
      }
      let r = 0;
      for (let index373 = this.order().iterator(); index373.hasNext(); ) {
        const v = index373.next();
        {
          if (this.rank(v) !== r) {
            console.error('order() and rank() inconsistent');
            return false;
          }
          r++;
        }
      }
    }
    return true;
  }

  private validateVertex(v: number) {
    const V: number = this.ranks.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the `TopologicalX` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const V: number = parseInt(args[0]);
    const E: number = parseInt(args[1]);
    const F: number = parseInt(args[2]);
    const G1: Digraph = DigraphGenerator.dag(V, E);
    const G2: EdgeWeightedDigraph = new EdgeWeightedDigraph(V);
    for (let v = 0; v < G1.V(); v++) {
      for (let index374 = G1.adj(v).iterator(); index374.hasNext(); ) {
        const w = index374.next();
        G2.addEdge(new DirectedEdge(v, w, 0.0));
      }
    }
    for (let i = 0; i < F; i++) {
      {
        const v: number = StdRandom.uniform$int(V);
        const w: number = StdRandom.uniform$int(V);
        G1.addEdge(v, w);
        G2.addEdge(new DirectedEdge(v, w, 0.0));
      }
    }
    StdOut.println$java_lang_Object(G1);
    StdOut.println();
    StdOut.println$java_lang_Object(G2);
    const topological1: TopologicalX = new TopologicalX(G1);
    if (!topological1.hasOrder()) {
      StdOut.println$java_lang_Object('Not a DAG');
    } else {
      StdOut.print$java_lang_Object('Topological order: ');
      for (
        let index375 = topological1.order().iterator();
        index375.hasNext();

      ) {
        const v = index375.next();
        {
          StdOut.print$java_lang_Object(`${v} `);
        }
      }
      StdOut.println();
    }
    const topological2: TopologicalX = new TopologicalX(G2);
    if (!topological2.hasOrder()) {
      StdOut.println$java_lang_Object('Not a DAG');
    } else {
      StdOut.print$java_lang_Object('Topological order: ');
      for (
        let index376 = topological2.order().iterator();
        index376.hasNext();

      ) {
        const v = index376.next();
        {
          StdOut.print$java_lang_Object(`${v} `);
        }
      }
      StdOut.println();
    }
  }
}
TopologicalX.__class = 'edu.princeton.cs.algs4.TopologicalX';

TopologicalX.main(null);
