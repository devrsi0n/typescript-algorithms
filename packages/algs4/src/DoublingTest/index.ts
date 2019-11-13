import StdRandom from '../StdRandom';
import Stopwatch from '../StopWatch';
import ThreeSum from '../ThreeSumFast';
import StdOut from '../StdOut';

/**
 * The {@code DoublingTest} class provides a client for measuring
 * the running time of a method using a doubling test.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/14analysis">Section 1.4</a>
 * of <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 */
export default class DoublingTest {
  static MAXIMUM_INTEGER = 1000000;

  /**
   * Returns the amount of time to call {@code ThreeSum.count()} with <em>n</em>
   * random 6-digit integers.
   * @param  n the number of integers
   * @return  amount of time (in seconds) to call {@code ThreeSum.count()}
   * with <em>n</em> random 6-digit integers
   */
  public static timeTrial(n: number): number {
    const a: number[] = [];
    for (let i = 0; i < n; i++) {
      a.push(
        StdRandom.uniform(
          -DoublingTest.MAXIMUM_INTEGER,
          DoublingTest.MAXIMUM_INTEGER
        )
      );
    }
    const timer: Stopwatch = new Stopwatch();
    ThreeSum.count(a);
    return timer.elapsedTime();
  }

  /**
   * Prints table of running times to call {@code ThreeSum.count()}
   * for arrays of size 250, 500, 1000, 2000, and so forth.
   *
   * @param  args the command-line arguments
   */
  public static main() {
    for (let n = 250; true; n += n) {
      const time: number = DoublingTest.timeTrial(n);
      StdOut.printf('%7d %7.1f\n', n, time);
    }
  }
}
