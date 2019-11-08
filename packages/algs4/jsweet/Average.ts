import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The {@code Average} class provides a client for reading in a sequence
 * of real numbers and printing out their average.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/11model">Section 1.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Average {


  /**
   * Reads in a sequence of real numbers from standard input and prints
   * out their average to standard output.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    let count = 0;
    let sum = 0.0;
    while (!StdIn.isEmpty()) {
      {
        const value: number = StdIn.readDouble();
        sum += value;
        count++;
      }
    }
    const average: number = sum / count;
    StdOut.println$java_lang_Object(`Average is ${average}`);
  }
}
Average.__class = 'edu.princeton.cs.algs4.Average';

Average.main(null);
