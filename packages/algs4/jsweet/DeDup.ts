import { SET } from './SET';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The `DeDup` class provides a client for reading in a sequence of
 * words from standard input and printing each word, removing any duplicates.
 * It is useful as a test client for various symbol table implementations.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/35applications">Section 3.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class DeDup {
  public static main(args: string[]) {
    const set: SET<string> = <any>new SET<string>();
    while (!StdIn.isEmpty()) {
      {
        const key: string = StdIn.readString();
        if (!set.contains(key)) {
          set.add(key);
          StdOut.println$java_lang_Object(key);
        }
      }
    }
  }
}
DeDup.__class = 'edu.princeton.cs.algs4.DeDup';

DeDup.main(null);
