import { BinaryStdIn } from './BinaryStdIn';
import { BinaryStdOut } from './BinaryStdOut';

/**
 * The `RunLength` class provides static methods for compressing
 * and expanding a binary input using run-length coding with 8-bit
 * run lengths.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/55compression">Section 5.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class RunLength {
  static R = 256;

  static LG_R = 8;

  /**
   * Reads a sequence of bits from standard input (that are encoded
   * using run-length encoding with 8-bit run lengths); decodes them;
   * and writes the results to standard output.
   */
  public static expand() {
    let b = false;
    while (!BinaryStdIn.isEmpty()) {
      {
        const run: number = BinaryStdIn.readInt$int(RunLength.LG_R);
        for (let i = 0; i < run; i++) {
          BinaryStdOut.write$boolean(b);
        }
        b = !b;
      }
    }
    BinaryStdOut.close();
  }

  /**
   * Reads a sequence of bits from standard input; compresses
   * them using run-length coding with 8-bit run lengths; and writes the
   * results to standard output.
   */
  public static compress() {
    let run: string = String.fromCharCode(0);
    let old = false;
    while (!BinaryStdIn.isEmpty()) {
      {
        const b: boolean = BinaryStdIn.readBoolean();
        if (b !== old) {
          BinaryStdOut.write$char$int(run, RunLength.LG_R);
          run = String.fromCharCode(1);
          old = !old;
        } else {
          if (
            ((c) => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(run) ==
            RunLength.R - 1
          ) {
            BinaryStdOut.write$char$int(run, RunLength.LG_R);
            run = String.fromCharCode(0);
            BinaryStdOut.write$char$int(run, RunLength.LG_R);
          }
          run++;
        }
      }
    }
    BinaryStdOut.write$char$int(run, RunLength.LG_R);
    BinaryStdOut.close();
  }

  /**
   * Sample client that calls `compress()` if the command-line
   * argument is "-" an `expand()` if it is "+".
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(args[0], '-')) RunLength.compress();
    else if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(args[0], '+')) RunLength.expand();
    else throw new Error('Illegal command line argument');
  }
}
RunLength.__class = 'edu.princeton.cs.algs4.RunLength';

RunLength.main(null);
