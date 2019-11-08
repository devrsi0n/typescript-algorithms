import { BinaryStdIn } from './BinaryStdIn';
import { StdOut } from './StdOut';

/**
 * The {@code BinaryDump} class provides a client for displaying the contents
 * of a binary file in binary.
 * <p>
 * For more full-featured versions, see the Unix utilities
 * {@code od} (octal dump) and {@code hexdump} (hexadecimal dump).
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/55compression">Section 5.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 * <p>
 * See also {@link HexDump} and {@link PictureDump}.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class BinaryDump {


  /**
   * Reads in a sequence of bytes from standard input and writes
   * them to standard output in binary, k bits per line,
   * where k is given as a command-line integer (defaults
   * to 16 if no integer is specified); also writes the number
   * of bits.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    let bitsPerLine = 16;
    if (args.length === 1) {
      bitsPerLine = parseInt(args[0]);
    }
    let count: number;
    for (count = 0; !BinaryStdIn.isEmpty(); count++) {
      {
        if (bitsPerLine === 0) {
          BinaryStdIn.readBoolean();
          continue;
        } else if (count !== 0 && count % bitsPerLine === 0) StdOut.println();
        if (BinaryStdIn.readBoolean()) StdOut.print$int(1);
        else StdOut.print$int(0);
      }
    }
    if (bitsPerLine !== 0) StdOut.println();
    StdOut.println$java_lang_Object(`${count} bits`);
  }
}
BinaryDump.__class = 'edu.princeton.cs.algs4.BinaryDump';

BinaryDump.main(null);
