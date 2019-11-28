import { NFA } from './NFA';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The `GREP` class provides a client for reading in a sequence of
 * lines from standard input and printing to standard output those lines
 * that contain a substring matching a specified regular expression.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/31elementary">Section 3.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class GREP {
  /**
   * Interprets the command-line argument as a regular expression
   * (supporting closure, binary or, parentheses, and wildcard)
   * reads in lines from standard input; writes to standard output
   * those lines that contain a substring matching the regular
   * expression.
   *
   * @param  args the command-line arguments
   */
  public static main(/* args: string[] */) {
    const regexp = `(.*${args[0]}.*)`;
    const nfa: NFA = new NFA(regexp);
    while (StdIn.hasNextLine()) {
      {
        const line: string = StdIn.readLine();
        if (nfa.recognizes(line)) {
          StdOut.println$java_lang_Object(line);
        }
      }
    }
  }
}
GREP.__class = 'edu.princeton.cs.algs4.GREP';

GREP.main(null);
