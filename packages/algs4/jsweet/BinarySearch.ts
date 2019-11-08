import { In } from './In';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The {@code BinarySearch} class provides a static method for binary
 * searching for an integer in a sorted array of integers.
 * <p>
 * The <em>indexOf</em> operations takes logarithmic time in the worst case.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/11model">Section 1.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class BinarySearch {


  /**
   * Returns the index of the specified key in the specified array.
   *
   * @param  {Array} a the array of integers, must be sorted in ascending order
   * @param  {number} key the search key
   * @return  index of key in array {@code a} if present; {@code -1} otherwise
   */
  public static indexOf(a: number[], key: number): number {
    let lo = 0;
    let hi: number = a.length - 1;
    while (lo <= hi) {
      {
        const mid: number = lo + (((hi - lo) / 2) | 0);
        if (key < a[mid]) hi = mid - 1;
        else if (key > a[mid]) lo = mid + 1;
        else return mid;
      }
    }
    return -1;
  }

  /**
   * Returns the index of the specified key in the specified array.
   * This function is poorly named because it does not give the <em>rank</em>
   * if the array has duplicate keys or if the key is not in the array.
   *
   * @param  {number} key the search key
   * @param  {Array} a the array of integers, must be sorted in ascending order
   * @return  index of key in array {@code a} if present; {@code -1} otherwise
   * @deprecated Replaced by {@link #indexOf(int[], int)}.
   */
  public static rank(key: number, a: number[]): number {
    return BinarySearch.indexOf(a, key);
  }

  /**
   * Reads in a sequence of integers from the whitelist file, specified as
   * a command-line argument; reads in integers from standard input;
   * prints to standard output those integers that do <em>not</em> appear in the file.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const whitelist: number[] = __in.readAllInts();
    Arrays.sort(whitelist);
    while (!StdIn.isEmpty()) {
      {
        const key: number = StdIn.readInt();
        if (BinarySearch.indexOf(whitelist, key) === -1)
          StdOut.println$int(key);
      }
    }
  }
}
BinarySearch.__class = 'edu.princeton.cs.algs4.BinarySearch';

BinarySearch.main(null);
