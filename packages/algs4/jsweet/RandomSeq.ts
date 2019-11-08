import { StdRandom } from './StdRandom';
import { StdOut } from './StdOut';

/**
 * The {@code RandomSeq} class is a client that prints out a pseudorandom
 * sequence of real numbers in a given range.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/11model">Section 1.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class RandomSeq {


  /**
   * Reads in two command-line arguments lo and hi and prints n uniformly
   * random real numbers in [lo, hi) to standard output.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const n: number = parseInt(args[0]);
    if (args.length === 1) {
      for (let i = 0; i < n; i++) {
        {
          const x: number = StdRandom.uniform();
          StdOut.println$double(x);
        }
      }
    } else if (args.length === 3) {
      const lo: number = Number.parseFloat(args[1]);
      const hi: number = Number.parseFloat(args[2]);
      for (let i = 0; i < n; i++) {
        {
          const x: number = StdRandom.uniform$double$double(lo, hi);
          StdOut.printf('%.2f\n', x);
        }
      }
    } else {
      throw new Error('Invalid number of arguments');
    }
  }
}
RandomSeq.__class = 'edu.princeton.cs.algs4.RandomSeq';

RandomSeq.main(null);
