import { Alphabet } from './Alphabet';
import { BinaryStdIn } from './BinaryStdIn';
import { BinaryStdOut } from './BinaryStdOut';

/**
 * The {@code Genome} class provides static methods for compressing
 * and expanding a genomic sequence using a 2-bit code.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/55compression">Section 5.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class Genome {


  /**
   * Reads a sequence of 8-bit extended ASCII characters over the alphabet
   * { A, C, T, G } from standard input; compresses them using two bits per
   * character; and writes the results to standard output.
   */
  public static compress() {
    const DNA: Alphabet = Alphabet.DNA_$LI$();
    const s: string = BinaryStdIn.readString();
    const n: number = s.length;
    BinaryStdOut.write$int(n);
    for (let i = 0; i < n; i++) {
      {
        const d: number = DNA.toIndex(s.charAt(i));
        BinaryStdOut.write$int$int(d, 2);
      }
    }
    BinaryStdOut.close();
  }

  /**
   * Reads a binary sequence from standard input; converts each two bits
   * to an 8-bit extended ASCII character over the alphabet { A, C, T, G };
   * and writes the results to standard output.
   */
  public static expand() {
    const DNA: Alphabet = Alphabet.DNA_$LI$();
    const n: number = BinaryStdIn.readInt();
    for (let i = 0; i < n; i++) {
      {
        const c: string = BinaryStdIn.readChar$int(2);
        BinaryStdOut.write$char$int(DNA.toChar(c.charCodeAt(0)), 8);
      }
    }
    BinaryStdOut.close();
  }

  /**
   * Sample client that calls {@code compress()} if the command-line
   * argument is "-" an {@code expand()} if it is "+".
   *
   * @param {Array} args the command-line arguments
   */
  public static main(args: string[]) {
    if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(args[0], '-')) Genome.compress();
    else if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(args[0], '+')) Genome.expand();
    else throw new Error('Illegal command line argument');
  }
}
Genome.__class = 'edu.princeton.cs.algs4.Genome';

Genome.main(null);
