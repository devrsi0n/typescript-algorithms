import { Queue } from './Queue';
import { Digraph } from './Digraph';
import { EdgeWeightedDigraph } from './EdgeWeightedDigraph';
import { DirectedEdge } from './DirectedEdge';
import { Stack } from './Stack';
import { StdOut } from './StdOut';
import { In } from './In';

/**
 * Determines a depth-first order for the digraph {@code G}.
 * @param {Digraph} G the digraph
 * @class
 * @author Robert Sedgewick
 */
export class DepthFirstOrder {
  private marked: boolean[];

  private __pre: number[];

  private __post: number[];

  private preorder: Queue<number>;

  private postorder: Queue<number>;

  private preCounter: number;

  private postCounter: number;

  public constructor(G?: any) {
    if ((G != null && G instanceof <any>Digraph) || G === null) {
      const __args = arguments;
      if (this.marked === undefined) this.marked = null;
      if (this.__pre === undefined) this.__pre = null;
      if (this.__post === undefined) this.__post = null;
      if (this.preorder === undefined) this.preorder = null;
      if (this.postorder === undefined) this.postorder = null;
      if (this.preCounter === undefined) this.preCounter = 0;
      if (this.postCounter === undefined) this.postCounter = 0;
      if (this.marked === undefined) this.marked = null;
      if (this.__pre === undefined) this.__pre = null;
      if (this.__post === undefined) this.__post = null;
      if (this.preorder === undefined) this.preorder = null;
      if (this.postorder === undefined) this.postorder = null;
      if (this.preCounter === undefined) this.preCounter = 0;
      if (this.postCounter === undefined) this.postCounter = 0;
      (() => {
        this.__pre = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.__post = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.postorder = <any>new Queue<number>();
        this.preorder = <any>new Queue<number>();
        this.marked = (s => {
          const a = [];
          while (s-- > 0) a.push(false);
          return a;
        })(G.V());
        for (let v = 0; v < G.V(); v++) {
          if (!this.marked[v])
            this.dfs$edu_princeton_cs_algs4_Digraph$int(G, v);
        }
      })();
    } else if (
      (G != null && G instanceof <any>EdgeWeightedDigraph) ||
      G === null
    ) {
      const __args = arguments;
      if (this.marked === undefined) this.marked = null;
      if (this.__pre === undefined) this.__pre = null;
      if (this.__post === undefined) this.__post = null;
      if (this.preorder === undefined) this.preorder = null;
      if (this.postorder === undefined) this.postorder = null;
      if (this.preCounter === undefined) this.preCounter = 0;
      if (this.postCounter === undefined) this.postCounter = 0;
      if (this.marked === undefined) this.marked = null;
      if (this.__pre === undefined) this.__pre = null;
      if (this.__post === undefined) this.__post = null;
      if (this.preorder === undefined) this.preorder = null;
      if (this.postorder === undefined) this.postorder = null;
      if (this.preCounter === undefined) this.preCounter = 0;
      if (this.postCounter === undefined) this.postCounter = 0;
      (() => {
        this.__pre = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.__post = (s => {
          const a = [];
          while (s-- > 0) a.push(0);
          return a;
        })(G.V());
        this.postorder = <any>new Queue<number>();
        this.preorder = <any>new Queue<number>();
        this.marked = (s => {
          const a = [];
          while (s-- > 0) a.push(false);
          return a;
        })(G.V());
        for (let v = 0; v < G.V(); v++) {
          if (!this.marked[v])
            this.dfs$edu_princeton_cs_algs4_EdgeWeightedDigraph$int(G, v);
        }
      })();
    } else throw new Error('invalid overload');
  }

  public dfs$edu_princeton_cs_algs4_Digraph$int(G: Digraph, v: number) {
    this.marked[v] = true;
    this.__pre[v] = this.preCounter++;
    this.preorder.enqueue(v);
    for (let index185 = G.adj(v).iterator(); index185.hasNext(); ) {
      const w = index185.next();
      {
        if (!this.marked[w]) {
          this.dfs$edu_princeton_cs_algs4_Digraph$int(G, w);
        }
      }
    }
    this.postorder.enqueue(v);
    this.__post[v] = this.postCounter++;
  }

  public dfs(G?: any, v?: any): any {
    if (
      ((G != null && G instanceof <any>Digraph) || G === null) &&
      (typeof v === 'number' || v === null)
    ) {
      return <any>this.dfs$edu_princeton_cs_algs4_Digraph$int(G, v);
    }
    if (
      ((G != null && G instanceof <any>EdgeWeightedDigraph) || G === null) &&
      (typeof v === 'number' || v === null)
    ) {
      return <any>this.dfs$edu_princeton_cs_algs4_EdgeWeightedDigraph$int(G, v);
    }
    throw new Error('invalid overload');
  }

