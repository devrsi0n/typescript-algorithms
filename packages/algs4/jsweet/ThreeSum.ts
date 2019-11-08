import { StdOut } from './StdOut';
import { In } from './In';
import { Stopwatch } from './Stopwatch';

/**
 * The {@code ThreeSum} class provides static methods for counting
 * and printing the number of triples in an array of integers that sum to 0
 * (ignoring integer overflow).
 * <p>
 * This implementation uses a triply nested loop and takes proportional to n^3,
 * where n is the number of integers.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/14analysis">Section 1.4</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class ThreeSum {


  /**
   * Prints to standard output the (i, j, k) with {@code i < j < k}
   * such that {@code a[i] + a[j] + a[k] == 0}.
   *
   * @param  a the array of integers
   */
  public static printAll(a: number[]) {
    const n: number = a.length;
    for (let i = 0; i < n; i++) {
      {
        for (let j: number = i + 1; j < n; j++) {
          {
            for (let k: number = j + 1; k < n; k++) {
              {
                if (a[i] + a[j] + a[k] === 0) {
                  StdOut.println$java_lang_Object(`${a[i]} ${a[j]} ${a[k]}`);
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   * Returns the number of triples (i, j, k) with {@code i < j < k}
   * such that {@code a[i] + a[j] + a[k] == 0}.
   *
   * @param   a the array of integers
   * @return  the number of triples (i, j, k) with {@code i < j < k}
   * such that {@code a[i] + a[j] + a[k] == 0}
   */
  public static count(a: number[]): number {
    const n: number = a.length;
    let count = 0;
    for (let i = 0; i < n; i++) {
      {
        for (let j: number = i + 1; j < n; j++) {
          {
            for (let k: number = j + 1; k < n; k++) {
              {
                if (a[i] + a[j] + a[k] === 0) {
                  count++;
                }
              }
            }
          }
        }
      }
    }
    return count;
  }

  /**
   * Reads in a sequence of integers from a file, specified as a command-line argument;
   * counts the number of triples sum to exactly zero; prints out the time to perform
   * the computation.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const a: number[] = __in.readAllInts();
    const timer: Stopwatch = new Stopwatch();
    const count: number = ThreeSum.count(a);
    StdOut.println$java_lang_Object(`elapsed time = ${timer.elapsedTime()}`);
    StdOut.println$int(count);
  }
}
ThreeSum.__class = 'edu.princeton.cs.algs4.ThreeSum';

ThreeSum.main(null);
