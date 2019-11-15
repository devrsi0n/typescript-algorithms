import { In } from './In';
import { SuffixArray } from './SuffixArray';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The `KWIK` class provides a {@link SuffixArray} client for computing
 * all occurrences of a keyword in a given string, with surrounding context.
 * This is known as <em>keyword-in-context search</em>.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/63suffix">Section 6.3</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class KWIK {
  /**
   * Reads a string from a file specified as the first
   * command-line argument; read an integer k specified as the
   * second command line argument; then repeatedly processes
   * use queries, printing all occurrences of the given query
   * string in the text string with k characters of surrounding
   * context on either side.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const __in: In = new In(args[0]);
    const context: number = parseInt(args[1]);
    const text: string = /* replaceAll */ __in
      .readAll()
      .replace(new RegExp('\\s+', 'g'), ' ');
    const n: number = text.length;
    const sa: SuffixArray = new SuffixArray(text);
    while (StdIn.hasNextLine()) {
      {
        const query: string = StdIn.readLine();
        for (let i: number = sa.rank(query); i < n; i++) {
          {
            const from1: number = sa.index(i);
            const to1: number = Math.min(n, from1 + query.length);
            if (!/* equals */ (<any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                }
                return o1 === o2;
              })(query, text.substring(from1, to1)))) break;
            const from2: number = Math.max(0, sa.index(i) - context);
            const to2: number = Math.min(
              n,
              sa.index(i) + context + query.length
            );
            StdOut.println$java_lang_Object(text.substring(from2, to2));
          }
        }
        StdOut.println();
      }
    }
  }
}
KWIK.__class = 'edu.princeton.cs.algs4.KWIK';

KWIK.main(null);
