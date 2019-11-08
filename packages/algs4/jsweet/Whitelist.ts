import { In } from './In';
import { StaticSETofInts } from './StaticSETofInts';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The {@code Whitelist} class provides a client for reading in
 * a set of integers from a file; reading in a sequence of integers
 * from standard input; and printing to standard output those
 * integers not in the whitelist.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/12oop">Section 1.2</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Whitelist {


  /**
   * Reads in a sequence of integers from the whitelist file, specified as
   * a command-line argument. Reads in integers from standard input and
   * prints to standard output those integers that are not in the file.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const white: number[] = __in.readAllInts();
    const set: StaticSETofInts = new StaticSETofInts(white);
    while (!StdIn.isEmpty()) {
      {
        const key: number = StdIn.readInt();
        if (!set.contains(key)) StdOut.println$int(key);
      }
    }
  }
}
Whitelist.__class = 'edu.princeton.cs.algs4.Whitelist';

const __Function = Function;

Whitelist.main(null);
