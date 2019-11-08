import { StdOut } from './StdOut';
import { In } from './In';

/**
 * The {@code ThreeSumFast} class provides static methods for counting
 * and printing the number of triples in an array of distinct integers that
 * sum to 0 (ignoring integer overflow).
 * <p>
 * This implementation uses sorting and binary search and takes time
 * proportional to n^2 log n, where n is the number of integers.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/14analysis">Section 1.4</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class ThreeSumFast {


  private static containsDuplicates(a: number[]): boolean {
    for (let i = 1; i < a.length; i++) {
      if (a[i] === a[i - 1]) return true;
    }
    return false;
  }

  /**
   * Prints to standard output the (i, j, k) with {@code i < j < k}
   * such that {@code a[i] + a[j] + a[k] == 0}.
   *
   * @param  a the array of integers
   * @throws IllegalArgumentException if the array contains duplicate integers
   */
  public static printAll(a: number[]) {
    const n: number = a.length;
    Arrays.sort(a);
    if (ThreeSumFast.containsDuplicates(a))
      throw new Error('array contains duplicate integers');
    for (let i = 0; i < n; i++) {
      {
        for (let j: number = i + 1; j < n; j++) {
          {
            const k: number = Arrays.binarySearch(a, -(a[i] + a[j]));
            if (k > j)
              StdOut.println$java_lang_Object(`${a[i]} ${a[j]} ${a[k]}`);
          }
        }
      }
    }
  }

  /**
   * Returns the number of triples (i, j, k) with {@code i < j < k}
   * such that {@code a[i] + a[j] + a[k] == 0}.
   *
   * @param  a the array of integers
   * @return  the number of triples (i, j, k) with {@code i < j < k}
   * such that {@code a[i] + a[j] + a[k] == 0}
   */
  public static count(a: number[]): number {
    const n: number = a.length;
    Arrays.sort(a);
    if (ThreeSumFast.containsDuplicates(a))
      throw new Error('array contains duplicate integers');
    let count = 0;
    for (let i = 0; i < n; i++) {
      {
        for (let j: number = i + 1; j < n; j++) {
          {
            const k: number = Arrays.binarySearch(a, -(a[i] + a[j]));
            if (k > j) count++;
          }
        }
      }
    }
    return count;
  }

  /**
   * Reads in a sequence of distinct integers from a file, specified as a command-line argument;
   * counts the number of triples sum to exactly zero; prints out the time to perform
   * the computation.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const a: number[] = __in.readAllInts();
    const count: number = ThreeSumFast.count(a);
    StdOut.println$int(count);
  }
}
ThreeSumFast.__class = 'edu.princeton.cs.algs4.ThreeSumFast';

ThreeSumFast.main(null);
