import { SymbolGraph } from './SymbolGraph';
import { Graph } from './Graph';
import { StdOut } from './StdOut';
import { BreadthFirstPaths } from './BreadthFirstPaths';
import { StdIn } from './StdIn';

/**
 * The `DegreesOfSeparation` class provides a client for finding
 * the degree of separation between one distinguished individual and
 * every other individual in a social network.
 * As an example, if the social network consists of actors in which
 * two actors are connected by a link if they appeared in the same movie,
 * and Kevin Bacon is the distinguished individual, then the client
 * computes the Kevin Bacon number of every actor in the network.
 * <p>
 * The running time is proportional to the number of individuals and
 * connections in the network. If the connections are given implicitly,
 * as in the movie network example (where every two actors are connected
 * if they appear in the same movie), the efficiency of the algorithm
 * is improved by allowing both movie and actor vertices and connecting
 * each movie to all of the actors that appear in that movie.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/41graph">Section 4.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class DegreesOfSeparation {
  /**
   * Reads in a social network from a file, and then repeatedly reads in
   * individuals from standard input and prints out their degrees of
   * separation.
   * Takes three command-line arguments: the name of a file,
   * a delimiter, and the name of the distinguished individual.
   * Each line in the file contains the name of a vertex, followed by a
   * list of the names of the vertices adjacent to that vertex,
   * separated by the delimiter.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const filename: string = args[0];
    const delimiter: string = args[1];
    const source: string = args[2];
    const sg: SymbolGraph = new SymbolGraph(filename, delimiter);
    const G: Graph = sg.graph();
    if (!sg.contains(source)) {
      StdOut.println$java_lang_Object(`${source} not in database.`);
      return;
    }
    const s: number = sg.indexOf(source);
    const bfs: BreadthFirstPaths = new BreadthFirstPaths(G, s);
    while (!StdIn.isEmpty()) {
      {
        const sink: string = StdIn.readLine();
        if (sg.contains(sink)) {
          const t: number = sg.indexOf(sink);
          if (bfs.hasPathTo(t)) {
            for (
              let index182 = bfs.pathTo(t).iterator();
              index182.hasNext();

            ) {
              const v = index182.next();
              {
                StdOut.println$java_lang_Object(`   ${sg.nameOf(v)}`);
              }
            }
          } else {
            StdOut.println$java_lang_Object('Not connected');
          }
        } else {
          StdOut.println$java_lang_Object('   Not in database.');
        }
      }
    }
  }
}
DegreesOfSeparation.__class = 'edu.princeton.cs.algs4.DegreesOfSeparation';

DegreesOfSeparation.main(null);
