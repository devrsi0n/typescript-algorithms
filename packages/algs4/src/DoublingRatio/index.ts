import StdRandom from '../StdRandom';
import Stopwatch from '../StopWatch';
import ThreeSum from '../ThreeSumFast';
import StdOut from '../StdOut';

/**
 * The `DoublingRatio` class provides a client for measuring
 * the running time of a method using a doubling ratio test.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/14analysis">Section 1.4</a>
 * of <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 */
export default class DoublingRatio {
  static MAXIMUM_INTEGER = 1000000;

  /**
   * Returns the amount of time to call `ThreeSum.count()` with <em>n</em>
   * random 6-digit integers.
   * @param  n the number of integers
   * @return  amount of time (in seconds) to call `ThreeSum.count()`
   * with <em>n</em> random 6-digit integers
   */
  public static timeTrial(n: number): number {
    const a: number[] = [];
    for (let i = 0; i < n; i++) {
      a.push(
        StdRandom.uniform(
          -DoublingRatio.MAXIMUM_INTEGER,
          DoublingRatio.MAXIMUM_INTEGER
        )
      );
    }
    const timer: Stopwatch = new Stopwatch();
    ThreeSum.count(a);
    return timer.elapsedTime();
  }

  /**
   * Prints table of running times to call `ThreeSum.count()`
   * for arrays of size 250, 500, 1000, 2000, and so forth, along
   * with ratios of running times between successive array sizes.
   *
   * @param  args the command-line arguments
   */
  public static main() {
    let prev: number = DoublingRatio.timeTrial(125);
    for (let n = 250; true; n += n) {
      const time: number = DoublingRatio.timeTrial(n);
      StdOut.printf('%7d %7.1f %5.1f\n', n, time, time / prev);
      prev = time;
    }
  }
}
