import { BinaryStdIn } from './BinaryStdIn';
import { TST } from './TST';
import { BinaryStdOut } from './BinaryStdOut';

/**
 * The {@code LZW} class provides static methods for compressing
 * and expanding a binary input using LZW compression over the 8-bit extended
 * ASCII alphabet with 12-bit codewords.
 * <p>
 * For additional documentation,
 * see <a href="https://algs4.cs.princeton.edu/55compression">Section 5.5</a> of
 * <i>Algorithms, 4th Edition</i> by Robert Sedgewick and Kevin Wayne.
 *
 * @author Robert Sedgewick
 * @author Kevin Wayne
 * @class
 */
export class LZW {
  static R = 256;

  static L = 4096;

  static W = 12;



  /**
   * Reads a sequence of 8-bit bytes from standard input; compresses
   * them using LZW compression with 12-bit codewords; and writes the results
   * to standard output.
   */
  public static compress() {
    let input: string = BinaryStdIn.readString();
    const st: TST<number> = <any>new TST<number>();
    for (let i = 0; i < LZW.R; i++) {
      st.put(`${String.fromCharCode(i)}`, i);
    }
    let code: number = LZW.R + 1;
    while (input.length > 0) {
      {
        const s: string = st.longestPrefixOf(input);
        BinaryStdOut.write$int$int(st.get$java_lang_String(s), LZW.W);
        const t: number = s.length;
        if (t < input.length && code < LZW.L)
          st.put(input.substring(0, t + 1), code++);
        input = input.substring(t);
      }
    }
    BinaryStdOut.write$int$int(LZW.R, LZW.W);
    BinaryStdOut.close();
  }

  /**
   * Reads a sequence of bit encoded using LZW compression with
   * 12-bit codewords from standard input; expands them; and writes
   * the results to standard output.
   */
  public static expand() {
    const st: string[] = (s => {
      const a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(LZW.L);
    let i: number;
    for (i = 0; i < LZW.R; i++) {
      st[i] = `${String.fromCharCode(i)}`;
    }
    st[i++] = '';
    let codeword: number = BinaryStdIn.readInt$int(LZW.W);
    if (codeword === LZW.R) return;
    let val: string = st[codeword];
    while (true) {
      {
        BinaryStdOut.write$java_lang_String(val);
        codeword = BinaryStdIn.readInt$int(LZW.W);
        if (codeword === LZW.R) break;
        let s: string = st[codeword];
        if (i === codeword) s = val + val.charAt(0);
        if (i < LZW.L) st[i++] = val + s.charAt(0);
        val = s;
      }
    }
    BinaryStdOut.close();
  }

  /**
   * Sample client that calls {@code compress()} if the command-line
   * argument is "-" an {@code expand()} if it is "+".
   *
   * @param  args the command-line arguments
   */
  public static main(args: string[]) {
    if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(args[0], '-')) LZW.compress();
    else if (/* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        }
        return o1 === o2;
      })(args[0], '+')) LZW.expand();
    else throw new Error('Illegal command line argument');
  }
}
LZW.__class = 'edu.princeton.cs.algs4.LZW';

LZW.main(null);
