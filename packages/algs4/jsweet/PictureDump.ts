import { Picture } from './Picture';
import { BinaryStdIn } from './BinaryStdIn';

/**
 * The {@code PictureDump} class provides a client for displaying the contents
 * of a binary file as a black-and-white picture.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/55compression">Section 5.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 * <p>
 * See also {@link BinaryDump} and {@link HexDump}.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class PictureDump {


  /**
   * Reads in a sequence of bytes from standard input and draws
   * them to standard drawing output as a width-by-height picture,
   * using black for 1 and white for 0 (and red for any leftover
   * pixels).
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    const width: number = parseInt(args[0]);
    const height: number = parseInt(args[1]);
    const picture: Picture = new Picture(width, height);
    for (let row = 0; row < height; row++) {
      {
        for (let col = 0; col < width; col++) {
          {
            if (!BinaryStdIn.isEmpty()) {
              const bit: boolean = BinaryStdIn.readBoolean();
              if (bit) picture.set(col, row, Color.BLACK);
              else picture.set(col, row, Color.WHITE);
            } else {
              picture.set(col, row, Color.RED);
            }
          }
        }
      }
    }
    picture.show();
  }
}
PictureDump.__class = 'edu.princeton.cs.algs4.PictureDump';

PictureDump.main(null);
