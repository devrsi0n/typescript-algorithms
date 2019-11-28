import { StdRandom } from './StdRandom';
import { Stopwatch } from './Stopwatch';
import { ThreeSum } from './ThreeSum';
import { StdOut } from './StdOut';

/**
 * The `DoublingTest` class provides a client for measuring
 * the running time of a method using a doubling test.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/14analysis">Section 1.4</a>
 * of <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class DoublingTest {
  static MAXIMUM_INTEGER = 1000000;

  /**
   * Returns the amount of time to call `ThreeSum.count()` with <em>n</em>
   * random 6-digit integers.
   * @param  n the number of integers
   * @return  amount of time (in seconds) to call `ThreeSum.count()`
   * with <em>n</em> random 6-digit integers
   */
  public static timeTrial(n: number): number {
    const a: number[] = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      {
        a[i] = StdRandom.uniform$int$int(
          -DoublingTest.MAXIMUM_INTEGER,
          DoublingTest.MAXIMUM_INTEGER
        );
      }
    }
    const timer: Stopwatch = new Stopwatch();
    ThreeSum.count(a);
    return timer.elapsedTime();
  }

  /**
   * Prints table of running times to call `ThreeSum.count()`
   * for arrays of size 250, 500, 1000, 2000, and so forth.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    for (let n = 250; true; n += n) {
      {
        const time: number = DoublingTest.timeTrial(n);
        StdOut.printf('%7d %7.1f\n', n, time);
      }
    }
  }
}
DoublingTest.__class = 'edu.princeton.cs.algs4.DoublingTest';

DoublingTest.main(null);
