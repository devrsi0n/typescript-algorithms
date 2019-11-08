import { SET } from './SET';
import { In } from './In';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The {@code BlackFilter} class provides a client for reading in a <em>blacklist</em>
 * of words from a file; then, reading in a sequence of words from standard input,
 * printing out each word that <em>does not</em> appear in the file.
 * It is useful as a test client for various symbol table implementations.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/35applications">Section 3.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class BlackFilter {


  public static main(args: string[]) {
    const set: SET<string> = <any>new SET<string>();
    const __in: In = new In(args[0]);
    while (!__in.isEmpty()) {
      {
        const word: string = __in.readString();
        set.add(word);
      }
    }
    while (!StdIn.isEmpty()) {
      {
        const word: string = StdIn.readString();
        if (!set.contains(word)) StdOut.println$java_lang_Object(word);
      }
    }
  }
}
BlackFilter.__class = 'edu.princeton.cs.algs4.BlackFilter';

BlackFilter.main(null);
