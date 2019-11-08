import { StdIn } from './StdIn';
import { EdgeWeightedDigraph } from './EdgeWeightedDigraph';
import { DirectedEdge } from './DirectedEdge';
import { AcyclicLP } from './AcyclicLP';
import { StdOut } from './StdOut';

/**
 * The {@code CPM} class provides a client that solves the
 * parallel precedence-constrained job scheduling problem
 * via the <em>critical path method</em>. It reduces the problem
 * to the longest-paths problem in edge-weighted DAGs.
 * It builds an edge-weighted digraph (which must be a DAG)
 * from the job-scheduling problem specification,
 * finds the longest-paths tree, and computes the longest-paths
 * lengths (which are precisely the start times for each job).
 * <p>
 * This implementation uses {@link AcyclicLP} to find a longest
 * path in a DAG.
 * The running time is proportional to <em>V</em> + <em>E</em>,
 * where <em>V</em> is the number of jobs and <em>E</em> is the
 * number of precedence constraints.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/44sp">Section 4.4</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class CPM {


  /**
   * Reads the precedence constraints from standard input
   * and prints a feasible schedule to standard output.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const n: number = StdIn.readInt();
    const source: number = 2 * n;
    const sink: number = 2 * n + 1;
    const G: EdgeWeightedDigraph = new EdgeWeightedDigraph(2 * n + 2);
    for (let i = 0; i < n; i++) {
      {
        const duration: number = StdIn.readDouble();
        G.addEdge(new DirectedEdge(source, i, 0.0));
        G.addEdge(new DirectedEdge(i + n, sink, 0.0));
        G.addEdge(new DirectedEdge(i, i + n, duration));
        const m: number = StdIn.readInt();
        for (let j = 0; j < m; j++) {
          {
            const precedent: number = StdIn.readInt();
            G.addEdge(new DirectedEdge(n + i, precedent, 0.0));
          }
        }
      }
    }
    const lp: AcyclicLP = new AcyclicLP(G, source);
    StdOut.println$java_lang_Object(' job   start  finish');
    StdOut.println$java_lang_Object('--------------------');
    for (let i = 0; i < n; i++) {
      {
        StdOut.printf('%4d %7.1f %7.1f\n', i, lp.distTo(i), lp.distTo(i + n));
      }
    }
    StdOut.printf('Finish time: %7.1f\n', lp.distTo(sink));
  }
}
CPM.__class = 'edu.princeton.cs.algs4.CPM';

CPM.main(null);
