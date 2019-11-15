import { Alphabet } from './Alphabet';
import { StdIn } from './StdIn';
import { StdOut } from './StdOut';

/**
 * The `Count` class provides an {@link Alphabet} client for reading
 * in a piece of text and computing the frequency of occurrence of each
 * character over a given alphabet.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/55compress">Section 5.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Count {
  /**
   * Reads in text from standard input; calculates the frequency of
   * occurrence of each character over the alphabet specified as a
   * commmand-line argument; and prints the frequencies to standard
   * output.
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    const alphabet: Alphabet = new Alphabet(args[0]);
    const R: number = alphabet.radix();
    const count: number[] = ((s) => {
      const a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(R);
    while (StdIn.hasNextChar()) {
      {
        const c: string = StdIn.readChar();
        if (alphabet.contains(c)) count[alphabet.toIndex(c)]++;
      }
    }
    for (let c = 0; c < R; c++) {
      StdOut.println$java_lang_Object(`${alphabet.toChar(c)} ${count[c]}`);
    }
  }
}
Count.__class = 'edu.princeton.cs.algs4.Count';

Count.main(null);
