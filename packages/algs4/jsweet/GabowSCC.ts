import { Stack } from './Stack';
import { Digraph } from './Digraph';
import { TransitiveClosure } from './TransitiveClosure';
import { In } from './In';
import { StdOut } from './StdOut';
import { Queue } from './Queue';

/**
 * Computes the strong components of the digraph {@code G}.
 * @param {Digraph} G the digraph
 * @class
 * @author Robert Sedgewick
 */
export class GabowSCC {
  private marked: boolean[];

  private __id: number[];

  private preorder: number[];

  private pre: number;

  private __count: number;

  private stack1: Stack<number>;

  private stack2: Stack<number>;

  public constructor(G: Digraph) {
    if (this.marked === undefined) this.marked = null;
    if (this.__id === undefined) this.__id = null;
    if (this.preorder === undefined) this.preorder = null;
    if (this.pre === undefined) this.pre = 0;
    if (this.__count === undefined) this.__count = 0;
    if (this.stack1 === undefined) this.stack1 = null;
    if (this.stack2 === undefined) this.stack2 = null;
    this.marked = (s => {
      const a = [];
      while (s-- > 0) a.push(false);
      return a;
    })(G.V());
    this.stack1 = <any>new Stack<number>();
    this.stack2 = <any>new Stack<number>();
    this.__id = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(G.V());
    this.preorder = (s => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      this.__id[v] = -1;
    }
    for (let v = 0; v < G.V(); v++) {
      {
        if (!this.marked[v]) this.dfs(G, v);
      }
    }
  }

  private dfs(G: Digraph, v: number) {
    this.marked[v] = true;
    this.preorder[v] = this.pre++;
    this.stack1.push(v);
    this.stack2.push(v);
    for (let index271 = G.adj(v).iterator(); index271.hasNext(); ) {
      const w = index271.next();
      {
        if (!this.marked[w]) this.dfs(G, w);
        else if (this.__id[w] === -1) {
          while (this.preorder[this.stack2.peek()] > this.preorder[w]) {
            this.stack2.pop();
          }
        }
      }
    }
    if (this.stack2.peek() === v) {
      this.stack2.pop();
      let w: number;
      do {
        {
          w = this.stack1.pop();
          this.__id[w] = this.__count;
        }
      } while (w !== v);
      this.__count++;
    }
  }

  /**
   * Returns the number of strong components.
   * @return  the number of strong components
   */
  public count(): number {
    return this.__count;
  }

  /**
   * Are vertices {@code v} and {@code w} in the same strong component?
   * @param   v one vertex
   * @param   w the other vertex
   * @return  {@code true} if vertices {@code v} and {@code w} are in the same
   * strong component, and {@code false} otherwise
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   * @throws IllegalArgumentException unless {@code 0 <= w < V}
   */
  public stronglyConnected(v: number, w: number): boolean {
    this.validateVertex(v);
    this.validateVertex(w);
    return this.__id[v] === this.__id[w];
  }

  /**
   * Returns the component id of the strong component containing vertex {@code v}.
   * @param   v the vertex
   * @return  the component id of the strong component containing vertex {@code v}
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public id(v: number): number {
    this.validateVertex(v);
    return this.__id[v];
  }

  private check(G: Digraph): boolean {
    const tc: TransitiveClosure = new TransitiveClosure(G);
    for (let v = 0; v < G.V(); v++) {
      {
        for (let w = 0; w < G.V(); w++) {
          {
            if (
              this.stronglyConnected(v, w) !==
              (tc.reachable(v, w) && tc.reachable(w, v))
            )
              return false;
          }
        }
      }
    }
    return true;
  }

  private validateVertex(v: number) {
    const V: number = this.marked.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the {@code GabowSCC} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Digraph = new Digraph(__in);
    const scc: GabowSCC = new GabowSCC(G);
    const m: number = scc.count();
    StdOut.println$java_lang_Object(`${m} components`);
    const components: Queue<number>[] = <Queue<number>[]>(s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(m);
    for (let i = 0; i < m; i++) {
      {
        components[i] = <any>new Queue<number>();
      }
    }
    for (let v = 0; v < G.V(); v++) {
      {
        components[scc.id(v)].enqueue(v);
      }
    }
    for (let i = 0; i < m; i++) {
      {
        for (let index272 = components[i].iterator(); index272.hasNext(); ) {
          const v = index272.next();
          {
            StdOut.print$java_lang_Object(`${v} `);
          }
        }
        StdOut.println();
      }
    }
  }
}
GabowSCC.__class = 'edu.princeton.cs.algs4.GabowSCC';

GabowSCC.main(null);
