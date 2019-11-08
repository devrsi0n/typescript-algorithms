import { BinaryStdIn } from './BinaryStdIn';
import { StdOut } from './StdOut';

/**
 * The {@code HexDump} class provides a client for displaying the contents
 * of a binary file in hexadecimal.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/55compression">Section 5.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 * <p>
 * See also {@link BinaryDump} and {@link PictureDump}.
 * For more full-featured versions, see the Unix utilities
 * {@code od} (octal dump) and {@code hexdump} (hexadecimal dump).
 * <p>
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class HexDump {


  /**
   * Reads in a sequence of bytes from standard input and writes
   * them to standard output using hexademical notation, k hex digits
   * per line, where k is given as a command-line integer (defaults
   * to 16 if no integer is specified); also writes the number
   * of bits.
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    let bytesPerLine = 16;
    if (args.length === 1) {
      bytesPerLine = parseInt(args[0]);
    }
    let i: number;
    for (i = 0; !BinaryStdIn.isEmpty(); i++) {
      {
        if (bytesPerLine === 0) {
          BinaryStdIn.readChar();
          continue;
        }
        if (i === 0) StdOut.printf('');
        else if (i % bytesPerLine === 0) StdOut.printf('\n', i);
        else StdOut.print$java_lang_Object(' ');
        const c: string = BinaryStdIn.readChar();
        StdOut.printf(
          '%02x',
          (c => (c.charCodeAt == null ? <any>c : c.charCodeAt(0)))(c) & 255
        );
      }
    }
    if (bytesPerLine !== 0) StdOut.println();
    StdOut.println$java_lang_Object(`${i * 8} bits`);
  }
}
HexDump.__class = 'edu.princeton.cs.algs4.HexDump';

HexDump.main(null);
