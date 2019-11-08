import { Out } from './Out';
import { In } from './In';

/**
 * The {@code Cat} class provides a client for concatenating the results
 * of several text files.
 * <p>
 * For additional documentation, see <a href="https://algs4.cs.princeton.edu/11model">Section 1.1</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Cat {


  /**
   * Reads in a sequence of text files specified as the first command-line
   * arguments, concatenates them, and writes the results to the file
   * specified as the last command-line argument.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const out: Out = new Out(args[args.length - 1]);
    for (let i = 0; i < args.length - 1; i++) {
      {
        const __in: In = new In(args[i]);
        const s: string = __in.readAll();
        out.println$java_lang_Object(s);
        __in.close();
      }
    }
    out.close();
  }
}
Cat.__class = 'edu.princeton.cs.algs4.Cat';

Cat.main(null);
