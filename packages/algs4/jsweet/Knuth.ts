import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The `Knuth` class provides a client for reading in a
 * sequence of strings and <em>shuffling</em> them using the Knuth (or Fisher-Yates)
 * shuffling algorithm. This algorithm guarantees to rearrange the
 * elements in uniformly random order, under
 * the assumption that Math.random() generates independent and
 * uniformly distributed numbers between 0 and 1.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/11model">Section 1.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 * See {@link StdRandom} for versions that shuffle arrays and
 * subarrays of objects, doubles, and ints.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Knuth {
  /**
   * Rearranges an array of objects in uniformly random order
   * (under the assumption that `Math.random()` generates independent
   * and uniformly distributed numbers between 0 and 1).
   * @param  a the array to be shuffled
   */
  public static shuffle(a: any[]) {
    const n: number = a.length;
    for (let i = 0; i < n; i++) {
      {
        const r: number = (<number>(Math.random() * (i + 1))) | 0;
        const swap: any = a[r];
        a[r] = a[i];
        a[i] = swap;
      }
    }
  }

  /**
   * Rearranges an array of objects in uniformly random order
   * (under the assumption that `Math.random()` generates independent
   * and uniformly distributed numbers between 0 and 1).
   * @param  a the array to be shuffled
   */
  public static shuffleAlternate(a: any[]) {
    const n: number = a.length;
    for (let i = 0; i < n; i++) {
      {
        const r: number = i + ((<number>(Math.random() * (n - i))) | 0);
        const swap: any = a[r];
        a[r] = a[i];
        a[i] = swap;
      }
    }
  }

  /**
   * Reads in a sequence of strings from standard input, shuffles
   * them, and prints out the results.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const a: string[] = StdIn.readAllStrings();
    Knuth.shuffle(a);
    for (let i = 0; i < a.length; i++) {
      StdOut.println$java_lang_Object(a[i]);
    }
  }
}
Knuth.__class = 'edu.princeton.cs.algs4.Knuth';

Knuth.main(null);
