import { DirectedDFS } from './DirectedDFS';
import { Digraph } from './Digraph';
import { In } from './In';
import { StdOut } from './StdOut';

/**
 * Computes the transitive closure of the digraph `G`.
 * @param {Digraph} G the digraph
 * @class
 * @author Robert Sedgewick
 */
export class TransitiveClosure {
  private tc: DirectedDFS[];

  public constructor(G: Digraph) {
    if (this.tc === undefined) this.tc = null;
    this.tc = ((s) => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(G.V());
    for (let v = 0; v < G.V(); v++) {
      this.tc[v] = new DirectedDFS(G, v);
    }
  }

  /**
   * Is there a directed path from vertex `v` to vertex `w` in the digraph?
   * @param   v the source vertex
   * @param   w the target vertex
   * @return  `true` if there is a directed path from `v` to `w`,
   * `false` otherwise
   * @throws IllegalArgumentException unless `0 <= v < V`
   * @throws IllegalArgumentException unless `0 <= w < V`
   */
  public reachable(v: number, w: number): boolean {
    this.validateVertex(v);
    this.validateVertex(w);
    return this.tc[v].marked(w);
  }

  private validateVertex(v: number) {
    const V: number = this.tc.length;
    if (v < 0 || v >= V)
      throw new Error(`vertex ${v} is not between 0 and ${V - 1}`);
  }

  /**
   * Unit tests the `TransitiveClosure` data type.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const __in: In = new In(args[0]);
    const G: Digraph = new Digraph(__in);
    const tc: TransitiveClosure = new TransitiveClosure(G);
    StdOut.print$java_lang_Object('     ');
    for (let v = 0; v < G.V(); v++) {
      StdOut.printf('%3d', v);
    }
    StdOut.println();
    StdOut.println$java_lang_Object(
      '--------------------------------------------'
    );
    for (let v = 0; v < G.V(); v++) {
      {
        StdOut.printf('%3d: ', v);
        for (let w = 0; w < G.V(); w++) {
          {
            if (tc.reachable(v, w)) StdOut.printf('  T');
            else StdOut.printf('   ');
          }
        }
        StdOut.println();
      }
    }
  }
}
TransitiveClosure.__class = 'edu.princeton.cs.algs4.TransitiveClosure';

TransitiveClosure.main(null);
