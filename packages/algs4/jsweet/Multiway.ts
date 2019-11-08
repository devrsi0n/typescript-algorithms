import { In } from './In';
import { IndexMinPQ } from './IndexMinPQ';
import { StdOut } from './StdOut';

/**
 * The {@code Multiway} class provides a client for reading in several
 * sorted text files and merging them together into a single sorted
 * text stream.
 * This implementation uses a {@link IndexMinPQ} to perform the multiway
 * merge.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/24pq">Section 2.4</a>
 * of <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Multiway {


  private static merge(streams: In[]) {
    const n: number = streams.length;
    const pq: IndexMinPQ<string> = <any>new IndexMinPQ<string>(n);
    for (let i = 0; i < n; i++) {
      if (!streams[i].isEmpty()) pq.insert(i, streams[i].readString());
    }
    while (!pq.isEmpty()) {
      {
        StdOut.print$java_lang_Object(`${pq.minKey()} `);
        const i: number = pq.delMin();
        if (!streams[i].isEmpty()) pq.insert(i, streams[i].readString());
      }
    }
    StdOut.println();
  }

  /**
   * Reads sorted text files specified as command-line arguments;
   * merges them together into a sorted output; and writes
   * the results to standard output.
   * Note: this client does not check that the input files are sorted.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const n: number = args.length;
    const streams: In[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(n);
    for (let i = 0; i < n; i++) {
      streams[i] = new In(args[i]);
    }
    Multiway.merge(streams);
  }
}
Multiway.__class = 'edu.princeton.cs.algs4.Multiway';

Multiway.main(null);
