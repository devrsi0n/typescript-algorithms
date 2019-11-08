import { StdIn } from './StdIn';
import { EdgeWeightedDigraph } from './EdgeWeightedDigraph';
import { DirectedEdge } from './DirectedEdge';
import { BellmanFordSP } from './BellmanFordSP';
import { StdOut } from './StdOut';

/**
 * The {@code Arbitrage} class provides a client that finds an arbitrage
 * opportunity in a currency exchange table by constructing a
 * complete-digraph representation of the exchange table and then finding
 * a negative cycle in the digraph.
 * <p>
 * This implementation uses the Bellman-Ford algorithm to find a
 * negative cycle in the complete digraph.
 * The running time is proportional to <em>V</em><sup>3</sup> in the
 * worst case, where <em>V</em> is the number of currencies.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/44sp">Section 4.4</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Arbitrage {


  /**
   * Reads the currency exchange table from standard input and
   * prints an arbitrage opportunity to standard output (if one exists).
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const V: number = StdIn.readInt();
    const name: string[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(V);
    const G: EdgeWeightedDigraph = new EdgeWeightedDigraph(V);
    for (let v = 0; v < V; v++) {
      {
        name[v] = StdIn.readString();
        for (let w = 0; w < V; w++) {
          {
            const rate: number = StdIn.readDouble();
            const e: DirectedEdge = new DirectedEdge(v, w, -Math.log(rate));
            G.addEdge(e);
          }
        }
      }
    }
    const spt: BellmanFordSP = new BellmanFordSP(G, 0);
    if (spt.hasNegativeCycle()) {
      let stake = 1000.0;
      for (
        let index128 = spt.negativeCycle().iterator();
        index128.hasNext();

      ) {
        const e = index128.next();
        {
          StdOut.printf('%10.5f %s ', stake, name[e.from()]);
          stake *= Math.exp(-e.weight());
          StdOut.printf('= %10.5f %s\n', stake, name[e.to()]);
        }
      }
    } else {
      StdOut.println$java_lang_Object('No arbitrage opportunity');
    }
  }
}
Arbitrage.__class = 'edu.princeton.cs.algs4.Arbitrage';

Arbitrage.main(null);