  private dfs$edu_princeton_cs_algs4_EdgeWeightedDigraph$int(
    G: EdgeWeightedDigraph,
    v: number
  ) {
    this.marked[v] = true;
    this.__pre[v] = this.preCounter++;
    this.preorder.enqueue(v);
    for (let index186 = G.adj(v).iterator(); index186.hasNext(); ) {
      const e = index186.next();
      {
        const w: number = e.to();
        if (!this.marked[w]) {
          this.dfs$edu_princeton_cs_algs4_EdgeWeightedDigraph$int(G, w);
        }
      }
    }
    this.postorder.enqueue(v);
    this.__post[v] = this.postCounter++;
  }

  public pre$int(v: number): number {
    this.validateVertex(v);
    return this.__pre[v];
  }

  /**
   * Returns the preorder number of vertex {@code v}.
   * @param   v the vertex
   * @return  the preorder number of vertex {@code v}
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public pre(v?: any): any {
    if (typeof v === 'number' || v === null) {
      return <any>this.pre$int(v);
    }
    if (v === undefined) {
      return <any>this.pre$();
    }
    throw new Error('invalid overload');
  }

  public post$int(v: number): number {
    this.validateVertex(v);
    return this.__post[v];
  }

  /**
   * Returns the postorder number of vertex {@code v}.
   * @param   v the vertex
   * @return  the postorder number of vertex {@code v}
   * @throws IllegalArgumentException unless {@code 0 <= v < V}
   */
  public post(v?: any): any {
    if (typeof v === 'number' || v === null) {
      return <any>this.post$int(v);
    }
    if (v === undefined) {
      return <any>this.post$();
    }
    throw new Error('invalid overload');
  }

  public post$(): Iterable<number> {
    return this.postorder;
  }

  public pre$(): Iterable<number> {
    return this.preorder;
  }

  /**
   * Returns the vertices in reverse postorder.
   * @return  the vertices in reverse postorder, as an iterable of vertices
   */
  public reversePost(): Iterable<number> {
    const reverse: Stack<number> = <any>new Stack<number>();
    for (let index187 = this.postorder.iterator(); index187.hasNext(); ) {
      const v = index187.next();
      reverse.push(v);
    }
    return reverse;
  }

  private check(): boolean {
    let r = 0;
    for (let index188 = this.post().iterator(); index188.hasNext(); ) {
      const v = index188.next();
      {
        if (this.post$int(v) !== r) {
          StdOut.println$java_lang_Object('post(v) and post() inconsistent');
          return false;
        }
        r++;
      }
    }
    r = 0;
    for (let index189 = this.pre().iterator(); index189.hasNext(); ) {
      const v = index189.next();
      {
        if (this.pre$int(v) !== r) {
          StdOut.println$java_lang_Object('pre(v) and pre() inconsistent');
          return false;
        }
        r++;
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
   * Unit tests the {@code DepthFirstOrder} data type.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const G: Digraph = new Digraph(__in);
    const dfs: DepthFirstOrder = new DepthFirstOrder(G);
    StdOut.println$java_lang_Object('   v  pre post');
    StdOut.println$java_lang_Object('--------------');
    for (let v = 0; v < G.V(); v++) {
      {
        StdOut.printf('%4d %4d %4d\n', v, dfs.pre$int(v), dfs.post$int(v));
      }
    }
    StdOut.print$java_lang_Object('Preorder:  ');
    for (let index190 = dfs.pre().iterator(); index190.hasNext(); ) {
      const v = index190.next();
      {
        StdOut.print$java_lang_Object(`${v} `);
      }
    }
    StdOut.println();
    StdOut.print$java_lang_Object('Postorder: ');
    for (let index191 = dfs.post().iterator(); index191.hasNext(); ) {
      const v = index191.next();
      {
        StdOut.print$java_lang_Object(`${v} `);
      }
    }
    StdOut.println();
    StdOut.print$java_lang_Object('Reverse postorder: ');
    for (let index192 = dfs.reversePost().iterator(); index192.hasNext(); ) {
      const v = index192.next();
      {
        StdOut.print$java_lang_Object(`${v} `);
      }
    }
    StdOut.println();
  }
}
DepthFirstOrder.__class = 'edu.princeton.cs.algs4.DepthFirstOrder';

DepthFirstOrder.main(null);
